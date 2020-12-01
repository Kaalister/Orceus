import React from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppProfile from '../Profile';
import bcrypt from '../encrypt';

import "../assets/css/login.css";


const USER_PASSWORD = "1606854672352$10$4e66ae393040ea5c5f1de1d855776d3f";
const ADMIN_PASSWORD = "1606854764256$10$19687648d00d6ef02e1b1a18447067be";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            error: false,
            connected: AppProfile.get('connected'),
        }

        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(pass) {

        let password = !!pass ? pass : this.state.password;

        if (bcrypt.compare(password, USER_PASSWORD)) {
            this.setState({ connected: true }, ()=> {
                localStorage.setItem('Orceus', password);
                AppProfile.profile = {
                    connected: true,
                    isAdmin: false,
                }
            });
            return;
        }

        if (bcrypt.compare(password, ADMIN_PASSWORD)) {
            this.setState({ connected: true }, () => {
                localStorage.setItem('Orceus', password);
                AppProfile.profile = {
                    connected: true,
                    isAdmin: true,
                }
            })
            return;
        }

        this.setState({ error: true}, () => {
            setTimeout(()=> {
                this.setState({ error: false});
            }, 3000);
        });
    }

    render() {

        let savePassword = localStorage.getItem('Orceus');

        if (savePassword !== null) {
            this.handleSubmit(savePassword);
        }

        if (this.state.connected) {
            return(
                <Redirect to="/Orceus/cards"/>
            );
        }

        return (
            <div className="div-centered">
                <TextField
                    onChange={this.handlePassword}
                    value={this.state.password}
                    placeholder="Mot de passe"
                    style={{marginRight: "15px"}}
                />
                <Button
                    variant="contained"
                    onClick={() => { this.handleSubmit() }}
                >
                    Enter
                </Button><br/>
                <span className={this.state.error ? "error" : "hide-error"}>
                    mauvais mot de passe
                </span>
            </div>
        )
    }
}