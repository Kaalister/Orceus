import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {  
    ArrowBack,
    ZoomIn,
    ZoomOut,
    ZoomOutMap,
} from '@material-ui/icons';

import data from '../Getcardbyid';
import "../assets/css/card.css";
import { Link } from 'react-router-dom';

export default class CardMenu extends React.Component {

    //this.props.id => id of cards
    constructor(props) {
        super(props);

        this.state = {
            card: '',
        }
    }

    componentDidMount() {
        let card = data();

        this.setState({
            card
        });
    }

    render() {
        return (
            <div className="center" style={{height: "100vh"}}>
                <TransformWrapper defaultScale={1}>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
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
                                    src={"data:image/png;base64," + this.state.card.img}
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