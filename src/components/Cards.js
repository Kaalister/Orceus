import React from 'react';
import { 
    Route,
    Switch,
    useRouteMatch,
    useParams
} from 'react-router-dom';

import Card from './Card';
import CardsMenu from './CardsMenu';

export default function Cards() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <GetIDToCard/>
            </Route>
            <Route path={match.path}>
                <CardsMenu/>
            </Route>
        </Switch>
    )
}

function GetIDToCard () {
    let { id } = useParams();

    return (
        <Card id={id}/>
    );
}
