import React from 'react';
import {
    Route,
    Switch,
    useRouteMatch,
    useParams
} from 'react-router-dom';
import Particles from 'react-particles-js';

import { paramsParticles } from '../constants.js';

import Card from './Card';
import CardsMenu from './CardsMenu';


export default function Cards({ history }) {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:id`}>
                    <GetIDToCard history={history} />
                </Route>
                <Route path={match.path}>
                    <CardsMenu history={history} />
                </Route>
            </Switch>
            <div className="particles-js">
                <Particles params={paramsParticles} />
            </div>
        </div>
    )
}

function GetIDToCard() {
    let { id } = useParams();

    return (
        <Card id={id} />
    );
}
