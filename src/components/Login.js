import React from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AppProfile from '../Profile';
import { HttpPostRequest } from '../HttpRequests';

import "../assets/css/login.css";
import LoginVideo from '../assets/background/loginBackground.mp4';

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

        HttpPostRequest("/login", {
            password
        })
        .then(response => {
            if (!response.ok) {
                throw Error();
            }
            return response.json()
        })
        .then(data => {
            this.setState({ connected: true }, () => {
                localStorage.setItem('Orceus', password);
                AppProfile.profile = {
                    connected: data.connected,
                    isAdmin: data.is_admin,
                }
            })
        })
        .catch(() => {
            this.setState({ error: true }, () => {
                localStorage.removeItem('Orceus');
                setTimeout(()=> {
                    this.setState({ error: false});
                }, 5000);
            });
        })

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
            <div className="login-container">
                <video className='background' autoPlay loop muted>
                    <source src={LoginVideo} type='video/mp4' />
                </video>
                <div className="div-centered password-background">
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
            </div>
        )
    }
}