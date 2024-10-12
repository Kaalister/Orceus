import '../../assets/css/Admin/adminModale.css';

import React from 'react';
import { connect } from 'react-redux';
import { 
    getAdminCardById,
    createCard,
    updateCardById
} from '../../redux/reducers/cards';
import { uploadImage } from '../../redux/reducers/images';

import { Close, Delete, AddCircleOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Select from 'react-select';
import { Checkbox } from 'antd';
import loading from '../../assets/images/loading.gif';
import { getUrlFromImage } from '../utils';

import {
    TYPESOPTIONS,
    SPECIESOPTIONS
} from '../../constants';

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
            closing: false,
            lastNewImageKey: null,
            card: this.props.card
                ? JSON.parse(JSON.stringify(this.props.card)) 
                : {
                    images: [],
                    mainImage: null,
                    cardNum: 0,
                    desc: '',
                    hidden: true,
                    name: '',
                    specie: '',
                    tags: [],
                    type: 'toto',
                }
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
        this.removeImage = this.removeImage.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.getCard();
    }

    componentDidUpdate(prevProps) {
        if (!this.props.imageLoading && prevProps.imageLoading) {
            if (this.state.lastNewImageKey === 'mainImage') {
                this.setState({
                    card: {
                        ...this.state.card,
                        mainImage: this.props.newImage,
                    }
                })
            } else if (this.state.lastNewImageKey === 'new-image') {
                this.setState({
                    card: {
                        ...this.state.card,
                        images: [
                            ...this.state.card.images,
                            this.props.newImage,
                        ]
                    }
                })
            } else {
                const index = this.state.lastNewImageKey.split('-')[1];
                const card = this.state.card;
                
                card.images[index] = this.props.newImage;

                this.setState({ card });
            }
        }
    }

    getCard() {
        const {
            dispatch,
            selectedCard,
            card,
        } = this.props;

        if (selectedCard && !card)
            dispatch(getAdminCardById({ id: selectedCard }));
    }

    close() {
        this.setState({
            closing: true,
        }, () => {
            setTimeout(() => {
                this.setState({
                    closing: false
                }, () => {
                    this.props.close();
                })
            }, 300)
        })
    }

    switchHiddenCard() {
        this.setState({
            card: {
                ...this.state.card,
                hidden: !this.state.card.hidden
            }
        })
    }

    changeText(key, value) {
        this.setState({
            card: {
                ...this.state.card,
                [key]: value
            },
        });
    }

    handleSelect(key, option) {
        const card = {
            ...this.state.card,
            [key]: option.value,
        };

        if (key !== 'specie') card.specie = null

        this.setState({ card });
    }

    handleImg(key) {
        let input = document.getElementById(key);

        input.click();
        input.addEventListener("change", (e) => {
            let file = e.target.files[0];
            let formData = new FormData();

            formData.append('file', file);

            this.setState({
                loading: true,
                lastNewImageKey: key,
            }, () => {
                this.props.dispatch(uploadImage(formData))
            });
        });
    }

    removeImage(index) {
        const images = this.state.card.images;

        images.splice(index, 1);

        this.setState({
            card: {
                ...this.state.card,
                images: images,
            }
        })
    }

    handleTags(index, value) {
        const card = this.state.card;

        card.tags[index] = value;

        this.setState({ card })
    }

    removeTag(index) {
        const card = this.state.card;

        card.tags.splice(index, 1)

        this.setState({ card })
    }

    addTag() {
        const card = this.state.card;

        card.tags.push('')

        this.setState({ card })
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
            close,
        } = this.props;

        const {
            card
        } = this.state;

        if (card.id) {
            dispatch(updateCardById({
                id: card.id,
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
        let submitText = 'Créer';
        let cardContainerClass = ['input-card', 'p-0'];
        let bigCardContainerClass = ['input-big-card', 'p-0'];

        const {
            selectedCard,
            isLoading,
        } = this.props;
        const {
            card
        } = this.state;

        if (this.props.show && !this.state.closing) {
            classModale.push('show');
        }
        if (!!selectedCard) {
            title = 'Modification';
            submitText = 'Appliquer';
        }

        if (isLoading) {
            return (
                <div className={classModale.join(' ')}>
                    <div className="header-modale pb-2">
                        <Close className="close-modale-btn" onClick={this.close} />
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
                    <Close className="close-modale-btn" onClick={this.close} />
                    <div className="modale-title">{title} d'une carte</div>
                </div>
                <div className='body-modale'>
                    <div className='field'>
                        <label className="label-modale">Cachée :</label>
                        <Checkbox
                            checked={card.hidden}
                            onChange={this.switchHiddenCard}
                        />
                    </div>
                    <div className='field'>
                        <label className="label-modale">Numéro :</label>
                        <input className="input-modale"
                            type="number"
                            value={card.cardNum}
                            onChange={(e) => 
                                this.changeText('cardNum', e.target.value)
                            }
                            />
                    </div>
                    <div className='field'>
                        <label className="label-modale">Nom :</label>
                        <input className="input-modale"
                            type="text"
                            value={card.name}
                            onChange={(e) =>
                                this.changeText('name', e.target.value)
                            }
                        />
                    </div>
                    <div className='field column' style={{
                        alignItems: 'unset',
                        height: 'unset',
                        gap: 0
                    }}>
                        <label className="label-modale">Description :</label>
                        <textarea className="input-textarea-modale"
                            type="text"
                            value={card.desc}
                            onChange={(e) =>
                                this.changeText('desc', e.target.value)
                            }
                        />
                    </div>

                    <div className='field'>
                        <label className="label-modale">Type :</label>
                        <Select
                            className="select-modale"
                            type="text"
                            options={TYPESOPTIONS}
                            value={this.getValueFromOptions('type', card.type)}
                            onChange={(e) => { this.handleSelect('type', e) }}
                            styles={THEMESELECT}
                        />
                    </div>
                    
                    {card.type === 'character' && (
                        <div className='field'>
                            <label className="label-modale">Espèce :</label>
                            <Select
                                className="select-modale"
                                type="text"
                                options={SPECIESOPTIONS}
                                value={this.getValueFromOptions(
                                    'specie',
                                    card.specie
                                )}
                                onChange={(e) => this.handleSelect('specie', e)}
                                styles={THEMESELECT}
                            />
                        </div>
                    )}

                    <div className='field column' style={{
                        alignItems: 'unset',
                        height: 'unset',
                        gap: 0
                    }}>
                        <label className="label-modale">Carte (petite) :</label><br />
                        <input
                            type="file"
                            id="mainImage"
                            className="d-none"
                            alt=""
                            accept=".jpg,.png"
                        />
                        <div style={{ textAlign: 'center' }}>
                            <button
                                className={cardContainerClass.join(' ')}
                                onClick={() => { this.handleImg('mainImage') }}
                            >
                                <img className="input-image"
                                    src={getUrlFromImage(card.mainImage)}
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>

                    <div className='field'>
                        <label className="label-modale">Fiches (grande) :</label>
                        <>
                            <input
                                type="file"
                                id={`new-image`}
                                className="d-none"
                                alt=""
                                accept=".jpg,.png"
                                />
                            <AddCircleOutline
                                onClick={() =>
                                    this.handleImg(`new-image`)
                                }
                            />
                        </>
                    </div>
                    {card.images.length > 0 && (card.images.map(
                        (image, index) => (
                            <div key={`image-${index}`}>
                                <input
                                    type="file"
                                    id={`image-${index}`}
                                    className="d-none"
                                    alt=""
                                    accept=".jpg,.png"
                                />
                                <div style={{
                                    textAlign: 'center',
                                    position: 'relative',
                                }}>
                                    <Delete
                                        className='delete-image-icon'
                                        onClick={() =>
                                            this.removeImage(index)
                                        }
                                    />
                                    <button
                                        className={bigCardContainerClass.join(' ')}
                                        onClick={() =>
                                            this.handleImg(`image-${index}`)
                                        }
                                    >
                                        <img className="input-image"
                                            src={getUrlFromImage(image)}
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        )
                    ))}

                    <div className='field'>
                        <label className="label-modale">Tags :</label>
                        <AddCircleOutline onClick={this.addTag}/>
                    </div>
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

const mapStateToProps = function (state) {
    const selectedCard = state.cards.selectedCard;
    let card = undefined;

    if (selectedCard !== null)
        card = state.cards?.adminCards?.find(currentCard =>
            currentCard.id === selectedCard
        )

    return {
        selectedCard,
        card,
        isLoading: state.cards.isLoading,
        imageLoading: state.images.isLoading,
        newImage: state.images.lastImage,
    }
}

export default connect(mapStateToProps)(AdminModale)