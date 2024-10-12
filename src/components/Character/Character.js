import "../../assets/css/Character/character.css";

import React from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/reducers/images';
import { getUrlFromImage } from "../utils";
import {
    PlusCircleOutlined,
    MinusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
    DownOutlined,
    UpOutlined
} from '@ant-design/icons';
import {
    Select,
    Popover,
    Modal,
    Form,
    Input
} from 'antd';
import { v4 as uuid } from 'uuid';
import CharacterHeader from './ChararcterHeader';
import {
    NAMEPUISS,
    RACESTYPES,
    JOBS,
} from "../../constants";


const { TextArea } = Input;

class Character extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            selectedSkill: null,
            modifiedSkill: {
                name: "",
                desc: "",
            },
            sectionState: {
                statisitcs: true,
                comptencies: true,
                fight: true,
                equipment: true,
                story: true,
                notes: true
            },
            statsFightChange: false,
        }

        this.newForm = React.createRef();

        this.changeCharacterInfo = this.changeCharacterInfo.bind(this);
        this.changeCharacterStats = this.changeCharacterStats.bind(this);
        this.changeCharacterFight = this.changeCharacterFight.bind(this);
        this.setImageCharacter = this.setImageCharacter.bind(this);
        this.removeImageCharacter = this.removeImageCharacter.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.selectSkill = this.selectSkill.bind(this);
        this.changeSkill = this.changeSkill.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.validateSkillModification = this.validateSkillModification.bind(this);
        this.swithSection = this.swithSection.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.imageLoading && prevProps.imageLoading) {
            this.props.updateCharacter({
                ...this.props.character,
                image: this.props.newImage,
            });
        }
    }

    changeCharacterInfo(key, value) {
        let character = { ...this.props.character };

        character[key] = value;

        this.props.updateCharacter(character);
    }

    changeCharacterStats(key, value) {
        let character = { ...this.props.character };
        let stats = { ...character.stats };

        if (value > 75) {
            value = 75;
        }

        stats[key] = parseInt(value);

        
        this.props.updateCharacter({
            ...character,
            stats,
        });
    }

    changeCharacterFight(key, value) {
        let character = { ...this.props.character };
        let statFight = { ...character.fight };

        statFight[key] = parseInt(value);

        this.props.updateCharacter({
            ...character,
            fight: statFight,
        });

        this.setState({
            statsFightChange: true
        });
    }

    setImageCharacter(key) {
        let input = document.getElementById(key);

        input.click();
        input.addEventListener("change", (e) => {
            let file = e.target.files[0];
            let formData = new FormData();

            formData.append('file', file);
            
            this.props.dispatch(uploadImage(formData))
        });
    }

    removeImageCharacter(e) {
        e.preventDefault();

        this.props.updateCharacter({
            ...this.props.character,
            image: null,
        });
    }

    unequipItem(part, equipedItem) {
        let character = { ...this.props.character };

        this.props.updateCharacter({
            ...character,
            equipment: {
                ...character.equipment,
                [part]: character.equipment[part].filter(item =>
                    item.id !== equipedItem.id
                ),
            }
        });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false }, () => this.newForm.current.resetFields());
    }

    addSkill() {
        let character = { ...this.props.character };
        let skills = [ ...character.skills ];

        let form = this.newForm.current.getFieldsValue();

        let skill = {
            id: uuid(),
            isNew: true,
            name: form.name,
            desc: form.desc,
        };

        if (!skill.name | !skill.desc)
            return;

        if (!skills)
            skills = [];

        skills.push(skill);

        this.setState({
            modalIsOpen: false
        }, () => {
            this.newForm.current.resetFields();
            this.props.updateCharacter({
                ...character,
                skills: skills,
            });
        });
    }

    selectSkill(id) {
        let modifiedSkill = { ...this.state.modifiedSkill };
        let skills = [...this.props.character.skills];

        if (id !== null) {
            skills.forEach((skill) => {
                if (skill.id === id) {
                    modifiedSkill = {
                        name: skill.name,
                        desc: skill.desc
                    }
                }
            })
        } else {
            modifiedSkill = {
                name: "",
                desc: ""
            }
        }

        this.setState({
            selectedSkill: id,
            modifiedSkill
        });
    }

    changeSkill(part, value) {
        let modifiedSkill = { ...this.state.modifiedSkill };

        modifiedSkill[part] = value;

        this.setState({ modifiedSkill });
    }

    validateSkillModification() {
        let selectedSkill = this.state.selectedSkill;
        let modifiedSkill = { ...this.state.modifiedSkill };
        let character = { ...JSON.parse(JSON.stringify(this.props.character)) };
        let skills = [ ...character.skills ];

        skills.forEach(skill => {
            if (skill.id === selectedSkill) {
                skill.name = modifiedSkill.name;
                skill.desc = modifiedSkill.desc;
            }
        })

        modifiedSkill = {
            name: "",
            desc: ""
        }

        this.setState({
            modifiedSkill,
            modalIsOpen: false,
            selectedSkill: null
        });
        this.props.updateCharacter({
            ...character,
            skills: skills,
        });
    }

    deleteSkill(id) {
        let character = { ...this.props.character };
        let skills = !!character.skills ? [...character.skills] : [];

        character.skills = skills.filter(skill => {
            return skill.id !== id;
        })

        this.props.updateCharacter(character);
    }

    swithSection(section) {
        let sectionState = this.state.sectionState;

        switch (section) {
            case "statisitcs":
                sectionState.statisitcs = !sectionState.statisitcs;
                break;
            case "comptencies":
                sectionState.comptencies = !sectionState.comptencies;
                break;
            case "fight":
                sectionState.fight = !sectionState.fight;
                break;
            case "equipment":
                sectionState.equipment = !sectionState.equipment;
                break;
            case "story":
                sectionState.story = !sectionState.story;
                break;
            case "notes":
                sectionState.notes = !sectionState.notes;
                break;
            default:
                break;
        }

        this.setState({ sectionState });
    }

    _renderSkills() {
        let skills = [...this.props.character.skills];
        let modifiedSkill = { ...this.state.modifiedSkill };

        return skills.map((skill, index) => {
            if (!this.state.selectedSkill || this.state.selectedSkill !== skill.id) {
                return (
                    <div className="skill-container" key={`skills-${index}`}>
                        <div className="skill-title-container">
                            <div className="skill-name-text">
                                {skill.name} :
                            </div>
                            <EditOutlined
                                className="skill-icon clickable"
                                onClick={() => this.selectSkill(skill.id)}
                            />
                            <DeleteOutlined
                                className="skill-icon clickable"
                                onClick={() => this.deleteSkill(skill.id)}
                            />
                        </div>
                        <div className="skill-desc-text">
                            <TextArea
                                defaultValue={skill.desc}
                                readOnly
                                autoSize
                            />
                        </div>
                    </div>
                )
            }
            return (
                <div className="skill-container" key={`skills-${index}`}>
                    <div className="skill-title-container">
                        <div className="skill-edited-name-text">
                            <Input
                                type="text"
                                defaultValue={modifiedSkill.name}
                                onChange={(e) => this.changeSkill("name", e.target.value)}
                            /> :
                            <CloseCircleOutlined
                                className="skill-icon clickable"
                                onClick={() => this.selectSkill(null)}
                            />
                            <CheckCircleOutlined
                                className="skill-icon clickable"
                                onClick={() => this.validateSkillModification()}
                            />
                        </div>
                    </div>
                    <div className="skill-edited-desc-text">
                        <TextArea
                            autoSize={{
                                minRows: 2,
                                maxRows: 5,
                            }}
                            defaultValue={modifiedSkill.desc}
                            onChange={(e) => this.changeSkill("desc", e.target.value)}
                        />
                    </div>
                </div>
            );
        });
    }

    _renderEquiped(part) {
        let equipedPartIDs = [...this.props.character.equipment[part]];
        let equipedPart = this.props.character.inventory.filter((item) => 
            equipedPartIDs.map(equiped => equiped.id).includes(item.id)
        );

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
                            onClick={() => this.unequipItem(part, item)}
                        />
                    </div>
                </div>
            );
        })
    }

    _renderEquipment(filter, part) {
        const { character } = this.props;
        let options = [];
        let inventory = character?.inventory.filter((item) => (item.nb > 0))

        if (!inventory) return null;

        if (!!filter) {
            inventory = inventory.filter((item) => 
                item.type === filter || item.type === "artefact"
            )
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
                    const updatedCharacter = {
                        ...character,
                        equipment: {
                            ...character.equipment,
                            [part]: [...character.equipment[part], {
                                id: value
                            }]
                        }
                    };

                    console.log(updatedCharacter)
                    
                    this.props.updateCharacter(updatedCharacter);
                }}
            />
        );
    }

    render() {
        const { character } = this.props;
        const { modalIsOpen, sectionState } = this.state;

        return (
            <div className="character-container">
                <CharacterHeader
                    currentPage="character"
                    character={character}
                />
                <div className="info-container">
                    <div className="lastname">
                        <span>Nom : </span>
                        <input
                            placeholder="Nom"
                            value={character?.lastname}
                            onChange={(e) => 
                                this.changeCharacterInfo(
                                    "lastname",
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                    <div className="firstname">
                        <span>Prénom : </span>
                        <input
                            placeholder="Prénom"
                            value={character?.firstname}
                            onChange={(e) =>
                                this.changeCharacterInfo(
                                    "firstname",
                                    e.target.value,
                                )}
                        />
                    </div>
                    <div className="age">
                        <span>Age : </span>
                        <input
                            placeholder="Age"
                            type="number"
                            value={character?.yearOld}
                            onChange={e =>
                                this.changeCharacterInfo(
                                    "yearOld",
                                    e.target.value,
                                )}
                        />
                    </div>
                    <div className="species">
                        <span>Race : </span>
                        <Select
                            options={RACESTYPES}
                            placeholder="Race"
                            value={character?.specie}
                            onChange={val =>
                                this.changeCharacterInfo("specie", val)
                            }
                        />
                    </div>
                    <div className='job'>
                        <span>Métier : </span>
                        <Select
                            options={JOBS[character.specie]}
                            notFoundContent={"Veuillez choisir une race en premier"}
                            placeholder="Métier"
                            value={character?.job}
                            onChange={val =>
                                this.changeCharacterInfo("job", val)
                            }
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
                        <input
                            type="file"
                            id="mainImage"
                            className="d-none"
                            alt=""
                            accept=".jpg,.png"
                        />
                        {character?.image && (
                            <div
                                className="character-remove-image"
                                onClick={this.removeImageCharacter}
                            >
                                X
                            </div>
                        )}
                        <div style={{ textAlign: 'center' }}>
                            <div
                                className="character-add-image"
                                onClick={() => this.setImageCharacter('mainImage')}
                            >
                                <img className="preview-image"
                                    src={getUrlFromImage(character?.image) || undefined}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row-container">
                    <div className="column-container">
                        <div className="stats-container">
                            <div className="d-flex row">
                                <div className="title flex-2">Statistiques</div>
                                {(sectionState.statisitcs) ? (
                                    <DownOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("statisitcs")}
                                    />
                                ) : (
                                    <UpOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("statisitcs")}
                                    />
                                )}
                            </div>
                            <div className={(sectionState.statisitcs) ? "grid" : "d-none"}>
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
                                            style={{ width: character?.stats?.att % 100 + "%" }}
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
                                            style={{ width: character?.stats?.def % 100 + "%" }}
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
                                            style={{ width: character?.stats?.vit % 100 + "%" }}
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
                                            style={{ width: character?.stats?.agi % 100 + "%" }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Select
                                        className="puissname"
                                        options={NAMEPUISS}
                                        value={character?.config?.puissName || "puissance"}
                                        onChange={val => {
                                            this.props.updateCharacter({
                                                ...this.props.character,
                                                config: {
                                                    ...this.props.character.config,
                                                    puissName: val,
                                                }
                                            });
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
                                            style={{ width: character?.stats?.pui % 100 + "%" }}
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
                                            style={{ width: character?.stats?.char % 100 + "%" }}
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
                                            style={{ width: character?.stats?.prec % 100 + "%" }}
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
                                            style={{ width: character?.stats?.obs % 100 + "%" }}
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
                                            style={{ width: character?.stats?.luck % 100 + "%" }}
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
                                            style={{ width: character?.stats?.stren % 100 + "%" }}
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
                                            style={{ width: character?.stats?.know % 100 + "%" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="fight-container">
                            <div className="d-flex row">
                                <div className="title flex-2">Statistiques de combat</div>
                                {(sectionState.fight) ? (
                                    <DownOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("fight")}
                                    />
                                ) : (
                                    <UpOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("fight")}
                                    />
                                )}
                            </div>
                            <div className={(sectionState.fight) ? "list" : "d-none"}>
                                <div className="species">
                                    Race : {
                                        (!!character?.specie)
                                            ? RACESTYPES.find(
                                                item => character.specie === item.value
                                            )?.label
                                            : "-"
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
                                        placeholder={0}
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
                                        placeholder={0}
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
                        <div className="competencies-container">
                            <div className="d-flex row">
                                <div className="title flex-2">
                                    Competences
                                    <PlusCircleOutlined
                                        onClick={this.openModal}
                                        className="add-competency clickable"
                                    />
                                </div>
                                {(sectionState.comptencies) ? (
                                    <DownOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("comptencies")}
                                    />
                                ) : (
                                    <UpOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("comptencies")}
                                    />
                                )}
                            </div>
                            <div className={(sectionState.comptencies) ? "" : "d-none"}>
                                <Modal
                                    className="modal-new-item"
                                    visible={modalIsOpen}
                                    onOk={this.addSkill}
                                    onCancel={this.closeModal}
                                >
                                    <Form
                                        className="add-to-inventory"
                                        ref={this.newForm}
                                        initialValues={{
                                            name: "",
                                            type: null,
                                            stage: null,
                                            desc: "",
                                            carac: "",
                                            nb: null
                                        }}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        labelAlign="left"
                                        onFinish={this.addItem}
                                    >
                                        <Form.Item
                                            key={"name"}
                                            label="Nom"
                                            name="name"
                                            rules={[{
                                                required: true,
                                                message: 'Le nom est obligatoire.',
                                            }]}
                                        >
                                            <Input type="text" />
                                        </Form.Item>

                                        <Form.Item
                                            key={"desc"}
                                            label="Description"
                                            name="desc"
                                            rules={[{
                                                required: true,
                                                message: 'La description est obligatoire.',
                                            }]}
                                        >
                                            <TextArea
                                                autoSize={{
                                                    minRows: 2,
                                                    maxRows: 5,
                                                }}
                                            />
                                        </Form.Item>
                                    </Form>
                                </Modal>
                                {this._renderSkills()}
                            </div>
                        </div>

                        <div className="equip-container">
                            <div className="d-flex row">
                                <div className="title flex-2">Équipement</div>
                                {(sectionState.equipment) ? (
                                    <DownOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("equipment")}
                                    />
                                ) : (
                                    <UpOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("equipment")}
                                    />
                                )}
                            </div>
                            <div className={(sectionState.equipment) ? "equipment" : "d-none"}>
                                <div>
                                    Arme :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("weapon", "weapons")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("weapons")}
                                </div>
                                <div>
                                    Plastron :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("armor", "plastrons")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("plastrons")}
                                </div>
                                <div>
                                    Bouclier :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("shield", "shields")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("shields")}
                                </div>
                                <div>Casque :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("armor", "helmets")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("helmets")}
                                </div>
                                <div>Gants :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("clothes", "gloves")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("gloves")}
                                </div>
                                <div>Chaussures :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("clothes", "shoes")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("shoes")}
                                </div>
                                <div>Vêtement Haut :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("clothes", "topClothes")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("topClothes")}
                                </div>
                                <div>Vêtement Bas :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("clothes", "botClothes")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("botClothes")}
                                </div>
                                <div>Amulette :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("amulet", "amulets")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("amulets")}
                                </div>
                                <div>Autre :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment(null, "others")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("others")}
                                </div>
                            </div>
                        </div>

                        <div className="lore-container">
                            <div className="d-flex row">
                                <div className="title flex-2">Lore</div>
                                {(sectionState.story) ? (
                                    <DownOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("story")}
                                    />
                                ) : (
                                    <UpOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("story")}
                                    />
                                )}
                            </div>
                            <TextArea
                                className={(sectionState.story) ? "" : "d-none"}
                                value={character?.lore}
                                autoSize
                                onChange={(val) => this.changeCharacterInfo("lore", val.target.value)}
                            />
                        </div>

                        <div className="note-container">
                            <div className="d-flex row">
                                <div className="title flex-2">Notes</div>
                                {(sectionState.notes) ? (
                                    <DownOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("notes")}
                                    />
                                ) : (
                                    <UpOutlined
                                        className="icon-section"
                                        onClick={() => this.swithSection("notes")}
                                    />
                                )}
                            </div>
                            <TextArea
                                className={(sectionState.notes) ? "" : "d-none"}
                                value={character?.notes}
                                autoSize
                                onChange={(val) => this.changeCharacterInfo("notes", val.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        isLoading: state.characters?.isLoading,
        imageLoading: state.images.isLoading,
        newImage: state.images.lastImage,
    }
}

export default connect(mapStateToProps)(Character)