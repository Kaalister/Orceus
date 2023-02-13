import React from 'react';
import { Link } from 'react-router-dom';

import { Select, Form, Input, Button } from 'antd';
import { ArrowBackIos } from '@material-ui/icons';

import { PLANTS_ABYSS, ROCKS_ABYSS } from '../constants.js';
import '../assets/css/rollingPage.css';

export default class RollingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            type: 'plants',
            stage: -1,
            zone: null,
            foundedItems: [],
        };

        this.types = [{
            label: 'Plantes',
            value: 'plants',
        }, {
            label: 'Pierres',
            value: 'rocks',
        }];

        this.zones = [{
            label: 'Chaude',
            value: 'hot'
        }, {
            label: 'Normale',
            value: null,
        }];

        this.refForm = React.createRef();

        this.submitForm = this.submitForm.bind(this);
        this.makeASearch = this.makeASearch.bind(this);
    };

    rollDice() {
        return Math.floor(Math.random() * 100) + 1;
    }

    makeASearch() {
        const {number, type, stage, zone} = this.state;
        let foundedItems = [];

        for (let i = 0; i < number; i ++) {
            let foundedItem = null;
            switch (type) {
                case 'plants':
                    foundedItem = this.findPlants(stage);
                    break;
                case 'rocks':
                    foundedItem = this.findRocks(stage, zone);
                    break;
                default:
                    break;
            }

            if (foundedItem !== null) {
                foundedItems.push(foundedItem);
            }
        };

        this.makeRapport(foundedItems);
    }

    makeRapport(items) {
        let listItems = [...new Set(items)];
        let result = [];
        
        for (let i = 0; i < listItems.length; i++) {
            result.push({
                name: listItems[i].name,
                count: items.filter(item => item === listItems[i]).length
            });
        }

        this.setState({
            foundedItems: result,
        });
    }

    findPlants(stage) {
        let plants = PLANTS_ABYSS.filter(plant => plant.stage === stage);
        let dice = this.rollDice();

        let plantFind = plants.find(plant => (plant.min <= dice && dice <= plant.max));
        
        if (!plantFind) {
            return null;
        }

        return plantFind;
    }

    findRocks(stage, zone) {
        let rocks = ROCKS_ABYSS.filter(rock => rock.stage === stage);

        if (zone === null) {
            rocks = rocks.filter(rock => rock.in.length === 0);
        } else {
            rocks = rocks.filter(rock => (rock.in.includes(zone) || !rock.notIn.includes(zone)));
        }

        let dice = this.rollDice();

        let rockFind = rocks.find(rock => (rock.min <= dice && dice <= rock.max));
        
        if (!rockFind) {
            return null;
        }

        return rockFind;
    }

    submitForm() {
        let form = this.refForm.current.getFieldsValue();

        this.setState({
            number: parseInt(form.number),
            type: form.type,
            stage: parseInt(form.stage),
            zone: form.zone,
        }, () => {
            this.makeASearch();
        });
    }

    render() {
        let layout = {
            style: { color: 'white' },
            initialValues: {
                number: 0,
                type: 'plants',
                stage: -1,
                zone: null,
            },
            layout: 'vertical',
            className: 'p-2'
        };

        return (
            <div style={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
                <div className="p-2">
                    <Link to="/Orceus/cards/" style={{ color: 'white' }}>
                        <ArrowBackIos />
                    </Link>
                </div>
                <h1 className="title-rolling">Recherches des aventuriers :</h1>
                <Form {...layout} ref={this.refForm}>
                    <Form.Item label="Nombre de recherches :" name="number">
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item label="Type :" name="type">
                        <Select options={this.types} />
                    </Form.Item>
                    <Form.Item label="Zone :" name="zone">
                        <Select options={this.zones} />
                    </Form.Item>
                    <Form.Item label="Étage :" name="stage">
                        <Input
                            type="number"
                        />
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center' }}>
                    <Button onClick={this.submitForm}>Lancer</Button>
                </div>
                <div className="results-rolling m-2 p-1" style={{color: 'white'}}>
                    <div className="mb-1">Résultats :</div>
                    {(this.state.foundedItems.length === 0)
                        ? "Rien trouvé"
                        : (
                        <ul style={{ listStyleType: 'none' }}>
                            {
                                this.state.foundedItems.map(item => (
                                    <li>
                                        {item.count}x {item.name}
                                    </li>
                                ))
                            }
                        </ul>
                    )}
                </div>
            </div>
        )
    };

};