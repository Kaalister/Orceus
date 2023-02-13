import "../../assets/css/characterMenu.css";

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { Settings, Casino, Book, Create } from '@material-ui/icons';
import {
    DataGrid,
    GridColumnMenuContainer, 
    GridFilterMenuItem, 
    SortGridMenuItems
} from '@material-ui/data-grid';

import AppProfile from '../../Profile';

import { HttpGetRequest, HttpPutRequest } from "../../HttpRequests";

export default class CharacterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            id: null,
            loading: true,
        };

        this.addNewCharacter = this.addNewCharacter.bind(this);
    }

    componentDidMount() {
        HttpGetRequest('/characters')
            .then(response => {
                if (!response.ok) {
                    throw Error()
                }
                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    this.setState({
                        characters: data,
                        loading: false,
                    });
                }, 2000);
            })
            .catch(() => {
                this.setState({ loading: false });
                console.log('Erreur lors de la recupération des datas');
            })
    }

    addNewCharacter() {
        HttpPutRequest('/characters/create')
            .then(response => {
                if (!response.ok) {
                        throw Error()
                    }
                    return response.json();
                })
                .then(data => {
                    setTimeout(() => {
                        this.setState({
                            id : data.id,
                            loading: false,
                        });
                    }, 2000);
                })
                .catch(() => {
                    this.setState({ loading: false });
                    console.log('Erreur lors de la recupération des datas');
                })
    }

    render() {
        const CustomColumnMenu = (props) => {
            const { hideMenu, currentColumn } = props;
            return (
                <GridColumnMenuContainer
                    hideMenu={hideMenu}
                    currentColumn={currentColumn}
                >
                    <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
                    <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
                </GridColumnMenuContainer>
            );
        };

        const columns = [{
            headerName: 'Personnage',
            field: "firstname",
            disableColumnSelector: true,
            flex: 1,
            key: "lastname",
            renderCell: (params) => {
                return <span>{params.row.firstname} {params.row.lastname}</span>
            }

        }, {
            headerName: 'Level',
            field: 'level',
            width: 150,
            disableColumnFilter: true,
            disableColumnMenu: true,
        }, {
            headerName: 'Actions',
            field: 'id',
            sortable: false,
            width: 150,
            disableColumnFilter: true,
            disableColumnMenu: true,
            renderCell: (params) =>(
                <div>
                    <Link to={"/Orceus/SelectCharacters/" + params.row.id}>
                        <Create className="action-btn"/>
                    </Link>
                    {/* <Delete className="action-btn"
                        onClick={()=> console.log("delete : " + params.row.name)}
                    /> */}
                </div>
            ),
        }]

        if (this.state.id != null) {
            return <Redirect to={"/Orceus/SelectCharacters/" + this.state.id} />
        }

        return (
            <div style={{ height: "100vh", width: "100vw" }}>
                <div className="header-character">
                    <div className="header-link-container">
                        <Link to="/Orceus/Cards" key="toCards">
                            <Book
                                style={{ color: 'white' }}
                                className='clickable'
                            />
                        </Link>
                        {(AppProfile.get('sessionType') === "09c71624" ||
                            AppProfile.get('sessionType') === "a238a5dd") ? ([(
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
                <div className="new-character-container">
                    <Button
                        className="new-character-btn"
                        onClick={this.addNewCharacter}
                    >
                        Nouveau
                    </Button>
                </div>
                <div className="grid-character">
                    <DataGrid
                        loading={this.state.loading}
                        rows={this.state.characters}
                        components={{
                            ColumnMenu: CustomColumnMenu
                        }}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </div>
        );
    }
}