import React from 'react';
import { Link } from 'react-router-dom';

import data from '../GetcardList';

import '../assets/css/cardMenu.css';

export default class CardMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
        }
    }

    componentDidMount() {
        let cards = data();
    
        this.setState({
            cards
        });
    }
    
    render() {

        let cards = this.state.cards.map( (card, index) => {
            return(
                <Link to={"/Orceus/cards/" + card.id} key={index}>
                    <img
                        className="card-img"
                        src={"data:image/png;base64," + card.img}
                        alt=" "
                    />
                </Link>
            );
        });

        return (
            <div className="container-card-menu">
                <a href="/Orceus/AdminSettings" className="setting-btn">
                    settings
                </a>
                {cards}
            </div>
        );
    }
}