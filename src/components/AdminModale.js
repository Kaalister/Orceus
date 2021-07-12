import React from 'react';
import { Close, Delete, AddCircleOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Select from 'react-select';

import { HttpGetRequest, HttpPostRequest } from '../HttpRequests';

import '../assets/css/adminModale.css';

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

export default class AdminModale extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            closing: false,
            card: {
                name: '',
                desc: '',
                type: null,
                specie: null,
                card: '',
                big_card: '',
                tags: [],
                card_num: -1,
            },
            loading: false,
        }

        this.getCard = this.getCard.bind(this);
        this.close = this.close.bind(this);
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

    changeText(value, key) {
        let card = { ...this.state.card };

        card[key] = value.toLowerCase();

        this.setState({ card });
    }

    handleSelect(key, option) {
        let card = { ...this.state.card };

        card[key] = option.value;

        this.setState({ card });
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
                    let card = {...this.state.card}

                    if (key === 'card') {
                        card.card = data.data.link;
                    } else {
                        card.big_card = data.data.link;
                    }

                    this.setState({
                        card,
                        loading: false
                    });
                }).catch((error) => {
                    console.log(error);
                });
            });
        });
    }

    handleTags(index, value) {
        let card = { ...this.state.card };

        card.tags[index] = value.toLowerCase();

        this.setState({ card });
    }

    removeTag(index) {
        let card = { ...this.state.card };

        card.tags.splice(index, 1);

        this.setState({ card });
    }

    addTag() {
        let card = { ...this.state.card };

        card.tags.push('');

        this.setState({ card });
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

        if (!!this.props.id) {
            let url = '/card/' + this.props.id;

            HttpPostRequest(url, { ...this.state.card })
            .then( response => {
                if (!response)
                    throw Error();
                
                return response.json();
            })
            .then( data => {
                if (!data)
                    throw Error();
                this.props.update();
                this.props.close();
            })
            .catch( () => {
                console.log("Erreur lors de l'update");
            });
            return;
        }

        let url = '/card/';

        HttpPostRequest(url, { ...this.state.card })
        .then( response => {
            if (!response)
                throw Error();
            
            return response.json();
        })
        .then( data => {
            if (!data)
                throw Error();
            this.props.update();
            this.props.close()
        })
        .catch( () => {
            console.log("Erreur lors de l'ajout");
        });
        return;        
    }

    render() {
        let classModale = ['admin-modale-container', 'margin-modale'];
        let title = 'Création';
        let submitText = 'Créer'
        let cardImage = null;
        let bigCardImage = null;
        let cardContainerClass = ['input-card', 'p-0'];
        let bigCardContainerClass = ['input-big-card', 'p-0'];
        
        if (this.props.show && !this.state.closing) {
            classModale.push('show');
        }
        if (!!this.props.id) {
            title = 'Modification';
            submitText = 'Appliquer';
        }

        if (!!this.state.card.card) {
            cardContainerClass.push('bg-transparent');
            cardImage = this.state.card.card;
        }
        if (!!this.state.card.big_card) {
            bigCardContainerClass.push('bg-transparent');
            bigCardImage = this.state.card.big_card;
        }

        return (
            <div className={classModale.join(' ')}>
                <div className="header-modale pb-2">
                    <Close className="close-modale-btn" onClick={this.close}/>
                    <div className="modale-title">{title} d'une carte</div>
                </div>
                <div className="body-modale">
                    <label className="label-modale">Numéro :</label><br/>
                    <input className="input-modale" 
                     type="number"
                     value={(this.state.card.card_num) ? this.state.card.card_num : 0}
                     onChange={(e) => this.changeText(e.target.value, 'card_num')}
                    />
                    <label className="label-modale">Nom :</label><br/>
                    <input className="input-modale" 
                     type="text"
                     value={(this.state.card.name) ? this.state.card.name : ''}
                     onChange={(e) => this.changeText(e.target.value, 'name')}
                    />
                    <label className="label-modale">Description :</label><br/>
                    <input className="input-modale"
                     type="text"
                     value={(this.state.card.desc) ? this.state.card.desc : ''}
                     onChange={(e) => this.changeText(e.target.value, 'desc')}
                    />

                    <label className="label-modale">Type :</label><br/>
                    <Select
                     className="input-modale"
                     type="text"
                     options={TYPESOPTIONS}
                     value={this.getValueFromOptions('type', this.state.card.type)}
                     onChange={(e) => {this.handleSelect('type', e)}}
                     styles={THEMESELECT}
                    />
                    { (this.state.card.type === 'character') ? (
                        <div>
                            <label className="label-modale">Espèce :</label><br/>
                            <Select
                             className="input-modale"
                             type="text"
                             options={SPECIESOPTIONS}
                             value={this.getValueFromOptions('specie', this.state.card.specie)}
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
                            <button className={cardContainerClass.join(' ')}
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
                            <button className={bigCardContainerClass.join(' ')}
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
                    {this.state.card.tags.map( (tag, index) => (
                        <div className="tag-container" key={'tag' + index}>
                            <input
                             type="text"
                             className="input-tag"
                             value={tag}
                             onChange={(e) => {
                                this.handleTags(index, e.target.value);
                             }}
                            />
                            <Delete className="delete-tag" onClick={() => this.removeTag(index)}/>
                        </div>
                    ))}
                </div>
                <div className="footer-modale pt-2">
                    <Button
                        className="submit-btn"
                        variant="contained"
                        color="primary"
                        onClick={this.submit}
                        disabled={this.state.loading}>
                        {submitText}
                    </Button>
                </div>
            </div>
        );
    }
}