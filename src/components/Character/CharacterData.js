import "../../assets/css/Character/character.css";

import React from 'react';
import { connect } from 'react-redux';
import Character from './Character';
import Inventory from './Inventory';
import loadingImg from '../../assets/images/loading.gif';
import {
    getCharacterById
} from "../../redux/reducers/characters";
import {
    CHAR_BASE,
} from "../../constants";

class CharacterData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            character: this.props.character,
        }

        this.actualizeFightStats = this.actualizeFightStats.bind(this);
        this.updateCharacter = this.updateCharacter.bind(this);
    }

    componentDidMount() {
        const {
            dispatch,
            id,
            character,
        } = this.props

        if (character === null)
            dispatch(getCharacterById({ id: id }))
        else
            this.actualizeFightStats();
    }

    componentDidUpdate(prevProps) {
        if (this.props.character?.id !== prevProps.character?.id) {
            this.setState({
                character: this.props.character,
            }, this.actualizeFightStats)
        }
    }

    actualizeFightStats() {
        let character = { ...this.state.character };

        if (!character.specie || !character.job) return;

        let base = CHAR_BASE[character.specie][character.job] || null;

        if (base === null) return;

        base = {
            att: base.att + character.fight.att,
            def: base.def + character.fight.def,
            vit: base.vit + character.fight.vit,
            agi: base.agi + character.fight.agi,
            puiss: base.puiss + character.fight.puiss,
            stren: base.stren + character.fight.stren,
        }

        let fight = { ...character.fight };

        character.hp_max = (3 * base.att) + (15 * base.def) + (3 * base.vit) + (3 * base.agi) + (2 * base.puiss) + (5 * base.stren);
        fight.cac = Math.round(Math.sqrt(character.level * base.att) + (Math.pow(base.stren, 2) / 15)) || 0;
        fight.dist = Math.round(Math.pow(character.level, 2) / 10 + (Math.pow(base.att, 2) * 0.02) * (1 + base.stren * 0.2)) || 0;
        fight.mag = Math.round((base.att + base.puiss + (character.level / 10)) * (base.puiss / 20 + base.att / 40 + character.level / 100)) || 0;
        fight.def_phy = Math.round(13 * Math.log(base.def)) || 0;
        fight.def_mag = Math.round(13 * Math.log(base.def)) || 0;
        fight.dodge = 6 + Math.round((4 * Math.log((base.vit + base.agi) / 2)) / 1.3) || 0;

        if (character.specie === "suhera" || character?.specie === "hanylice") {
            fight.cac = 0;
            fight.dist = 0;
            fight.mag = Math.round(Math.pow(character.level, 2) / 10 + (Math.pow(base.puiss, 2) * 0.02) * (1 + base.att * 0.2));
        }

        for (const [key, value] of Object.entries(fight)) {
            if (key !== 'id' && value < 0) fight[key] = 0;
        }

        this.setState({
            statsFightChange: false,
            character: {
                ...character,
                fight: fight,
            }
        });
    }

    updateCharacter(updatedCharacter) {
        const character = { ...this.props.character };
        let statsFightChange = false;

        if (character.specie !== updatedCharacter.specie ||
            character.job !== updatedCharacter.job ||
            JSON.stringify(character.fight) !== JSON.stringify(updatedCharacter.fight))
            statsFightChange = true;

        this.setState({
            character: updatedCharacter,
        }, () => {
            if (statsFightChange) this.actualizeFightStats();
        });
    }

    render() {
        const {
            isLoading,
            localisation,
        } = this.props;
        const { character } = this.state;

        if ((!isLoading && character === null) || isLoading) {
            return (
                <div 
                    style={{ 
                        width: "100%", 
                        display: "flex", 
                        justifyContent: "center"
                    }}
                >
                    <img
                        className="loading-character"
                        src={loadingImg}
                        alt="loading"
                    />
                </div>
            );
        }

        if (localisation === "inventory") {
            return (
                <Inventory 
                    character={character}
                    updateCharacter={this.updateCharacter}
                />
            );
        }

        return (
            <Character
                character={character}
                updateCharacter={this.updateCharacter}
            />
        );
    }
}

const mapStateToProps = function(state, ownProps) {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    let id = segments.pop();

    if (ownProps.localisation === "inventory")
        id = segments[segments.length-1];

    const character = state.characters?.characters?.find(char =>
        char.id === state.characters?.selectedCharacter);

    return {
        id,
        isLoading: state.characters.isLoading,
        character: character || null,
        selectedCharacter: state.characters?.selectedCharacter || null,
    }
}

export default connect(mapStateToProps)(CharacterData)