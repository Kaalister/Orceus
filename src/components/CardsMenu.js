import React from 'react';
import { Link } from 'react-router-dom';

import { HttpGetRequest } from '../HttpRequests';
import { Settings, Loop } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import AppProfile from '../Profile';

import '../assets/css/cardMenu.css';

export default class CardMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            loading: true,
        }

        this.getCardList = this.getCardList.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.getCardList();
    }

    getCardList() {
        HttpGetRequest('/cards')
        .then(response => {
            if (!response.ok) {
                throw Error()
            }
            return response.json();
        })
        .then(data => {
            this.setState({
                cards: data,
                loading: false,
            })
        })
        .catch(() => {
            this.setState({loading: false});
            console.log('Erreur lors de la recupération des datas');
        })
    }
    
    logout() {
        AppProfile.profile.connected = false;
        AppProfile.profile.isAdmin = false;

        localStorage.removeItem('Orceus');
        this.props.history.push('/Orceus/');
    }

    render() {
        let cards = this.state.cards.map( (cardItem, index) => {
            return(
                <Link to={"/Orceus/cards/" + cardItem.id} key={index}>
                    <img
                        className="card-img"
                        src={cardItem.card}
                        alt=" "
                    />
                </Link>
            );
        });

        return (
            <div className="p-1">
                <div>
                    <Button
                     variant="contained"
                     color="primary"
                     onClick={this.logout} >
                        Déconnexion
                    </Button>
                    {(AppProfile.get('isAdmin')) ? (
                        <Link to="/Orceus/AdminSettings" className="setting-btn">
                           <Settings style={{color: 'white'}} className='clickable'/>
                        </Link>
                    ) : null}
                </div>
                <div className="container-card-menu">
                    {cards}
                    {(cards.length === 0 && !this.state.loading) ? (
                        <div style={{color: 'white'}}>Aucune donnée</div>
                    ) : null}
                    {(this.state.loading) ? (
                        <div className="rotate">
                            <Loop className="loading"/>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}