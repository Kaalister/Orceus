import "../assets/css/card.css";

import React from 'react';
import { connect } from 'react-redux';
import { getCardById } from "../redux/reducers/card";
import {  
    ArrowBack,
    Add,
    Remove,
    ZoomOutMap,
} from '@material-ui/icons';

import { MapInteractionCSS } from 'react-map-interaction';
import { Link } from 'react-router-dom';

class Card extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            infoImg: {
                scale: 1,
                translation: {
                    x: 0,
                    y: 0
                }
            }
        };

        this.reset = this.reset.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }

    componentDidMount() {
        const {
            dispatch,
            selectedCard,
            card,
        } = this.props;
        
        if (!card || !card.big_card)
            dispatch(getCardById({
                id: selectedCard
            }));
    }

    reset() {
        this.setState({
            infoImg: {
                scale: 1,
                translation: { x: 0, y: 0 }
            }
        });
    }

    zoomIn() {
        const zoom = this.state.infoImg.scale

        this.setState({
            infoImg: {
                ...this.state.infoImg,
                scale: zoom + 0.25,
            }
        });
    }

    zoomOut() {
        const zoom = this.state.infoImg.scale

        if (zoom === 0.25) {
            return;
        }
            
        this.setState({
            infoImg: {
                ...this.state.infoImg,
                scale: zoom - 0.25,
            }
        });
    }

    render() {
        const {
            dispatch,
            card,
        } = this.props;

        return (
            <div
                className="center"
                style={{
                    height: "100vh",
                    width: "100vw"
                }}
            >
                <MapInteractionCSS
                    value={this.state.infoImg}
                    onChange={(infoImg) => this.setState({infoImg})}
                >
                    <img
                        className="full-card" 
                        src={card.big_card}
                        alt=""
                    />
                </MapInteractionCSS>
                <Link
                    className="tool-btn tool-back-arrow"
                    to="/Orceus/cards"
                    onClick={() => dispatch({
                        type: "Cards/unselectCard"
                    })}
                >
                    <ArrowBack/>
                </Link>
                <div
                    className="tool-btn tool-reset"
                    onClick={this.reset}
                >
                    <ZoomOutMap/>
                </div>
                <div
                    className="tool-btn tool-zoom-in"
                    onClick={this.zoomIn}
                >
                    <Add/>
                </div>
                <div
                    className="tool-btn tool-zoom-out"
                    onClick={this.zoomOut}
                >
                    <Remove/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    const card = state.cards.cards.find(card =>
        card.id === state.cards.selectedCard);

    return {
        isLoading: state.cards?.isLoading,
        selectedCard: state.cards.selectedCard,
        card: card,
    }
}

export default connect(mapStateToProps)(Card)