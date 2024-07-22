import React, { createContext, Component } from 'react';

const AuthContext = createContext();

export class AuthProvider extends Component {
    state = {
        isAuthenticated: !!localStorage.getItem('OrceusIsAuthenticated'),
        sessionType: localStorage.getItem('OrceusSessionType'),
    };

    login = (sessionType) => {
        localStorage.setItem('OrceusIsAuthenticated', 'true')
        localStorage.setItem('OrceusSessionType', sessionType)

        this.setState({
            isAuthenticated: true,
            sessionType: sessionType,
        });
    };

    logout = () => {
        localStorage.removeItem('Orceus');
        localStorage.removeItem('OrceusIsAuthenticated');
        localStorage.removeItem('OrceusSessionType');

        this.setState({
            isAuthenticated: false,
            sessionType: null,
        });
    };

    render() {
        const { isAuthenticated, sessionType } = this.state;
        const { login, logout } = this;

        return (
            <AuthContext.Provider
                value={{ isAuthenticated, sessionType, login, logout }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export const AuthConsumer = AuthContext.Consumer;