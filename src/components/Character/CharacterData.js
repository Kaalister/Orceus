import React from 'react';
import { notification } from 'antd';
import Character from './Character';
import Inventory from './Inventory';
import loadingImg from '../../assets/images/loading.gif';
import { HttpGetRequest, HttpPutRequest } from "../../HttpRequests";

import "../../assets/css/character.css";

export default class CharacterData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            character: null,
            loading: true,
        };

        this.actualizeCharacter = this.actualizeCharacter.bind(this);
    }

    componentDidMount(prevProps) {
        if (prevProps?.id !== this.props?.id) {
            HttpGetRequest('/characters/' + this.props.id)
            .then(response => {
                if (!response.ok) {
                    throw Error()
                }
                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    this.setState({
                        character: data,
                        loading: false,
                    });
                }, 2000);
            })
            .catch(() => {
                this.setState({ loading: false });
                console.log('Erreur lors de la recupération des datas');
            })
        }
    }

    actualizeCharacter = (character) => {
        this.setState({ character });
    }

    saveCharacter = () => {
        HttpPutRequest('/characters/' + this.props.id, this.state.character)
            .then(response => {
                if (!response.ok) {
                    throw Error()
                }
                return response.json();
            })
            .then(data => {
                notification.open({
                    className: "notification",
                    message: 'Sauvegarde réussie !'
                });
            })
            .catch(() => {
                this.setState({ loading: false });
                console.log('Erreur lors de la recupération des datas');
            })
    }

    render() {
        let { character, loading } = this.state;
        let { localisation } = this.props;

        if (loading) {
            return (
                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
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
                    actualizeCharacter={this.actualizeCharacter}
                    saveCharacter={this.saveCharacter}
                />
            );
        }
    
        return (
            <Character
                character={character}
                actualizeCharacter={this.actualizeCharacter}
                saveCharacter={this.saveCharacter}
            />
        );
    }
}