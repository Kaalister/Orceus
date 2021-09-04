import React from 'react';
import {  
    ArrowBack,
    Add,
    Remove,
    ZoomOutMap,
} from '@material-ui/icons';

import "../assets/css/card.css";
import { MapInteractionCSS } from 'react-map-interaction';
import { Link } from 'react-router-dom';

import { HttpGetRequest } from '../HttpRequests';

export default class CardMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            card: '',
            infoImg: {
                scale: 1,
                translation: { x: 0, y: 0 }
            }
        };

        this.getCard = this.getCard.bind(this);
        this.reset = this.reset.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }

    componentDidMount() {
        this.getCard();
    }

    getCard() {
        if (!this.props.id)
            return;
        let url = "/cards/" + this.props.id;

        HttpGetRequest(url)
            .then( response => {
                if (!response)
                    throw Error();
                
                return response.json();
            })
            .then( data => {
                if (!data)
                    throw Error();

                this.setState({card: data[0]})
            })
            .catch( () => {
                console.log("Erreur lors de l'update");
            });
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
                        src={this.state.card.big_card}
                        alt=""
                    />
                </MapInteractionCSS>
                <Link
                    className="tool-btn tool-back-arrow"
                    to="/Orceus/cards">
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