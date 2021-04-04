import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {  
    ArrowBack,
    ZoomIn,
    ZoomOut,
    ZoomOutMap,
} from '@material-ui/icons';

import "../assets/css/card.css";
import { Link } from 'react-router-dom';

import { HttpGetRequest } from '../HttpRequests';

export default class CardMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            card: '',
        }

        this.getCard = this.getCard.bind(this);
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

    render() {
        return (
            <div className="center" style={{height: "100vh"}}>
                <TransformWrapper defaultScale={1}>
                    {({ zoomIn, zoomOut, resetTransform}) => (
                        <React.Fragment>
                            <Link
                                className="tool-btn tool-back-arrow"
                                to="/Orceus/cards">
                                <ArrowBack/>
                            </Link>
                            <div
                                className="tool-btn tool-zoomin"
                                onClick={zoomIn}
                            >
                                <ZoomIn/>
                            </div>
                            <div
                                className="tool-btn tool-zoomout"
                                onClick={zoomOut}
                            >
                                <ZoomOut/>
                            </div>
                            <div
                                className="tool-btn tool-reset"
                                onClick={resetTransform}
                            >
                                <ZoomOutMap/>
                            </div>
                            <TransformComponent>
                                <img
                                    className="full-card"
                                    src={this.state.card.big_card}
                                    alt=" "
                                    />
                            </TransformComponent>
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>
        );
    }
}