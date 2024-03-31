import "../../assets/css/character.css";

import React from 'react';
import { connect } from 'react-redux';
import Character from './Character';
import Inventory from './Inventory';
import loadingImg from '../../assets/images/loading.gif';

class CharacterData extends React.Component {
    render() {
        const {
            isLoading,
            localisation,
            character,
        } = this.props;

        if (isLoading && !character) {
            return (
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <img
                        className="loading-character"
                        src={loadingImg}
                        alt="loading"
                    />
                </div>
            );
        }

        if (localisation === "inventory") {
            return (<Inventory />);
        }

        return (<Character />);
    }
}

const mapStateToProps = function (state) {
    const character = state.characters.characters.find(char =>
        char.id === state.characters?.selectedCharacter);

    return {
        isLoading: state.characters?.isLoading,
        character: character || null,
        selectedCharacter: state.characters?.selectedCharacter || null,
    }
}

export default connect(mapStateToProps)(CharacterData)