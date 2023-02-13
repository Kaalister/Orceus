import React from 'react';
import {
    Table,
    Select,
    Form,
    Input,
    Modal
} from 'antd';
import { DeleteOutline, AddCircleOutline } from '@mui/icons-material';
import { v4 as uuid } from 'uuid'; 

import CharacterHeader from './ChararcterHeader';

import "../../assets/css/inventory.css";

const { TextArea } = Input;

const TYPES = [{
    label: "Arme",
    value: "weapon"
}, {
    label: "Bouclier",
    value: "shield"
}, {
    label: "Armure",
    value: "armor"
}, {
    label: "Amulette",
    value: "amulet"
}, {
    label: "Vêtement",
    value: "clothes"
},{
    label: "Pierre",
    value: "rock"
}, {
    label: "Plante",
    value: "plant"
}, {
    label: "Relique",
    value: "relic"
}, {
    label: "Artefact",
    value: "artefact"
}, {
    label: "Accessoire",
    value: "accessory"
}, {
    label: "Consommable",
    value: "consumable"
}, {
    label: "Autre",
    value: "other"
}];

export default class Inventory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            character: null,
            modalIsOpen: false
        };

        this.newForm = React.createRef();

        this.onChangeItem = this.onChangeItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeNewItem = this.onChangeNewItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {
        this.setState({ character : this.props.character });
    }

    onChangeItem = (value, id, property) => {
        let { character } = this.state;
        let index = character.inventory.findIndex((item) => item.id === id);

        if (index === -1) {
            return;
        }

        character.inventory[index][property] = value;

        this.setState({ character }, () => this.props.actualizeCharacter(this.state.character));
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    removeItem = (id) => {
        let { character } = this.state;
        let index = character.inventory.findIndex((item) => item.id === id);


        if (index === -1) {
            return;
        }

        character.inventory.splice(index, 1);
        character.equipment.amulet = character.equipment.amulet.filter(item => item !== id);
        character.equipment.botClothes = character.equipment.botClothes.filter(item => item !== id);
        character.equipment.topClothes = character.equipment.topClothes.filter(item => item !== id);
        character.equipment.glove = character.equipment.glove.filter(item => item !== id);
        character.equipment.helmet = character.equipment.helmet.filter(item => item !== id);
        character.equipment.plastron = character.equipment.plastron.filter(item => item !== id);
        character.equipment.shield = character.equipment.shield.filter(item => item !== id);
        character.equipment.shoe = character.equipment.shoe.filter(item => item !== id);
        character.equipment.weapon = character.equipment.weapon.filter(item => item !== id);
        character.equipment.other = character.equipment.other.filter(item => item !== id);
        

        this.setState({ character }, () => this.props.actualizeCharacter(this.state.character));
    }

    addItem = () => {
        let { character } = this.state;

        let form = this.newForm.current.getFieldsValue();
        let item = {
            id: uuid(),
            name: form.name,
            type: form.type,
            stage: form.stage,
            desc: form.desc,
            carac: form.carac,
            nb: form.nb,
        };

        if (!item.name || !item.nb || !item.type) {
            return;
        }

        character.inventory.push(item);

        this.setState({ 
            character,
            modalIsOpen: false
        }, () => {
            this.newForm.current.resetFields();
            this.props.actualizeCharacter(this.state.character);
        });

    }

    onChangeNewItem = (val, property) => {
        let { newItem } = this.state;

        newItem[property] = val;

        this.setState({ newItem });
    }

    render() {
        let { character } = this.state;
        let { modalIsOpen } = this.state;

        let inventory = (!!character?.inventory) ? [...character.inventory] : [];

        const columns = [{
            title: "Nom",
            dataIndex: "name",
            key: "name",
            width: 200,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name.localeCompare(b.first_name),
            render: (name, item) => (
                <div title={name}>
                    <Input
                        value={name}
                        bordered={false}
                        onChange={(val) => this.onChangeItem(val.target.value, item.id, "name")}
                    />
                </div>
            )
        }, {
            title: "Type",
            dataIndex: "type",
            key: "type",
            defaultSortOrder: 'descend',
            width: 150,
            sorter: (a, b) => a.name.localeCompare(b.first_name),
            render: (type, item) => (
                <Select
                    style={{width: 125}}
                    value={type}
                    options={TYPES}
                    onChange={(val) => this.onChangeItem(val, item.id, "type")} 
                />
            )
        }, {
            title: "Étage",
            dataIndex: "stage",
            key: "stage",
            width: 100,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.nb < b.nb,
            render: (stage, item) => (
                <Input
                    type='number'
                    value={stage}
                    bordered={false}
                    onChange={(val) => this.onChangeItem(val.target.value, item.id, "stage")}
                />
            )
        }, {
            title: "Description",
            dataIndex: "desc",
            key: "desc",
            render: (desc, item) => (
                <TextArea
                    autoSize
                    value={desc}
                    bordered={false}
                    onChange={(val) => this.onChangeItem(val.target.value, item.id, "desc")}
                />
            )
        }, {
            title: "Caractéristiques",
            dataIndex: "carac",
            key: "carac",
            render: (carac, item) => (
                <TextArea
                    autoSize
                    value={carac}
                    bordered={false}
                    onChange={(val) => this.onChangeItem(val.target.value, item.id, "carac")}
                />
            )
        }, {
            title: "Nombre",
            dataIndex: "nb",
            key: "nb",
            width: 50,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.nb - b.nb,
            render: (nb, item) => (
                <Input
                    type="number"
                    value={nb}
                    bordered={false}
                    onChange={(val) => this.onChangeItem(val.target.value, item.id, "nb")}
                />
            )
        }, {
            title: (
                <AddCircleOutline
                    className="icon-header clickable"
                    onClick={this.openModal}
                />
            ),
            key: "action",
            width: 50,
            render: (_, item) => (
                <DeleteOutline 
                    className="clickable"
                    onClick={() => this.removeItem(item.id)}
                />
            )
        }]

        return (
            <div className="character-container">
                <CharacterHeader saveCharacter={this.props.saveCharacter}/>
                <div className="margin-table">
                    <Table 
                        className="inventory-table"
                        columns={columns}
                        dataSource={inventory}
                    />
                </div>
                <Modal
                    className="modal-new-item"
                    visible={modalIsOpen}
                    onOk={this.addItem}
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
                            label="Type"
                            name="type"
                            rules={[{
                                required: true,
                                message: 'Le type est obligatoire.',
                            }]}
                        >
                            <Select options={TYPES}/>
                        </Form.Item>

                        <Form.Item
                            label="Étage"
                            name="stage"
                        >
                            <Input style={{ width: 100 }} type="number" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="desc"
                        >
                            <TextArea 
                                autoSize={{
                                    minRows: 2,
                                    maxRows: 5,
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Caractéristiques"
                            name="carac"
                        >
                            <Input type="text" />
                        </Form.Item>

                        <Form.Item
                            label="Nombre"
                            name="nb"
                            rules={[{
                                required: true,
                                message: 'Le nombre est obligatoire.',
                            }]}
                        >
                            <Input style={{ width: 100 }} type="number" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}