import '../assets/css/cardMenu.css';

import React from 'react';
import { connect } from 'react-redux';
import { getFilteredCards } from '../redux/reducers/card';
import { Link } from 'react-router-dom';

import { Settings, Casino, Face } from '@material-ui/icons';
import { Select, Form, Input, Row, Space } from 'antd';
import 'antd/dist/antd.min.css'

import { AuthConsumer } from '../Profile';

import logoutBtn from '../assets/images/logoutBtn.png';
import loading from '../assets/images/loading.gif';
import { TYPESOPTIONS, SPECIESOPTIONS } from '../constants';

class CardMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        this.handleFilters = this.handleFilters.bind(this);
    }

    componentDidMount() {
        this.getCardList();
    }

    getCardList() {
        const {
            dispatch
        } = this.props;
        let filters = { ...this.state.filters }

        for (let value in filters) {
            if (!filters[value] || !filters[value].length) {
                delete filters[value];
            }
        }

        dispatch(getFilteredCards({
            filters: filters
        }));
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
        const {
            cards,
            isLoading,
            dispatch,
        } = this.props;

        const cardsRender = cards.map((cardItem, index) => {
            return (
                <Link
                    to={"/cards/" + cardItem.id}
                    key={index}
                    onClick={() => dispatch({
                        type: 'Cards/selectCard',
                        id: cardItem.id,
                    })}
                >
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
            <AuthConsumer>
                {({ sessionType, logout }) => (
                    <div
                        style={{
                            width: '100vw',
                            height: '100vh',
                            overflow: 'hidden',
                        }}
                    >
                        <div className="header-background">
                            <button className="invisible" onClick={logout}>
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
                                <Link to="/SelectCharacters" key="toSelectCharacter">
                                    <Face
                                        style={{ color: 'white' }}
                                        className='clickable'
                                    />
                                </Link>
                                {(sessionType === "09c71624" ||
                                    sessionType === "a238a5dd") && ([
                                    (
                                        <Link to="/Rolls" key="toRoll">
                                            <Casino
                                                style={{ color: 'white' }}
                                                className='clickable'
                                            />
                                        </Link>
                                    ), (
                                        <Link to="/AdminSettings" key="toAdmin">
                                            <Settings
                                                style={{ color: 'white' }}
                                                className='clickable'
                                            />
                                        </Link>
                                    )])}
                            </div>
                        </div>
                        <div className="container-card-menu">
                            {cardsRender}
                            {(cards.length === 0 && !isLoading) && (
                                <div style={{ color: 'white' }}>
                                    Aucune donnée
                                </div>
                            )}
                            {(isLoading && cards.length === 0) && (
                                <img
                                    className='loading-cards'
                                    src={loading}
                                    alt="loading"
                                />
                            )}
                        </div>
                    </div>
                )}
            </AuthConsumer>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        isLoading: state.cards?.isLoading,
        cards: state.cards?.cards || [],
    }
}

export default connect(mapStateToProps)(CardMenu)