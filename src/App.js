import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import Login from './components/Login';
import Cards from './components/Cards';
import './App.css';

export default function App() {
	return (
		<Router>
			<div>
				{/* <div>Header</div> */}
				<Switch>
					<Route path="/Orceus/cards">
						<Cards/>
					</Route>
					<Route path="/Orceus/">
						<Login/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}