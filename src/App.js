import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";

import Login from './components/Login';
import Cards from './components/Cards';
import AdminSettings from './components/AdminSettings';
import RollingPage from "./components/RollingPage";
import AppProfile from './Profile';
import './App.css';

function PrivateRoute({...props}) {
	let history = useHistory();

	if (!AppProfile.get('connected')) {
		history.push('/Orceus/')
	}

	return (
		<Route history={history} path={props.path} component={props.component}/>
	);
}

export default function App() {
	return (
		<Router>
			<div>
				<Switch>
					<PrivateRoute path="/Orceus/cards" component={Cards}/>
					<PrivateRoute path="/Orceus/AdminSettings" component={AdminSettings}/>
					<PrivateRoute path="/Orceus/Rolls" component={RollingPage}/>
					<Route exact path="/Orceus/" component={Login}/>
				</Switch>
			</div>
		</Router>
	);
}