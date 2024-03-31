import "../../assets/css/character.css";

import React from 'react';
import { connect } from 'react-redux';
import {
    CloseOutlined,
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
    Upload,
    Button,
    Popover,
    Modal,
    Form,
    Input
} from 'antd';
import { v4 as uuid } from 'uuid';
import CharacterHeader from './ChararcterHeader';
import {
    NAMEPUISS,
    CHAR_BASE,
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

    componentDidMount() {
        this.actualizeFightStats();
    }

    componentDidUpdate() {
        if (this.state.statsFightChange) {
            this.actualizeFightStats();
        }
    }

    actualizeFightStats() {
        let character = { ...this.props.character };

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

        let fight = { ...character.fight };

        character.hp_max = base.att + (8 * base.def) + (3 * base.vit) + (3 * base.agi) + base.puiss + (6 * base.stren);
        fight.cac = Math.round(Math.sqrt(character.level * base.att) + (Math.pow(base.stren, 2) / 15));
        fight.dist = Math.round(Math.pow(character.level, 2) / 10 + (Math.pow(base.att, 2) * 0.02) * (1 + base.stren * 0.2));
        fight.mag = Math.round((base.att + base.puiss + (character.level / 10)) * (base.puiss / 20 + base.att / 40 + character.level / 100));
        fight.def_phy = Math.round(13 * Math.log(base.def));
        fight.def_mag = Math.round(13 * Math.log(base.def));
        fight.dodge = 6 + Math.round((4 * Math.log((base.vit + base.agi) / 2)) / 1.3);

        if (character.specie === "suhera" || character?.specie === "hanylice") {
            fight.cac = 0;
            fight.dist = 0;
            fight.mag = Math.round(Math.pow(character.level, 2) / 10 + (Math.pow(base.puiss, 2) * 0.02) * (1 + base.att * 0.2));
        }

        character.fight = fight;

        this.setState({
            statsFightChange: false
        }, () => this.props.dispatch({
            type: 'Characters/updateCharacter',
            character: character,
        }));
    }

    changeCharacterInfo(key, value) {
        let character = { ...this.props.character };

        character[key] = value;

        this.props.dispatch({
            type: 'Characters/updateCharacter',
            character: character,
        });

        //timeout permet d'actualiser les stats de combats
        setTimeout(() => this.setState({ statsFightChange: true }), 100);
    }

    changeCharacterStats(key, value) {
        let character = { ...this.props.character };

        if (value > 75) {
            value = 75;
        }

        character.stats[key] = value;

        this.props.dispatch({
            type: 'Characters/updateCharacter',
            character: character,
        });
    }

    changeCharacterFight(key, value) {
        let character = { ...this.props.character };

        character.fight[key] = parseInt(value);

        this.setState({
            statsFightChange: true
        }, () => this.props.dispatch({
            type: 'Characters/updateCharacter',
            character: character,
        }));
    }

    changeSearchValue(key, value) {
        this.setState({ [key]: value });
    }

    setImageCharacter(data) {
        let character = { ...this.props.character };

        let reader = new FileReader();
        reader.onload = (e) => {
            character.image = e.target.result;
            this.props.dispatch({
                type: 'Characters/updateCharacter',
                character: character,
            });
        };
        reader.readAsDataURL(data.fileList[0].originFileObj);
    }

    removeImageCharacter() {
        let character = { ...this.props.character };
        character.image = null;

        this.props.dispatch({
            type: 'Characters/updateCharacter',
            character: character,
        });
    }

    unequipItem(part, id) {
        let character = { ...this.props.character };
        let equipedPartIDs = [...character.equipment[part]];

        character.equipment[part] = equipedPartIDs.filter((item) => item !== id);

        this.props.dispatch({
            type: 'Characters/updateCharacter',
            character: character,
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

        let form = this.newForm.current.getFieldsValue();

        let skill = {
            id: uuid(),
            name: form.name,
            desc: form.desc,
        };

        if (!skill.name | !skill.desc)
            return;

        if (!character.skills)
            character.skills = [];

        character.skills.push(skill);

        this.setState({
            modalIsOpen: false
        }, () => {
            this.newForm.current.resetFields();
            this.props.dispatch({
                type: 'Characters/updateCharacter',
                character: character,
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
        let character = { ...this.props.character };
        let skills = !!character.skills ? [...character.skills] : [];

        skills.forEach((skill) => {
            if (skill.id === selectedSkill) {
                skill.name = modifiedSkill.name;
                skill.desc = modifiedSkill.desc;
            }
        })

        modifiedSkill = {
            name: "",
            desc: ""
        }

        character.skills = skills;

        this.setState({
            modifiedSkill,
            modalIsOpen: false,
            selectedSkill: null
        });
        this.props.dispatch({
            type: 'Characters/updateCharacter',
            character: character,
        });
    }

    deleteSkill(id) {
        let character = { ...this.props.character };
        let skills = !!character.skills ? [...character.skills] : [];

        character.skills = skills.filter(skill => {
            return skill.id !== id;
        })

        this.props.dispatch({
            type: 'Characters/updateCharacter',
            character: character,
        });
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

        let equipedPart = this.props.character.inventory.filter((item) => (
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

    _renderEquipment(filter, part) {
        const { character } = this.props;
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
                    let character = { ...this.props.character };

                    character.equipment[part].push(value);

                    this.props.dispatch({
                        type: 'Characters/updateCharacter',
                        character: character,
                    });
                }}
            />
        );
    }

    render() {
        const { character } = this.props;
        const { modalIsOpen, sectionState } = this.state;

        return (
            <div className="character-container">
                <CharacterHeader currentPage="character" />
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
                            onChange={(e) => this.changeCharacterInfo("firstname", e.target.value)}
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
                                <div className="background-image" />
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
                                        onChange={(val) => {
                                            let character = { ...this.props.character };
                                            character.config.puissName = val;
                                            this.props.dispatch({
                                                type: 'Characters/updateCharacter',
                                                character: character,
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
                                        content={this._renderEquipment("weapon", "weapon")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("weapon")}
                                </div>
                                <div>
                                    Plastron :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("armor", "plastron")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("plastron")}
                                </div>
                                <div>
                                    Bouclier :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("shield", "shield")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("shield")}
                                </div>
                                <div>Casque :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("armor", "helmet")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("helmet")}
                                </div>
                                <div>Gants :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("clothes", "glove")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("glove")}
                                </div>
                                <div>Chaussures :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment("clothes", "shoe")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("shoe")}
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
                                        content={this._renderEquipment("amulet", "amulet")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("amulet")}
                                </div>
                                <div>Autre :
                                    <Popover
                                        color="black"
                                        content={this._renderEquipment(null, "other")}
                                    >
                                        <PlusCircleOutlined
                                            className="add-equipment clickable"
                                        />
                                    </Popover>
                                </div>
                                <div>
                                    {this._renderEquiped("other")}
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
    const character = state.characters.characters.find(char =>
        char.id === state.characters?.selectedCharacter);

    return {
        isLoading: state.characters?.isLoading,
        character: JSON.parse(JSON.stringify(character)),
    }
}

export default connect(mapStateToProps)(Character)