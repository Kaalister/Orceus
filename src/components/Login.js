import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { AuthConsumer } from '../Profile';

import { HttpPostRequest } from '../HttpRequests';
import BackgroundVideo from './BackgroundVideo';

import "../assets/css/login.css";
import loginBackground from '../assets/background/loginBackground.mp4';
import successBackground from '../assets/background/successBackground.mp4';
import errorBackground from '../assets/background/errorBackground.mp4';



export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            error: false,
            loginState: null,
            connected: false,
        }

        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(login) {
        HttpPostRequest("/login", {
            password: this.state.password
        })
        .then(response => {
            if (!response.ok) throw Error();
            return response.json();
        })
        .then(data => {
            this.setState({ loginState: "success" }, () => {
                localStorage.setItem('Orceus', this.state.password);
                login(data.session_type);
                setTimeout(() => {
                    this.setState({
                        connected: true,
                        loginState: null,
                    })
                    if (!this.props.location.state) {
                        this.props.history.push('/cards');
                    } else {
                        this.props.history.push(this.props.location.state.referrer);
                    }
                }, 4800);
            })
        })
        .catch(() => {
            this.setState({ error: true, loginState: "error" }, () => {
                localStorage.removeItem('Orceus');
                setTimeout(()=> {
                    this.setState({
                        error: false,
                        loginState: null,
                    });
                }, 3800);
            });
        });

    }

    render() {
        let isMobile = window.innerWidth <= 600;
        let inputClass = ['div-centered'];

        if (!!this.state.loginState) {
            inputClass.push('d-none')
        }

        return (
            <AuthConsumer>
                {({ login }) => (
                    <div className="login-container">
                        {(this.state.loginState === null && !isMobile) && (
                            <BackgroundVideo
                                source={loginBackground}
                                vKey={"login"}
                            />
                        )}
                        {(this.state.loginState === "success" && !isMobile) && (
                            <BackgroundVideo
                                source={successBackground}
                                vKey={"login-success"}
                            />
                        )}
                        {(this.state.loginState === "error" && !isMobile) && (
                            <BackgroundVideo
                                source={errorBackground}
                                vKey={"login-success"}
                            />
                        )}
                        <div className={inputClass.join(' ')}>
                            <TextField
                                onChange={this.handlePassword}
                                value={this.state.password}
                                placeholder="Mot de passe"
                                style={{marginRight: "15px"}}
                            />
                            <Button
                                variant="contained"
                                onClick={() => { this.handleSubmit(login) }}
                            >
                                Enter
                            </Button><br/>
                            <span
                                className={
                                    this.state.error ? "error" : "hide-error"
                                }
                            >
                                mauvais mot de passe
                            </span>
                        </div>
                    </div>
                )}
            </AuthConsumer>
        )
    }
}