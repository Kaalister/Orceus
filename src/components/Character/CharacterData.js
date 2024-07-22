import "../../assets/css/character.css";

import React from 'react';
import { connect } from 'react-redux';
import Character from './Character';
import Inventory from './Inventory';
import loadingImg from '../../assets/images/loading.gif';
import {
    getCharacterById
} from "../../redux/reducers/characters";

class CharacterData extends React.Component {
    componentDidMount() {
        const {
            dispatch,
            id,
            character,
        } = this.props

        if (character === null)
            dispatch(getCharacterById({ id: id }))
    }

    render() {
        const {
            isLoading,
            localisation,
            character,
        } = this.props;

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
            return (<Inventory />);
        }

        return (<Character />);
    }
}

const mapStateToProps = function (state, ownProps) {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    let id = segments.pop();

    if (ownProps.localisation === "inventory")
        id = segments[segments.length-1];

    const character = state.characters?.characters?.find(char =>
        char.id === state.characters?.selectedCharacter);

    return {
        id,
        isLoading: state.characters?.isLoading,
        character: character || null,
        selectedCharacter: state.characters?.selectedCharacter || null,
    }
}

export default connect(mapStateToProps)(CharacterData)