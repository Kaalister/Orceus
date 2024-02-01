import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { HttpGetRequest, HttpDeleteRequest } from '../HttpRequests';
import { Delete, Create, ArrowBackIos, AddCircleOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

import AdminModale from './AdminModale';

import AppProfile from '../Profile';

import '../assets/css/adminSettings.css'

const TYPESOPTIONS = [{
    label: 'Personnage',
    value: 'character'
}, {
    label: 'Carte',
    value: 'map'
}, {
    label: 'Peuple/Race',
    value: 'class'
}, {
    label: 'Mineral',
    value: 'mineral'
}, {
    label: 'Végétal',
    value: 'vegetable'
}, {
    label: 'Ville',
    value: 'city'
}, {
    label: 'Créature',
    value: 'monster'
}, {
    label: 'Artefact',
    value: 'artefact'
}, {
    label: 'Autre',
    value: 'other'
}];

const SPECIESOPTIONS = [{
    label: 'Inconnue',
    value: 'unknown'
}, {
    label: 'Ciheuphe',
    value: 'ciheuphe'
}, {
    label: 'Humain',
    value: 'human'
}, {
    label: 'Shashouille',
    value: 'shashouille'
}, {
    label: 'Robot',
    value: 'robot'
}, {
    label: 'Hanylice',
    value: 'hanylice'
}, {
    label: 'Suhera',
    value: 'suhera'
}, {
    label: 'Ao-Nesa',
    value: 'ao-nesa'
}, {
    label: 'Biri-Ozi',
    value: 'biri-ozi'
}, {
    label: 'Wibsa-Thu',
    value: 'wibsa-thu'
}, {
    label: 'Démon',
    value: 'demon'
}, {
    label: 'Dieu/Déesse',
    value: 'god'
}, {
    label: 'Sentinelle',
    value: 'sentry'
}, {
    label: 'Autre',
    value: 'other'
}];
export default class AdminSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            selectedCard: null,
            openModal: false,
            loading: true,
        }

        this.getCardList = this.getCardList.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.getCardList();
    }

    getCardList() {
        this.setState({
            loading : true
        });

        HttpGetRequest('/cards')
        .then(data => {
            if (!data) {
                throw Error()
            }
            return data.json();
        })
        .then(data => {
            this.setState({
                cards: data,
                loading: false,
            })
        })
        .catch(() => {
            console.log('Erreur lors de la recupération des datas');
        })
    }

    closeModal() {
        this.setState({
            openModal: false,
            selectedCard: null,
        })
    }

    unauthorized() {
        notification.open({
            message: 'Action non autorisée !',
            description:
              'Vous n\'êtes pas autorisé à faire des modifications. Profitez du site et touchez avec les yeux ;P',
            placement: "top",
            style: {
                background: "rgba(255, 255, 255, 0.12)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                color: "white",
            },
        });
    }

    configureCard(id) {
        if (AppProfile.get('sessionType') !== "09c71624") {
            this.unauthorized();
            return;
        }

        this.setState({
            selectedCard: id,
            openModal: true 
        })
    }

    deleteCard(id) {
        if (AppProfile.get('sessionType') !== "09c71624") {
            this.unauthorized();
            return;
        }
        HttpDeleteRequest('/card/' + id)
        .then(response => {
            if (!response.ok) {
                throw Error()
            }
            return response.json();
        })
        .then(data => {
            this.getCardList();
        })
        .catch(() => {
            console.log('Erreur lors de la suppression');
        })
    }

    render() {
        const columns = [{
            headerName: 'N°',
            field: 'card_num',
            width: 80,
        }, {
            headerName: 'Name',
            field: 'name',
            width: 150,
        }, {
            headerName: 'Desc',
            field: 'desc',
            width: 200,
        }, {
            headerName: 'Type',
            field: 'type',
            width: 150,
            renderCell: (params) => {
                let value = params.value;

                if (!value) {
                    return (<span/>);
                }

                let obj = TYPESOPTIONS.filter( type => (type.value === value));

                return (
                    <span>{(obj.lenth !== 0) ? obj[0].label : null}</span>
                );
            }
        }, {
            headerName: 'Espèce',
            field: 'specie',
            width: 150,
            renderCell: (params) => {
                let value = params.value;

                if (!value) {
                    return (<span/>)
                }

                let obj = SPECIESOPTIONS.filter( species => (species.value === value));

                return (
                    <span>{(obj.lenth !== 0) ? obj[0].label : null}</span>
                );
            }
        }, {
            headerName: 'Tags',
            field: 'tags',
            flex: 1,
        }, {
            headerName: 'Cachée',
            field: 'hidden',
            flex: 1,
            renderCell: (params) => (params.value === "true" ? "oui" : "")
        }, {
            headerName: 'Actions',
            sortable: false,
            field: 'actions',
            width: 150,
            renderCell: (params) =>(
                <div>
                    <Create className="action-btn"
                        onClick={()=> this.configureCard(params.row.id)}
                    />
                    <Delete className="action-btn"
                        onClick={()=> this.deleteCard(params.row.id)}
                    />
                </div>
            ),
        }];

        return (
            <div className='adminsetting-container'>
                <div className="d-flex row pb-2">
                    <Link to="/Orceus/cards/" style={{ color: 'white' }}>
                        <ArrowBackIos />
                    </Link>                 
                    <Button
                        className="add-card-btn"
                        variant="contained"
                        color="primary"
                        startIcon = {<AddCircleOutline />}
                        onClick={() => { this.configureCard(null) }}
                    >
                        Nouveau
                    </Button>
                </div>
                <div className='setting-grid-container'>
                    <DataGrid 
                        rows={this.state.cards}
                        columns={columns}
                        pageSize={20}
                        autoHeight
                        loading={this.state.loading}
                     />
                    { (this.state.openModal) ? (
                        <AdminModale
                            show={this.state.openModal}
                            update={this.getCardList}
                            close={this.closeModal}
                            id={this.state.selectedCard}
                        />
                    ): null}
                </div>
            </div>
        );
    }
}