import React from 'react';
import { Link } from 'react-router-dom';

import { HttpPostRequest } from '../HttpRequests';
import { Settings, Casino, Face } from '@material-ui/icons';
import { Select, Form, Input, Row, Space } from 'antd';
import 'antd/dist/antd.min.css'

import AppProfile from '../Profile';

import logoutBtn from '../assets/images/logoutBtn.png';
import loading from '../assets/images/loading.gif';
import '../assets/css/cardMenu.css';

const TYPESOPTIONS = [{
    label: 'Personnage',
    value: 'character'
}, {
    label: 'Carte',
    value: 'map'
}, {
    label: 'Peuple/Race',
    value: 'class'
}, {
    label: 'Mineral',
    value: 'mineral'
}, {
    label: 'Végétal',
    value: 'vegetable'
}, {
    label: 'Ville',
    value: 'city'
}, {
    label: 'Créature',
    value: 'monster'
}, {
    label: 'Artefact',
    value: 'artefact'
}, {
    label: 'Autre',
    value: 'other'
}];

const SPECIESOPTIONS = [{
    label: 'Inconnue',
    value: 'unknown'
}, {
    label: 'Ciheuphe',
    value: 'ciheuphe'
}, {
    label: 'Humain',
    value: 'human'
}, {
    label: 'Shashouille',
    value: 'shashouille'
}, {
    label: 'Robot',
    value: 'robot'
}, {
    label: 'Hanylice',
    value: 'hanylice'
}, {
    label: 'Suhera',
    value: 'suhera'
}, {
    label: 'Ao-Nesa',
    value: 'ao-nesa'
}, {
    label: 'Biri-Ozi',
    value: 'biri-ozi'
}, {
    label: 'Wibsa-Thu',
    value: 'wibsa-thu'
}, {
    label: 'Démon',
    value: 'demon'
}, {
    label: 'Dieu/Déesse',
    value: 'god'
}, {
    label: 'Sentinelle',
    value: 'sentry'
}, {
    label: 'Autre',
    value: 'other'
}];

