import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import React from "react";
import Login from './components/Login';
import Cards from './components/Cards';
import AdminSettings from './components/AdminSettings';
import RollingPage from "./components/RollingPage";
import SelectCharacters from "./components/Character/SwitchCharacters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthConsumer, AuthProvider } from './Profile';

import './App.css';

const PrivateRoute = ({ component: Component, sessionTypeNeed, ...rest }) => {
	let history = useHistory();

	return (
		<AuthConsumer>
    		{({ isAuthenticated, sessionType }) => (
				<Route
					{...rest}
					history={history}
					render={props =>
						(isAuthenticated &&
							(!sessionTypeNeed ||
								sessionTypeNeed === sessionType))
						? (
							<Component {...props} />
						) : (
							<Redirect to="/" />
						)
					}
				/>
    		)}
  		</AuthConsumer>
  	);
}

export default function App() {

	return (
		<AuthProvider>
			<Router>
				<Switch>
					<PrivateRoute
						path="/cards"
						component={Cards} 
					/>
					<PrivateRoute
						path="/AdminSettings"
						component={AdminSettings}
					/>
					<PrivateRoute
						path="/SelectCharacters"
						component={SelectCharacters}
					/>
					<PrivateRoute
						path="/Rolls"
						component={RollingPage}
					/>
					<Route
						exact
						path="/"
						component={Login}
					/>
				</Switch>
			</Router>
		</AuthProvider>
	);
}
