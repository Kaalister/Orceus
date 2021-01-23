import React from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AppProfile from '../Profile';

import { HttpPostRequest } from '../HttpRequests';
import BackgroundVideo from './BackgroundVideo';

import "../assets/css/login.css";
import loginBackground from '../assets/background/loginBackground.mp4';
import successBackground from '../assets/background/successBackground.mp4';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            error: false,
            loginState: null,
            connected: AppProfile.get('connected'),
        }

        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let savePassword = localStorage.getItem('Orceus');

        if (savePassword !== null) {
            this.handleSubmit(savePassword);
        }
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
            this.setState({ loginState: "success" }, () => {
                localStorage.setItem('Orceus', password);
                AppProfile.profile = {
                    connected: data.connected,
                    isAdmin: data.is_admin,
                }
                setTimeout(() => {
                    this.setState({
                        connected: true,
                        loginState: null,
                    })
                }, 1500);
            })
        })
        .catch(() => {
            this.setState({ error: true, loginState: "error" }, () => {
                localStorage.removeItem('Orceus');
                setTimeout(()=> {
                    this.setState({
                        error: false,
                        loginState: null
                    });
                }, 5000);
            });
        })

    }

    render() {
        if (this.state.connected) {
            return(
                <Redirect to="/Orceus/cards"/>
            );
        }

        let isMobile = window.innerWidth <= 600;
        let inputClass = ['div-centered'];

        if (!!this.state.loginState) {
            inputClass.push('d-none')
        }

        return (
            <div className="login-container">
                { (this.state.loginState === null && !isMobile) ? (
                        <BackgroundVideo
                        source={loginBackground}
                        vKey={"login"}
                        />
                ) : null}
                { (this.state.loginState === "success" && !isMobile) ? (
                        <BackgroundVideo
                        source={successBackground}
                        vKey={"login-success"}
                        />
                ) : null}
                <div className={inputClass.join(' ')}>
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