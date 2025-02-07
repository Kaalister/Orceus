import "../../assets/css/Character/inventory.css";

import React from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Select,
    Form,
    Input,
    Modal
} from 'antd';
import { DeleteOutline, AddCircleOutline } from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { v4 as uuid } from 'uuid'; 
import CharacterHeader from './ChararcterHeader';
import loadingImg from '../../assets/images/loading.gif';

import { TYPES } from "../../constants";

const { TextArea } = Input;

class Inventory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            searchValue: "",
            initialForm: {
                id: null,
                name: "",
                type: null,
                stage: null,
                desc: "",
                carac: "",
                nb: null
            }
        };

        this.newForm = React.createRef();

        this.onChangeItem = this.onChangeItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeNewItem = this.onChangeNewItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    onChangeItem = (value, id, property) => {
        const character =  JSON.parse(JSON.stringify(this.props.character));
        let inventory = [ ...character.inventory ];
        const index = inventory.findIndex(item => item.id === id);

        if (index === -1) return;

        inventory[index][property] = value;

        this.props.updateCharacter({
            ...character,
            inventory: inventory,
        });
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true,
            initialForm: {
                id: null,
                name: "",
                type: null,
                stage: null,
                desc: "",
                carac: "",
                nb: null
            }
        }, () => {
            this.newForm.current.resetFields();
        });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    removeItem = (id) => {
        let character = {...this.props.character};
        let index = character.inventory.findIndex((item) => item.id === id);

        if (index === -1) return;

        this.props.updateCharacter({
            ...character,
            inventory: character.inventory.filter(item => item.id !== id),
            equipment: {
                id: character.equipment.id,
                amulets: character.equipment.amulets
                    ?.filter(item => item.id !== id),
                botClothes: character.equipment.botClothes
                    ?.filter(item => item.id !== id),
                topClothes: character.equipment.topClothes
                    ?.filter(item => item.id !== id),
                gloves: character.equipment.gloves
                    ?.filter(item => item.id !== id),
                helmets: character.equipment.helmets
                    ?.filter(item => item.id !== id),
                plastrons: character.equipment.plastrons
                    ?.filter(item => item.id !== id),
                shoes: character.equipment.shoes
                    ?.filter(item => item.id !== id),
                shields: character.equipment.shields
                    ?.filter(item => item.id !== id),
                weapons: character.equipment.weapons
                    ?.filter(item => item.id !== id),
                others: character.equipment.others
                    ?.filter(item => item.id !== id),
            }
        });
    }

    openEditModal = (id) => {
        let items = this.props.character.inventory;
        let item = items.find(item => item.id === id);
        this.setState({
            modalIsOpen: true,
            initialForm: {
                id: id,
                name: item.name,
                type: item.type,
                stage: item.stage,
                desc: item.desc,
                carac: item.carac,
                nb: item.nb
            }
        }, () => {
            this.newForm.current.resetFields();
        });
    }

    editItem = (form) => {
        const character = {...this.props.character};
        let inventory = [...character.inventory];
        let item = {
            id: form.id,
            name: form.name,
            type: form.type,
            stage: form.stage,
            desc: form.desc,
            carac: form.carac,
            nb: form.nb,
        };
        const indexCurrentItem = inventory.findIndex(item =>
            item.id === form.id
        );

        inventory[indexCurrentItem] = item;

        this.setState({
            initialForm: {
                id: null,
                name: "",
                type: null,
                stage: null,
                desc: "",
                carac: "",
                nb: null
            },
            modalIsOpen: false,
        }, () => {
            this.newForm.current.resetFields();
            this.props.updateCharacter({
                ...character,
                inventory: inventory,
            });
        });

    }

    addItem = () => {
        let character = {...this.props.character};
        let form = this.newForm.current.getFieldsValue();

        if (form.id !== null) {
            this.editItem(form);
            return;
        }

        let item = {
            id: uuid(),
            isNew: true,
            name: form.name,
            type: form.type,
            stage: form.stage,
            desc: form.desc,
            carac: form.carac,
            nb: form.nb,
        };

        if (!item.name || !item.nb || !item.type) return;

        character.inventory = [...character.inventory, item];

        this.setState({
            modalIsOpen: false
        }, () => {
            this.newForm.current.resetFields();
            this.props.updateCharacter(character);
        });

    }

    onChangeNewItem = (val, property) => {
        let { newItem } = this.state;

        newItem[property] = val;

        this.setState({ newItem });
    }

    sortByType(a, b) {
        let objectA = TYPES.find(item => item.value === a.type);
        let objectB = TYPES.find(item => item.value === b.type);

        let labelA = objectA.label;
        let labelB = objectB.label;

        return labelA.localeCompare(labelB);
    }

    render() {
        const { character, isLoading, isTablet, isMobile }  = this.props;
        let { searchValue, initialForm } = this.state;
        let { modalIsOpen } = this.state;

        let inventory = character?.inventory ? [...character.inventory] : [];

        if ((!isLoading && character === null) || isLoading) {
            return (
                <div 
                    style={{ 
                        width: "100%", 
                        display: "flex", 
                        justifyContent: "center"
                    }}
                >
                    <img
                        className="loading-character"
                        src={loadingImg}
                        alt="loading"
                    />
                </div>
            );
        }

        if (!!searchValue) {
            inventory = inventory.filter(item => (
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            ));
        }

        const columns = (isMobile) ? [{
            title: "Nom",
            dataIndex: "name",
            key: "name",
            defaultSortOrder: 'descend',
            width: 150,
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (name, item) => (
                <div title={name}>
                    <Input
                        value={name}
                        bordered={false}
                        onChange={val =>
                            this.onChangeItem(val.target.value, item.id, "name")
                        }
                    />
                </div>
            )
        }, {
            title: "Nb",
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
            width: 100,
            render: (_, item) => (
                <div className="right">
                    <ModeEditIcon 
                     className="clickable mr-1"
                     onClick={() => this.openEditModal(item.id)}
                    />
                    <DeleteOutline 
                     className="clickable"
                     onClick={() => this.removeItem(item.id)}
                    />
                </div>
            )
        }]
        : [{
            title: "Nom",
            dataIndex: "name",
            key: "name",
            width: 200,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name.localeCompare(b.name),
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
            sorter: this.sortByType,
            render: (type, item) => (
                <Select
                    style={{width: (isTablet) ? 100 : 125}}
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
            sorter: (a, b) => a.stage - b.stage,
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
        }];

        return (
            <div className="character-container">
                <CharacterHeader
                    currentPage="inventory"
                    character={character}
                />
                <div className="search-container">
                    <Input
                        className="search-input"
                        placeholder="Nom Recherché..."
                        value={searchValue}
                        allowClear
                        onChange={val => this.setState({
                            searchValue: val.target.value
                        })}
                    />
                </div>
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
                        initialValues={initialForm}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        labelAlign="left"
                        onFinish={this.addItem}
                    >
                        <Form.Item
                            label="id"
                            name="id"
                            hidden
                        >
                            <Input type="hidden" />
                        </Form.Item>

                        <Form.Item
                            label="Nom"
                            name="name"
                            rules={[{
                                required: false,
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

const mapStateToProps = function(state) {
    const isMobile = window.screen.width < 900;
    const isTablet = window.screen.width >= 900 && window.screen.width < 1000;

    return {
        isMobile,
        isTablet,
        isLoading: state.characters?.isLoading,
    }
}

export default connect(mapStateToProps)(Inventory)