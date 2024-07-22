import '../assets/css/adminSettings.css';

import React from 'react';
import { connect } from 'react-redux';
import { deleteCardById, getAllCards } from '../redux/reducers/card';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Create, ArrowBackIos, AddCircleOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import { TYPESOPTIONS, SPECIESOPTIONS } from '../constants';

import AdminModale from './AdminModale';
import { AuthConsumer } from '../Profile';

class AdminSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
        }

        this.getCardList = this.getCardList.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if (this.props.cards.length === 0)
            this.getCardList();
    }

    getCardList() {
        this.props.dispatch(getAllCards())
    }

    closeModal() {
        this.setState({
            openModal: false
        }, () => this.props.dispatch({
            type: 'Cards/unselectCard'
        }))
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

    configureCard(sessionType, id) {
        if (sessionType !== "09c71624") {
            this.unauthorized();
            return;
        }

        this.props.dispatch({
            type: 'Cards/selectCard',
            id: id,
        })

        this.setState({
            openModal: true 
        })
    }

    deleteCard(sessionType, id) {
        if (sessionType !== "09c71624") {
            this.unauthorized();
            return;
        }
        this.props.dispatch({
            type: "Cards/deleteCard",
            id: id,
        })

        this.props.dispatch(deleteCardById({
            id: id,
        }))
    }

    render() {
        const {
            cards,
            isLoading,
            selectedCard
        } = this.props;

        return (
            <AuthConsumer>
                {({ sessionType }) => {
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
            
                            if (!value) return (<span/>);
            
                            let obj = TYPESOPTIONS.filter(
                                type => (type.value === value)
                            );
            
                            return (
                                <span>
                                    {(obj.lenth !== 0) && obj[0].label}
                                </span>
                            );
                        }
                    }, {
                        headerName: 'Espèce',
                        field: 'specie',
                        width: 150,
                        renderCell: (params) => {
                            let value = params.value;
            
                            if (!value) return (<span/>)
            
                            let obj = SPECIESOPTIONS.filter(
                                species => (species.value === value)
                            );
            
                            return (
                                <span>
                                    {(obj.lenth !== 0) && obj[0].label}
                                </span>
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
                        renderCell: (params) => (
                            params.value === "true" ? "oui" : ""
                        )
                    }, {
                        headerName: 'Actions',
                        sortable: false,
                        field: 'actions',
                        width: 150,
                        renderCell: (params) => (
                            <div>
                                <Create className="action-btn"
                                    onClick={() => this.configureCard(
                                        sessionType,
                                        params.row.id,
                                    )}
                                />
                                <Delete className="action-btn"
                                    onClick={() => this.deleteCard(
                                        sessionType,
                                        params.row.id,
                                    )}
                                />
                            </div>
                        ),
                    }];

                    return (
                        <div className='adminsetting-container'>
                            <div className="d-flex row pb-2">
                                <Link to="/cards/" style={{ color: 'white' }}>
                                    <ArrowBackIos />
                                </Link>                 
                                <Button
                                    className="add-card-btn"
                                    variant="contained"
                                    color="primary"
                                    startIcon = {<AddCircleOutline />}
                                    onClick={() => {
                                        this.configureCard(sessionType, null)
                                    }}
                                >
                                    Nouveau
                                </Button>
                            </div>
                            <div className='setting-grid-container'>
                                <DataGrid 
                                    rows={cards}
                                    columns={columns}
                                    pageSize={20}
                                    autoHeight
                                    loading={isLoading}
                                    />
                                {this.state.openModal && (
                                    <AdminModale
                                    show={this.state.openModal}
                                    update={this.getCardList}
                                    close={this.closeModal}
                                    id={selectedCard}
                                    />
                                )}
                            </div>
                        </div>
                    )
            }}
            </AuthConsumer>
        );
    }
}

const mapStateToProps = function(state) {
    let cards = state.cards.adminCards || [];

    cards = cards.filter(card => (!!card.id));

    return {
        isLoading: state.cards?.isLoading,
        selectedCard: state.cards.selectedCard,
        cards: cards,
    }
}

export default connect(mapStateToProps)(AdminSettings)