export default class CardMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            loading: true,
            filters: {
                search: '',
                type: null,
                specie: null,
                tags: [],
            }
        }

        this.timer = null;

        this.refFilters = new React.createRef();

        this.getCardList = this.getCardList.bind(this);
        this.logout = this.logout.bind(this);

        this.handleFilters = this.handleFilters.bind(this);
    }

    componentDidMount() {
        this.getCardList();
    }

    getCardList() {
        let filters = { ...this.state.filters }

        for (let value in filters) {
            if (!filters[value] || !filters[value].length) {
                delete filters[value];
            }
        }

        HttpPostRequest('/cards', filters)
            .then(response => {
                if (!response.ok) {
                    throw Error()
                }
                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    this.setState({
                        cards: data,
                        loading: false,
                    });
                }, 2000);
            })
            .catch(() => {
                this.setState({ loading: false });
                console.log('Erreur lors de la recupération des datas');
            })
    }

    logout() {
        AppProfile.profile.connected = false;
        AppProfile.profile.sessionType = "";

        localStorage.removeItem('Orceus');
        this.props.history.push('/Orceus/');
    }

    onMovingCard(e) {

        let card = e.target;
        const rect = card.getBoundingClientRect();
    
        let centerPointX = rect.x + rect.width / 2;
        let centerPointY = rect.y + rect.height / 2;
    
        let maxRotation = 20;

        const rotationFactorY = maxRotation / (rect.width / 2);
        const rotationFactorX =  maxRotation / (rect.height / 2);
        
        const yRotation = -1 * Math.ceil(e.clientX - centerPointX) * rotationFactorX;
        const xRotation = -1 * Math.ceil(e.clientY - centerPointY) * rotationFactorY;

        card.classList.add('active-card');
        card.style.setProperty("--card-rotate-y", `${yRotation}deg`);
        card.style.setProperty("--card-rotate-x", `${xRotation}deg`);
    }
    
    onLeavingCard(e) {
        let card = e.target;

        card.classList.remove('active-card');

        card.style.setProperty("--card-rotate-y", '0deg');
        card.style.setProperty("--card-rotate-x", '0deg');
    }

    handleFilters() {
        clearTimeout(this.timer);
        let form = this.refFilters.current.getFieldsValue();

        for (let filter in form) {
            if (filter === 'tags') {
                for (let i = 0; i < form[filter].length; i++) {
                    form[filter][i] = form[filter][i].toLowerCase();
                }
                continue;
            }
            if (!!form[filter]) {
                form[filter] = form[filter].toLowerCase();
            }
        }

        if (form.type !== 'character') {
            form.specie = null;
        }

        this.setState({
            filters: form,
        }, () => {
            this.timer = setTimeout(() => {
                this.getCardList();
            }, 1000);
        });
    }

    displayFilters() {
        let layout = {
            layout: "inline",
            fields: [{
                name: 'search',
                value: this.state.filters.search
            }, {
                name: 'type',
                value: this.state.filters.type
            }, {
                name: 'specie',
                value: this.state.filters.specie
            }, {
                name: 'tags',
                value: this.state.filters.tags
            }],
            onFieldsChange: this.handleFilters
        };

        return (
            <Row type="flex" justify="center">
                <Form ref={this.refFilters} {...layout}>
                    <Form.Item name="search">
                        <Input
                            className="input-filters"
                            placeholder="Recherche..." />
                    </Form.Item>
                    <Form.Item name="type">
                        <Select
                            options={TYPESOPTIONS}
                            allowClear
                            className="input-filters"
                            placeholder="Type..."
                            style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item
                        name="specie"
                        hidden={this.state.filters.type !== 'character'}>
                        <Select
                            options={SPECIESOPTIONS}
                            allowClear
                            className="input-filters"
                            placeholder="Race..."
                            style={{ width: 200 }} />
                    </Form.Item>
                    <Space style={{ height: 33 }}>
                        <Form.Item name="tags">
                            <Select
                                allowClear
                                mode="tags"
                                showArrow={false}
                                open={false}
                                className="input-filters"
                                placeholder="Mot clées..."
                                style={{ minWidth: 200, maxWidth: 500 }} />

                        </Form.Item>
                    </Space>
                </Form>
            </Row>
        );
    }

    render() {
        let cards = this.state.cards.map((cardItem, index) => {
            return (
                <Link to={"/Orceus/cards/" + cardItem.id} key={index}>
                    <img
                        className="card-img"
                        src={cardItem.card}
                        alt=" "
                        onMouseMove={this.onMovingCard}
                        onMouseLeave={this.onLeavingCard}
                    />
                </Link>
            );
        });

        return (
            <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
                <div className="header-background">
                    <button className="invisible" onClick={this.logout}>
                        <img
                            src={logoutBtn}
                            alt=""
                            style={{
                                width: 55,
                                height: 80,
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                cursor: 'pointer'
                            }}
                        />
                    </button>
                    <div className="filters">
                        {this.displayFilters()}
                    </div>
                    <div className="menu-links">
                        <Link to="/Orceus/SelectCharacters" key="toSelectCharacter">
                            <Face
                                style={{ color: 'white' }}
                                className='clickable'
                            />
                        </Link>
                        {(AppProfile.get('sessionType') === "09c71624"
                            || AppProfile.get('sessionType') === "a238a5dd") ? ([
                            (
                                <Link to="/Orceus/Rolls" key="toRoll">
                                    <Casino
                                        style={{ color: 'white' }}
                                        className='clickable'
                                    />
                                </Link>
                            ), (
                                <Link to="/Orceus/AdminSettings" key="toAdmin">
                                    <Settings
                                        style={{ color: 'white' }}
                                        className='clickable'
                                    />
                                </Link>
                            )]) : null}
                    </div>
                </div>
                <div className="container-card-menu">
                    {cards}
                    {(cards.length === 0 && !this.state.loading) ? (
                        <div style={{ color: 'white' }}>Aucune donnée</div>
                    ) : null}
                    {(this.state.loading) ? (
                        <img
                            className='loading-cards'
                            src={loading}
                            alt="loading"
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}