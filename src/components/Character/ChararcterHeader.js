import "../../assets/css/Character/characterHeader.css";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveCharacter } from '../../redux/reducers/characters';
import { Link, useParams } from 'react-router-dom';
import { ArrowBack, Backpack, Face, Save } from '@mui/icons-material';
import { Modal, Button } from 'antd';

export default function CharacterHeader(props) {
    let { id } = useParams();
    let [ modalIsOpen, setModal ] = useState(false);
    const dispatch = useDispatch();
    const { character } = props;

    return (
        <div className="character-header-container">

            <Modal visible={modalIsOpen} footer={null}>
                <div className="modal-back">
                    <div className="mb-2 center">
                        "Avant de quitter, pense à sauvegarder !"
                    </div>
                    <div className="modal-back-button-container">
                        <Link to="/SelectCharacters">
                            <Button
                                onClick={() => dispatch({
                                    type: 'Characters/unselectCharacter',
                                })}
                                className="mr-1 ok-button"
                            >
                                Quitter la fiche
                            </Button>
                        </Link>
                        <Button
                            className="cancel-button"
                            onClick={() => setModal(false)}
                        >
                            Rester
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className="ch-btn-container">
                <ArrowBack onClick={() => setModal(true)} />
            </div>
            <div className="ch-btn-container">
                <Save onClick={() => {
                    console.log(character);
                    dispatch(
                        saveCharacter({
                            id: character.id,
                            character: character,
                        })
                    );
                }} />
                {(props.currentPage === "inventory") && (
                    <Link to={"/SelectCharacters/" + id}>
                        <Face />
                    </Link>
                )}
                {(props.currentPage === "character") && (
                    <Link to={"/SelectCharacters/" + id + "/inventory"}>
                        <Backpack />
                    </Link>
                )}
            </div>
        </div>
    );
}