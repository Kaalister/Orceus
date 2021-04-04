import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { HttpGetRequest, HttpDeleteRequest } from '../HttpRequests';
import { Delete, Create, ArrowBackIos, AddCircleOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AdminModale from './AdminModale';

import '../assets/css/adminSettings.css'

export default class AdminSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            selectedCard: null,
            openModal: false,
        }

        this.getCardList = this.getCardList.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.getCardList();
    }

    getCardList() {
        HttpGetRequest('/cards')
        .then(data => {
            if (!data) {
                throw Error()
            }
            return data.json();
        })
        .then(data => {
            this.setState({
                cards: data
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

    configureCard(id) {
        this.setState({
            selectedCard: id,
            openModal: true 
        })
    }

    deleteCard(id) {
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
        }, {
            headerName: 'Espèce',
            field: 'specie',
            width: 150,
        }, {
            headerName: 'Tags',
            field: 'tags',
            flex: 1,
        },{
            headerName: 'Actions',
            sortable: false,
            field: 'actions',
            width: 150,
            renderCell: (params) => (
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
                     className="right"
                     variant="contained"
                     color="primary"
                     startIcon = {<AddCircleOutline />}
                     onClick={() => { this.configureCard(null) }}>
                        Nouveau
                    </Button>
                </div>
                <div>
                    <DataGrid 
                     rows={this.state.cards}
                     columns={columns}
                     pageSize={10}
                     autoHeight
                     />
                    { (this.state.openModal) ? (
                        <AdminModale
                         show={this.state.openModal}
                         close={this.closeModal}
                         id={this.state.selectedCard}
                        />
                    ): null}
                </div>
            </div>
        );
    }
}