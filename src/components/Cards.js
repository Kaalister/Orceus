import React from 'react';
import {
    Route,
    Switch,
    useRouteMatch,
    useParams
} from 'react-router-dom';
import Particles from 'react-particles-js';

import Card from './Card';
import CardsMenu from './CardsMenu';

const paramsParticles = {
    "particles":{
        "number":{
            "value":130,
            "density":{
                "enable":true,
                "value_area":800
            }
        },
        "color":{
            "value":"#f7dd5c"
        },
        "shape":{
            "type":"circle",
            "stroke":{
                "width":0,
                "color":"#000000"
            },
            "polygon":{
                "nb_sides":5
            },
            "image":{
                "src":"img/github.svg",
                "width":100,
                "height":100
            }
        },
        "opacity":{
            "value": 0.3,
            "random":true,
            "anim":{
                "enable":true,
                "speed":0.2,
                "opacity_min":0.1,
                "sync":false
            }
        },
        "size":{
            "value":5,
            "random":true,
            "anim":{
                "enable":true,
                "speed":0.4,
                "size_min":0.1,
                "sync":false
            }
        },
        "line_linked":{
            "enable":true,
            "distance":100,
            "color":"#f7dd5c",
            "opacity":0.4,
            "width":2
        },
        "move":{
            "enable":true,
            "speed":0.3,
            "direction":"none",
            "random":false,
            "straight":false,
            "out_mode":"out",
            "bounce":false,
            "attract":{
                "enable":false,
                "rotateX":600,
                "rotateY":1200
            }
        }
    },
    "interactivity":{
        "detect_on":"canvas",
        "events":{
            "onhover":{
                "enable":false,
                "mode":"bubble"
            },
            "onclick":{
                "enable":false,
                "mode":"repulse"
            },
            "resize":false
        },
        "modes":{
            "grab":{
                "distance":400,
                "line_linked":{
                "opacity":0.5
                }
            },
            "bubble":{
                "distance":400,
                "size":4,
                "duration":0.3,
                "opacity":1,
                "speed":3
            },
            "repulse":{
                "distance":200,
                "duration":0.4
            },
            "push":{
                "particles_nb":4
            },
            "remove":{
                "particles_nb":2
            }
        }
    },
    "retina_detect":true
}

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
