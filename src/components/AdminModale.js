import '../assets/css/adminModale.css';

import React from 'react';
import { connect } from 'react-redux';
import { getAdminCardById } from '../redux/reducers/card';
import { createCard, updateCardById } from '../redux/reducers/card';
import { Close, Delete, AddCircleOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Select from 'react-select';
import { Checkbox } from 'antd';
import loading from '../assets/images/loading.gif';

import {
    TYPESOPTIONS,
    SPECIESOPTIONS
} from '../constants';

const THEMESELECT = {
    placeholder: (provided) => ({
        ...provided,
        color: 'white'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    }),
    menu: (provided) => ({
      ...provided,
      color: 'white',
      backgroundColor: 'black',
    }),
    control: (provided) => ({
        ...provided,
        color: 'white',
        background: 'black',
        backgroundColor: 'black',
    }),
    option: (provided) => ({
        ...provided,
        backgroundColor: 'black',
        "&:hover": {
            backgroundColor: 'rgb(131, 131, 131)'
        }
    })
}

class AdminModale extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            closing: false
        }

        this.getCard = this.getCard.bind(this);
        this.close = this.close.bind(this);
        this.switchHiddenCard = this.switchHiddenCard.bind(this);
        this.changeText = this.changeText.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.addTag = this.addTag.bind(this);
        this.handleImg = this.handleImg.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.getCard();
    }

    getCard() {
        const {
            dispatch,
            selectedCard,
            card,
        } = this.props;

        if (card && card.id && !card.big_card)
            dispatch(getAdminCardById({
                id: selectedCard
            }));
    }

    close() {
        this.setState({
            closing: true,
        }, () => {
            setTimeout(() =>{
                this.setState({
                    closing: false
                }, () => {
                    this.props.close();
                })
            }, 300)
        })
    }

    switchHiddenCard() {
        let card = {...this.props.card};

        card.hidden = (card.hidden === "true") ? "false" : "true";
        
        this.props.dispatch({
            type: 'Cards/updateAdminCard',
            card: card,
        });
    }

    changeText(value, key) {
        let card = { ...this.props.card };

        card[key] = value.toLowerCase();

        this.props.dispatch({
            type: 'Cards/updateAdminCard',
            card: card,
        });
    }

    handleSelect(key, option) {
        let card = { ...this.props.card };

        card[key] = option.value;

        this.props.dispatch({
            type: 'Cards/updateAdminCard',
            card: card,
        });
    }

    handleImg(key) {
        let input = document.getElementById(key);

        input.click();
        input.addEventListener("change", (e) => {
            let file = e.target.files[0];
            let formData = new FormData();

            formData.append('image', file);
            
            let url = 'https://api.imgur.com/3/image';
            let headers= {
                'Authorization': 'Client-ID af0b96c87fae8bf',
            };

            this.setState({
                loading: true
            }, () => {
                fetch(url, {
                    mode: 'cors',
                    headers,
                    method: 'POST',
                    body: formData,
                }).then(response => {
                    if (!response.ok) {
                        throw Error();
                    }
                    return response.json();
                }).then(data => {
                    let card = {...this.props.card}

                    if (key === 'card') {
                        card.card = data.data.link;
                    } else {
                        card.big_card = data.data.link;
                    }

                    this.props.dispatch({
                        type: 'Cards/updateAdminCard',
                        card: card,
                    });
                }).catch((error) => {
                    console.error(error);
                });
            });
        });
    }

    handleTags(index, value) {
        let card = { ...this.props.card };

        card.tags[index] = value.toLowerCase();

        this.props.dispatch({
            type: 'Cards/updateAdminCard',
            card: card,
        });
    }

    removeTag(index) {
        let card = { ...this.props.card };

        card.tags.splice(index, 1);

        this.props.dispatch({
            type: 'Cards/updateAdminCard',
            card: card,
        });
    }

    addTag() {
        let card = { ...this.props.card };

        card.tags.push('');

        this.props.dispatch({
            type: 'Cards/updateAdminCard',
            card: card,
        });
    }

    getValueFromOptions(options, value) {
        if (!value) {
            return null;
        }

        let optionSelected = null;

        if (options === 'type') {
            optionSelected = TYPESOPTIONS.filter((type) => (type.value === value));
        } else {
            optionSelected = SPECIESOPTIONS.filter((specie) => (specie.value === value));
        }

        return optionSelected;
    }

    submit() {
        const {
            dispatch,
            card,
            selectedCard,
            close,
        } = this.props;

        if (card.id) {
            dispatch(updateCardById({
                id: selectedCard,
                card: card,
            }))
        } else {
            dispatch(createCard({
                card: card
            }))
        }

        close();
    }

    render() {
        let classModale = ['admin-modale-container', 'margin-modale'];
        let title = 'Création';
        let submitText = 'Créer'
        let cardImage = null;
        let bigCardImage = null;
        let cardContainerClass = ['input-card', 'p-0'];
        let bigCardContainerClass = ['input-big-card', 'p-0'];
        const {
            selectedCard,
            card,
            isLoading,
        } = this.props;
        
        if (this.props.show && !this.state.closing) {
            classModale.push('show');
        }
        if (!!selectedCard) {
            title = 'Modification';
            submitText = 'Appliquer';
        }

        if (!!card.card) {
            cardContainerClass.push('bg-transparent');
            cardImage = card.card;
        }
        if (!!card.big_card) {
            bigCardContainerClass.push('bg-transparent');
            bigCardImage = card.big_card;
        }

        if (isLoading) {
            return (
                <div className={classModale.join(' ')}>
                    <div className="header-modale pb-2">
                        <Close className="close-modale-btn" onClick={this.close}/>
                    </div>
                    <div className="body-modale">
                        <img
                            className='loading-cards'
                            src={loading}
                            alt="loading"
                        />
                    </div>
                    <div className="footer-modale p-2">
                    </div>
                </div>
            );
        }

        return (
            <div className={classModale.join(' ')}>
                <div className="header-modale pb-2">
                    <Close className="close-modale-btn" onClick={this.close}/>
                    <div className="modale-title">{title} d'une carte</div>
                </div>
                <div className="body-modale">
                    <label className="label-modale">Cachée :</label><br/>
                    <Checkbox
                        checked={(card.hidden === "true")}
                        onChange={this.switchHiddenCard}
                    /><br/>
                    <label className="label-modale">Numéro :</label><br/>
                    <input className="input-modale" 
                        type="number"
                        value={(card.card_num) ? card.card_num : 0}
                        onChange={(e) => this.changeText(e.target.value, 'card_num')}
                    />
                    <label className="label-modale">Nom :</label><br/>
                    <input className="input-modale" 
                        type="text"
                        value={(card.name) ? card.name : ''}
                        onChange={(e) => this.changeText(e.target.value, 'name')}
                    />
                    <label className="label-modale">Description :</label><br/>
                    <input className="input-modale"
                        type="text"
                        value={(card.desc) ? card.desc : ''}
                        onChange={(e) => this.changeText(e.target.value, 'desc')}
                    />

                    <label className="label-modale">Type :</label><br/>
                    <Select
                        className="input-modale"
                        type="text"
                        options={TYPESOPTIONS}
                        value={this.getValueFromOptions('type', card.type)}
                        onChange={(e) => {this.handleSelect('type', e)}}
                        styles={THEMESELECT}
                    />
                    { (card.type === 'character') ? (
                        <div>
                            <label className="label-modale">Espèce :</label><br/>
                            <Select
                                className="input-modale"
                                type="text"
                                options={SPECIESOPTIONS}
                                value={this.getValueFromOptions('specie', card.specie)}
                                onChange={(e) => {this.handleSelect('specie', e)}}
                                styles={THEMESELECT}
                            />
                        </div>
                    ) : null}

                    <div>
                        <label className="label-modale">Carte (petite) :</label><br/>
                        <input
                            type="file"
                            id="card"
                            className="d-none"
                            alt=""
                            accept=".jpg,.png"
                        />
                        <div style={{textAlign: 'center'}}>
                            <button
                                className={cardContainerClass.join(' ')}
                                onClick={() => { this.handleImg('card') }}
                            >
                                <img className="input-image"
                                    src={cardImage}
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="label-modale">Fiche (grande) :</label><br/>
                        <input
                            type="file"
                            id="big_card"
                            className="d-none"
                            alt=""
                            accept=".jpg,.png"
                        />
                        <div style={{textAlign: 'center'}}>
                            <button
                                className={bigCardContainerClass.join(' ')}
                                onClick={() => { this.handleImg('big_card') }}
                            >
                                <img className="input-image"
                                    src={bigCardImage}
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>

                    <label className="label-modale">Tags :</label>
                    <AddCircleOutline className="add-tag" onClick={this.addTag}/><br/>
                    {card.tags.map((tag, index) => (
                        <div className="tag-container" key={'tag' + index}>
                            <input
                                type="text"
                                className="input-tag"
                                value={tag}
                                onChange={(e) => {
                                    this.handleTags(index, e.target.value);
                                }}
                            />
                            <Delete
                                className="delete-tag"
                                onClick={() => this.removeTag(index)}
                            />
                        </div>
                    ))}
                </div>
                <div className="footer-modale p-2">
                    <Button
                        className="submit-btn"
                        variant="contained"
                        color="primary"
                        onClick={this.submit}
                        disabled={isLoading}>
                        {submitText}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    let card = state.cards.adminCards.find(card =>
        card.id === state.cards.selectedCard);

    if (!card)
        card = state.cards.adminCards.find(card => (!card.id));
    
    return {
        isLoading: state.cards?.isLoading,
        selectedCard: state.cards.selectedCard,
        card: JSON.parse(JSON.stringify(card)),
    }
}

export default connect(mapStateToProps)(AdminModale)