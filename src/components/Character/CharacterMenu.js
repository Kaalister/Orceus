import "../../assets/css/Character/characterMenu.css";

import React from 'react';
import { connect } from 'react-redux';
import {
    createCharacter,
    getCharacters,
} from "../../redux/reducers/characters";
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import {
    Settings,
    Casino,
    Book,
    Create
} from '@material-ui/icons';
import {
    DataGrid,
    GridColumnMenuContainer,
    GridFilterMenuItem,
    SortGridMenuItems
} from '@material-ui/data-grid';

import { AuthConsumer } from '../../Profile';

class CharacterMenu extends React.Component {
    constructor(props) {
        super(props);

        this.addNewCharacter = this.addNewCharacter.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getCharacters());
    }

    addNewCharacter() {
        this.props.dispatch(createCharacter());
    }

    render() {
        const {
            isLoading,
            characters,
            selectedCharacter,
            dispatch,
        } = this.props

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
            flex: 2,
            minWidth: 150,
            key: "lastname",
            renderCell: (params) => {
                return <span>{params.row.firstname} {params.row.lastname}</span>
            }

        }, {
            headerName: 'Level',
            field: 'level',
            minWidth: 100,
            flex: 1,
            disableColumnFilter: true,
            disableColumnMenu: true,
        }, {
            headerName: 'Actions',
            field: 'id',
            sortable: false,
            width: 150,
            disableColumnFilter: true,
            disableColumnMenu: true,
            renderCell: (params) => (
                <div>
                    <Link
                        to={`/SelectCharacters/${params.row.id}`}
                        onClick={() => dispatch({
                            type: "Characters/selectCharacter",
                            id: params.row.id,
                        })}
                    >
                        <Create className="action-btn" />
                    </Link>
                    {/* <Delete className="action-btn"
                        onClick={()=> console.log("delete : " + params.row.name)}
                    /> */}
                </div>
            ),
        }]

        if (selectedCharacter) {
            return (
                <Redirect to={"/SelectCharacters/" + selectedCharacter} />
            );
        }

        return (
            <AuthConsumer>
                {({ sessionType }) => (
                    <div style={{ height: "100vh", width: "100vw" }}>
                        <div className="header-character">
                            <div className="header-link-container">
                                <Link to="/Cards" key="toCards">
                                    <Book
                                        style={{ color: 'white' }}
                                        className='clickable'
                                    />
                                </Link>
                                {(sessionType === "09c71624" ||
                                    sessionType === "a238a5dd") && (
                                    [(
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
                                    )]
                                )}
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
                                loading={isLoading}
                                rows={characters}
                                components={{
                                    ColumnMenu: CustomColumnMenu
                                }}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                            />
                        </div>
                    </div>
                )}
            </AuthConsumer>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        isLoading: state.characters?.isLoading,
        characters: state.characters?.characters || [],
        selectedCharacter: state.characters?.selectedCharacter || null,
    }
}

export default connect(mapStateToProps)(CharacterMenu)

