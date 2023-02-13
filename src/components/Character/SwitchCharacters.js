import React from 'react';
import {
    Route,
    Switch,
    useRouteMatch,
    useParams
} from 'react-router-dom';

import CharacterMenu from './CharacterMenu';
import CharacterData from './CharacterData';

export default function SwitchCharacters({ history }) {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:id`}>
                    <GetCharacterId history={history} />
                </Route>
                <Route path={match.path}>
                    <CharacterMenu history={history} />
                </Route>
            </Switch>
        </div>
    )
}

function GetCharacterId() {
    let { id } = useParams();
    let localisation = window.location.href.split("/").pop();

    return (<CharacterData id={id} localisation={localisation}/>);
}