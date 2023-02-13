import React from 'react';
import { CloseOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {
    Select,
    Upload,
    Button,
    Popover
} from 'antd';
import CharacterHeader from './ChararcterHeader';
import "../../assets/css/character.css";

const CHAR_BASE = {
    shashouille: {
        pilleur: {
            att: -2,
            def: -2,
            vit: -1,
            agi: 4,
            puiss: 2,
            stren: -3,
        },
        artificier: {
            att: 0,
            def: -3,
            vit: -1,
            agi: 2,
            puiss: 2,
            stren: -3,
        },
        nomade: {
            att: -2,
            def: 0,
            vit: -1,
            agi: 4,
            puiss: 2,
            stren: -3,
        },
        artisan: {
            att: -2,
            def: -2,
            vit: -1,
            agi: 4,
            puiss: 2,
            stren: -3,
        },
        medecin: {
            att: -2,
            def: 0,
            vit: -1,
            agi: 4,
            puiss: 2,
            stren: -3,
        },
        illumine: {
            att: -2,
            def: 0,
            vit: -1,
            agi: 2,
            puiss: 5,
            stren: -3,
        }
    },
    ciheuphe: {
        dresseur: {
            att: 1,
            def: 0,
            vit: 2,
            agi: 3,
            puiss: 1,
            stren: 0,
        },
        chasseur: {
            att: 2,
            def: 0,
            vit: 2,
            agi: 2,
            puiss: -2,
            stren: 1,
        },
        danseur: {
            att: -2,
            def: -2,
            vit: 2,
            agi: 2,
            puiss: 3,
            stren: -1,
        },
        nomade: {
            att: -2,
            def: 0,
            vit: 2,
            agi: 2,
            puiss: 0,
            stren: 0,
        },
        herboriste: {
            att: -2,
            def: 0,
            vit: 2,
            agi: 3,
            puiss: 0,
            stren: 0,
        },
        erudit: {
            att: -2,
            def: 0,
            vit: 2,
            agi: 3,
            puiss: 0,
            stren: -1,
        },
        illumine: {
            att: 0,
            def: 0,
            vit: 2,
            agi: 2,
            puiss: 3,
            stren: 0,
        }
    },
    humain: {
        chevalier: {
            att: 1,
            def: 1,
            vit: 0,
            agi: -2,
            puiss: 0,
            stren: 2,
        },
        tireur: {
            att: 2,
            def: 0,
            vit: 0,
            agi: 2,
            puiss: 0,
            stren: 0,
        },
        barde: {
            att: 1,
            def: 0,
            vit: 0,
            agi: 1,
            puiss: 2,
            stren: 0,
        },
        illumine: {
            att: 0,
            def: 0,
            vit: 0,
            agi: 0,
            puiss: 3,
            stren: 0,
        },
        medecin: {
            att: 0,
            def: 0,
            vit: 0,
            agi: 1,
            puiss: 0,
            stren: 0,
        },
        createur: {
            att: 1,
            def: 0,
            vit: 0,
            agi: 1,
            puiss: 0,
            stren: 0,
        },
        nomade: {
            att: -2,
            def: 0,
            vit: 0,
            agi: 0,
            puiss: 0,
            stren: 0,
        },
    },
    robot: {
        assassin: {
            att: 3,
            def: -3,
            vit: 4,
            agi: 3,
            puiss: 0,
            stren: 2,
        },
        soigneur: {
            att: -1,
            def: 1,
            vit: 0,
            agi: 1,
            puiss: 0,
            stren: -1,
        },
        protecteur: {
            att: -1,
            def: 1,
            vit: 0,
            agi: 1,
            puiss: 0,
            stren: -1,
        },
        tireur: {
            att: 4,
            def: -4,
            vit: 1,
            agi: 1,
            puiss: 0,
            stren: 2,
        },
        createur: {
            att: 0,
            def: -4,
            vit: 1,
            agi: 4,
            puiss: 0,
            stren: 1,
        },
    },
    suhera: {
        sorciere: {
            att: 0,
            def: -3,
            vit: -1,
            agi: 1,
            puiss: 4,
            stren: 3,
        },
        angeliste: {
            att: -3,
            def: 1,
            vit: -2,
            agi: 1,
            puiss: 5,
            stren: -1,
        },
        distordeur: {
            att: -3,
            def: -3,
            vit: 2,
            agi: 3,
            puiss: 5,
            stren: 1,
        },
    },
    hanylice: {
        tele_kinesiste: {
            att: -1,
            def: 3,
            vit: -2,
            agi: -3,
            puiss: 5,
            stren: 1,
        },
        controleur: {
            att: 0,
            def: 3,
            vit: -2,
            agi: -2,
            puiss: 5,
            stren: 1,
        },
    }
};

const RACESTYPES = [{
    value: 'humain',
    label: 'Humain',
}, {
    label: 'Shashouille',
    value: 'shashouille'
} ,{
    label: 'Ciheuphe',
    value: 'ciheuphe'
}, {
    label: 'Robot',
    value: 'robot'
}, {
    label: 'Suhera',
    value: 'suhera'
}, {
    label: 'Hanylice',
    value: 'hanylice'
}];

const JOBS = {
    shashouille: [{
        label: 'Pilleur',
        value: 'pilleur',
    }, {
        label: 'Artificier',
        value: 'artificier',
    }, {
        label: 'Nomade',
        value: 'nomade',
    }, {
        label: 'Artisan',
        value: 'artisan',
    }, {
        label: 'Médecin',
        value: 'medecin',
    }, {
        label: 'Illuminé',
        value: 'illumine',
    }],
    ciheuphe: [{
        label: 'Dresseur',
        value: 'dresseur',
    }, {
        label: 'Chasseur',
        value: 'chasseur',
    }, {
        label: 'Danseur',
        value: 'danseur',
    }, {
        label: 'Nomade',
        value: 'nomade',
    }, {
        label: 'Herboriste',
        value: 'herboriste',
    }, {
        label: 'Érudit',
        value: 'erudit',
    }, {
        label: 'Illuminé',
        value: 'illumine',
    }],
    humain: [{
        label: 'Chevalier',
        value: 'chevalier',
    }, {
        label: 'Tireur',
        value: 'tireur',
    }, {
        label: 'Barde',
        value: 'barde',
    }, {
        label: 'Illuminé',
        value: 'illumine',
    }, {
        label: 'Médecin',
        value: 'medecin',
    }, {
        label: 'Créateur',
        value: 'createur',
    }, {
        label: 'Nomade',
        value: 'nomade',
    }],
    robot: [{
        label: 'Assassin',
        value: 'assassin',
    }, {
        label: 'Soigneur',
        value: 'soigneur',
    }, {
        label: 'Protecteur',
        value: 'protecteur',
    }, {
        label: 'Tireur',
        value: 'tireur',
    }, {
        label: 'Créateur',
        value: 'createur',
    }],
    suhera: [{
        label: 'Sorcière',
        value: 'sorciere',
    }, {
        label: 'Angliste',
        value: 'angliste',
    }, {
        label: 'Distordeur',
        value: 'distordeur',
    }],
    hanylice: [{
        label: 'Télé-Kinésiste',
        value: 'tele_kinesiste',
    }, {
        label: 'Controleur',
        value: 'controleur',
    }]
};

const NAMEPUISS = [{
    label: "Puiss. Naty",
    value: "puissance",
}, {
    label: "Malédiction",
    value: "malediction"
}, {
    label: "Focus",
    value: "focus"
}]

export default class Character extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            character: {
                id: null,
                competencies: {},
                equipment: {
                    weapon: [],
                    plastron: [],
                    shield: [],
                    helmet: [],
                    glove: [],
                    shoe: [],
                    topClothes: [],
                    botClothes: [],
                    amulet: [],
                    other: []
                },
                fight: {
                    att: 0,
                    def: 0,
                    vit: 0,
                    agi: 0,
                    puiss: 0,
                    stren: 0,
        
                    cac: 0,
                    dist: 0,
                    mag: 0,
                    def_phy: 0,
                    def_mag: 0,
                    dodge: 0,
                },
                firstname: "",
                lastname: "",
                hp_max: 1,
                hp: 1,
                image: null,
                job: null,
                level: 1,
                specie: null,
                stats: {
                    agi: 1,
                    att: 1,
                    char: 1,
                    def: 1,
                    luck: 1,
                    obs: 1,
                    prec: 1,
                    pui: 1,
                    stren: 1,
                    vit: 1,
                    know: 1,
                },
                years_old: 0,
                config: {
                    puissName: null,
                },
                lore: '',
                notes: '',
                inventory: []
            }
        }

        this.changeCharacterInfo = this.changeCharacterInfo.bind(this);
        this.changeCharacterStats = this.changeCharacterStats.bind(this);
        this.changeCharacterFight = this.changeCharacterFight.bind(this);
        this.setImageCharacter = this.setImageCharacter.bind(this);
        this.removeImageCharacter = this.removeImageCharacter.bind(this);
        this.renderEquipment = this.renderEquipment.bind(this);
        this.renderEquiped = this.renderEquiped.bind(this);
    }

    componentDidMount() {
        this.setState({ character: this.props.character });
        this.actualizeFightStats();
    }

    componentDidUpdate() {
        if (this.state.statsFightChange) {
            this.actualizeFightStats();
        }
    }
 
    actualizeFightStats() {
        let { character } = this.state;
        if (!character.specie || !character.job) {
            return;
        }

        let base = CHAR_BASE[character.specie][character.job] || null;

        if (base === null) {
            return;
        }

        base = {
            att: base.att + character.fight.att,
            def: base.def + character.fight.def,
            vit: base.vit + character.fight.vit,
            agi: base.agi + character.fight.agi,
            puiss: base.puiss + character.fight.puiss,
            stren: base.stren + character.fight.stren,
        }

        character.hp_max = base.att + (8 * base.def) + (3 * base.vit) + (3 * base.agi) + base.puiss + (6 * base.stren);
        character.fight.cac = Math.round(Math.sqrt(character.level * base.att) + (Math.pow(base.stren, 2) / 15));
        character.fight.dist = Math.round(Math.pow(character.level, 2) / 10 + ( Math.pow(base.att, 2) * 0.02) * (1 + base.stren * 0.02))
        character.fight.mag = Math.round((base.att + base.puiss + (character.level / 10)) * (base.puiss / 20 + base.att / 40 + character.level / 100));
        character.fight.def_phy = Math.round(13 * Math.log(base.def));
        character.fight.def_mag = Math.round(13 * Math.log(base.def));
        character.fight.dodge = 6 + Math.round((4 * Math.log((base.vit + base.agi) / 2)) / 1.3);

        this.setState({statsFightChange: false}, () => this.props.actualizeCharacter(character));
    }

    changeCharacterInfo(key, value) {
        let character = {...this.state.character};
        character[key] = value;

        this.setState({
            character,
            statsFightChange: true
        }, () => this.props.actualizeCharacter(this.state.character));
    }

    changeCharacterStats(key, value) {
        let character = {...this.state.character};
        if (value > 75) {
            value = 75;
        }

        character.stats[key] = value; 

        this.setState({ character }, () => this.props.actualizeCharacter(character));
    }

    changeCharacterFight(key, value) {
        let character = {...this.state.character};
        character.fight[key] = parseInt(value); 

        this.setState({
            character,
            statsFightChange: true,
        }, () => this.props.actualizeCharacter(character));
    }

    changeSearchValue(key, value) {
        this.setState({ [key]: value });
    }

    setImageCharacter(data) {
        let { character } = this.state;

        let reader = new FileReader();
        reader.onload = (e) => {
            character.image = e.target.result;
            this.setState({ character }, () => this.props.actualizeCharacter(character));
        };
        reader.readAsDataURL(data.fileList[0].originFileObj);
    }

    removeImageCharacter() {
        let { character } = this.state;
        character.image = null;

        this.setState({ character }, () => this.props.actualizeCharacter(character));
    }

    resizeTextarea(e) {
        e.target.style.height = 'inherit';

        let height = e.target.scrollHeight + 30;

        if (height > 500) {
            height = 500;
        }

        e.target.style.height = `${height}px`; 
    }

    unequipItem(part, id) {
        let { character } = this.state;
        let equipedPartIDs = [...character.equipment[part]];

        character.equipment[part] = equipedPartIDs.filter((item) => item !== id);

        this.setState({ character }, () => this.props.actualizeCharacter(character))
    }

    renderEquiped(part) {
        let equipedPartIDs = [...this.state.character.equipment[part]];

        let equipedPart = this.state.character.inventory.filter((item) => (
            equipedPartIDs.includes(item.id)
        ));

        return equipedPart.map((item) => {
            return (
                <div className="equiped-item" key={item.id}>
                    <div className="equiped-item-name">
                        {item.name}
                    </div>
                    <div className="equiped-item-carac">
                        {item.carac}
                    </div>
                    <div className="equiped-item-actions">
                        <MinusCircleOutlined
                            className="clickable"
                            onClick={() => this.unequipItem(part, item.id)}
                        />
                    </div>
                </div>
            );
        })
    }

    renderEquipment(filter, part) {
        let { character } = this.state;
        let options = [];
        
        let inventory = character?.inventory.filter((item) => (item.nb > 0))

        if (!inventory) {
            return null;
        }

        if (!!filter) {
            inventory = inventory.filter((item) => (item.type === filter))
        }

        options = inventory.map((item) => ({
            label: item.name,
            value: item.id
        }));

        return (
            <Select
                className="select-equipment"
                options={options}
                value={null}
                notFoundContent={"Rien Trouvé"}
                onChange={(value) => {
                    let { character } = this.state;

                    character.equipment[part].push(value);

                    this.setState({ character }, () => this.props.actualizeCharacter(character));
                }}
            />
        );
    }

    render() {
        const { character } = this.state;

        return (
            <div className="character-container">
                <CharacterHeader saveCharacter={this.props.saveCharacter}/>
                <div className="info-container">
                    <div className="lastname">
                        <span>Nom : </span>
                        <input
                            placeholder="Nom"
                            value={character?.lastname}
                            onChange={(e) => this.changeCharacterInfo("lastname", e.target.value)}
                            />
                    </div>
                    <div className="firstname">
                        <span>Prénom : </span>
                        <input
                            placeholder="Prénom"
                            value={character?.firstname}
                            onChange={(e) => this.changeCharacterInfo("firstname", e.target.value) }
                        />
                    </div>
                    <div className="age">
                        <span>Age : </span>
                        <input
                            placeholder="Age"
                            type="number"
                            value={character?.years_old}
                            onChange={(e) => this.changeCharacterInfo("years_old", e.target.value)}
                        />
                    </div>
                    <div className="species">
                        <span>Race : </span>
                        <Select
                            options={RACESTYPES}
                            placeholder="Race"
                            value={character?.specie}
                            onChange={(val) => this.changeCharacterInfo("specie", val)}
                        />
                    </div>
                    <div className='job'>
                        <span>Métier : </span>
                        <Select
                            showSearch
                            options={(!!character?.specie) ? JOBS[character.specie] : null}
                            searchValue={this.state.jobSearch}
                            placeholder="Métier"
                            value={character?.job}
                            notFoundContent={null}
                            onChange={(val) => this.changeCharacterInfo("job", val)}
                            onSearch={(val) => {
                                this.changeCharacterInfo("job", val);
                                this.changeSearchValue("jobSearch", val);
                            }}
                            onInputKeyDown={(input) => {
                                if (input.key === "Enter") {
                                    this.changeCharacterInfo("job", this.state.jobSearch);
                                    this.changeSearchValue("jobSearch", '');
                                }
                            }}

                        />
                    </div>
                    <div className='hp'>
                        <span>P.V. : </span>
                        <input
                            className={
                                (character?.hp <= 0) ? 
                                    (character?.hp < (-1 * character?.hp_max)) ? 
                                        "dead-hp"
                                        : "critical-hp"
                                    : (character?.hp > character?.hp_max) ?
                                        "over-hp"
                                        : "normal-hp"
                            }
                            type="number"
                            value={character?.hp}
                            onChange={(val) => {
                                this.changeCharacterInfo("hp", val.target.value);
                            }}
                        />
                    </div>
                    <div className="image">
                        <Upload
                            name='file'
                            action={null}
                            itemRender={null}
                            showUploadList={false}
                            onChange={this.setImageCharacter}
                        >
                            <div className="preview-image">
                                <div className="background-image"/>
                                <CloseOutlined
                                    onClick={this.removeImageCharacter}
                                    className={
                                        (!!character?.image)
                                        ? "remove-image"
                                        : "remove-image hidden"
                                    } 
                                />
                                <Button className="button-upload" type="text">
                                    {(!!character?.image) ? (
                                        <img
                                            alt="example"
                                            style={{
                                                width: '100%',
                                                height: '100%'
                                            }}
                                            src={character?.image}
                                        />
                                    ) : "Pas d'image"}
                                </Button>
                            </div>
                        </Upload>
                    </div>
                </div>

                <div className="row-container">
                    <div className="column-container">
                        <div className="stats-container">
                            <div className="title">Statistiques</div>
                            <div className="grid">
                                <div>
                                    <div className="name-cat">
                                        Attaque :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.att}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("att", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.att % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="name-cat">
                                        Défense :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.def}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("def", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.def % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="name-cat">
                                        Vitesse :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.vit}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("vit", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.vit % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="name-cat">
                                        Agilité :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.agi}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("agi", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.agi % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Select
                                        className="puissname"
                                        options={NAMEPUISS}
                                        value={character?.config?.puissName || "puissance"}
                                        onChange={(val) => {
                                            let { character } = this.state;
                                            character.config.puissName = val; 
                                            this.setState({
                                                character
                                            }, () => this.props.actualizeCharacter(character));
                                        }}
                                    /> :
                                    <input
                                        type="number"
                                        value={character?.stats?.pui}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("pui", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.pui % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="name-cat">
                                        Charisme :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.char}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("char", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.char % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="name-cat">
                                        Précision :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.prec}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("prec", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.prec % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="name-cat">
                                        Observation :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.obs}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("obs", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.obs % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="name-cat">
                                        Chance :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.luck}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("luck", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.luck % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="name-cat">
                                        Force :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.stren}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("stren", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.stren % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="name-cat">
                                        Connaissance :
                                    </div>
                                    <input
                                        type="number"
                                        value={character?.stats?.know}
                                        max={75}
                                        onChange={(val) => {
                                            this.changeCharacterStats("know", val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="graph-container">
                                    <div className="graph-background">
                                        <div
                                            className="graph"
                                            style={{width: character?.stats?.know % 100 + "%"}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="fight-container">
                            <div className="title">Statistiques de combat</div>
                            <div className="list">
                                <div className="species">
                                    Race : {
                                        (!!character?.specie)
                                            ? RACESTYPES.find(
                                                item => character.specie === item.value
                                            )?.label
                                            :"-"
                                    }
                                </div>
                                <div className="job">
                                    Métier : {
                                        (!!character?.specie)
                                            ? JOBS[character.specie].find(item => (
                                                character.job === item.value)
                                            )?.label
                                            : "-"
                                    }
                                </div>
                                <div className="level">
                                    Level : <input
                                        type="number"
                                        placeholder={1}
                                        value={character?.level}
                                        onChange={(e) => this.changeCharacterInfo("level", e.target.value)}
                                    />
                                </div>
                                <div className="hp">
                                    P.V. : {character?.hp_max}
                                </div>
                                <div className="att">
                                    Attaque :
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.att}
                                        onChange={(val) => this.changeCharacterFight("att", val.target.value)}
                                    />
                                </div>
                                <div className="def">
                                    Défense : 
                                    <input
                                        type="number"
                                        placeholder= {0}
                                        value={character?.fight?.def}
                                        onChange={(val) => this.changeCharacterFight("def", val.target.value)}
                                    />
                                </div>
                                <div className="vit">
                                    Vitesse : 
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.vit}
                                        onChange={(val) => this.changeCharacterFight("vit", val.target.value)}
                                    />
                                </div>
                                <div className="agi">
                                    Agilité : 
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.agi}
                                        onChange={(val) => this.changeCharacterFight("agi", val.target.value)}
                                    />
                                </div>
                                <div className="puiss">
                                    <Select
                                        className="puissname"
                                        options={NAMEPUISS}
                                        disabled
                                        value={character?.config?.puissName || "puissance"}
                                    />:
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.puiss}
                                        onChange={(val) => this.changeCharacterFight("puiss", val.target.value)}
                                    />
                                </div>
                                <div className="stren">
                                    Force :
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.stren}
                                        onChange={(val) => this.changeCharacterFight("stren", val.target.value)}
                                    />
                                </div>
                                <div className="cac">
                                    Dégâts (C. à C.) :
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.cac}
                                        disabled
                                    />
                                </div>
                                <div className="dist">
                                    Dégâts (Dist.) :
                                    <input
                                        type="number"
                                        placeholder= {0}
                                        value={character?.fight?.dist}
                                        disabled
                                    />
                                </div>
                                <div className="mag">
                                    Dégâts (Mag.) :
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.mag}
                                        disabled
                                    />
                                </div>
                                <div className="def_phy">
                                    Déf. Phy. : 
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.def_phy}
                                        disabled
                                    />
                                </div>
                                <div className="def_mag">
                                    Déf. Mag. : 
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.def_mag}
                                        disabled
                                    />
                                </div>
                                <div className="dodge">
                                    Esquive :
                                    <input
                                        type="number"
                                        placeholder={0}
                                        value={character?.fight?.dodge}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="column-container">
                        <div className="equip-container">
                            <div className="title">Équipement</div>
                            <div className="equipment">
                                <div>
                                    Arme :
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment("weapon", "weapon")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this.renderEquiped("weapon")}
                                </div>
                                <div>
                                    Plastron :
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment("armor", "plastron")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this.renderEquiped("plastron")}
                                </div>
                                <div>
                                    Bouclier : 
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment("shield", "shield")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                {this.renderEquiped("shield")}
                                </div>
                                <div>Casque : 
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment("armor", "helmet")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this.renderEquiped("helmet")}
                                </div>
                                <div>Gants : 
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment("armor", "glove")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this.renderEquiped("glove")}
                                </div>
                                <div>Chaussures : 
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment("armor", "shoe")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this.renderEquiped("shoe")}
                                </div>
                                <div>Vêtement Haut : 
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment("clothes", "topClothes")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this.renderEquiped("topClothes")}
                                </div>
                                <div>Vêtement Bas : 
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment("clothes", "botClothes")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this.renderEquiped("botClothes")}
                                </div>
                                <div>Amulette : 
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment("amulet", "amulet")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this.renderEquiped("amulet")}
                                </div>
                                <div>Autre : 
                                    <Popover
                                        color="black"
                                        content={this.renderEquipment(null, "other")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this.renderEquiped("other")}
                                </div>
                            </div>
                        </div>

                        <div className="lore-container">
                            <div className="title">Lore</div>
                            <textarea
                                value={character?.lore}
                                onKeyDown={this.resizeTextarea}
                                onChange={(val) => this.changeCharacterInfo("lore", val.target.value)}
                            />
                        </div>

                        <div className="note-container">
                            <div className="title">Notes</div>
                            <textarea
                                value={character?.notes}
                                onKeyDown={this.resizeTextarea}
                                onChange={(val) => this.changeCharacterInfo("notes", val.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}