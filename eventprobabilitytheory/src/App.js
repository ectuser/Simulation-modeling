import React from 'react';
import './App.css';
import YesNoGame from "./components/YesNoGame"
import MagicBall from "./components/MagicBall"
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
  import { Navbar, Nav } from 'react-bootstrap';

const App = () => {
	return (
		<div>
			<Navbar bg="dark" variant="dark">
					<Link to="/">
							<Navbar.Brand>
								Home
							</Navbar.Brand>
					</Link>
				<Nav className="mr-auto">
					<Link to="/yes_no_game" className="mx-3">Yes No Game</Link>
					<Link to="/magic_ball" className="mx-3">Magic Ball</Link>
				</Nav>
			</Navbar>

			<Switch>
				<Route path="/yes_no_game">
					<YesNoGame />
				</Route>
				<Route path="/magic_ball">
					<MagicBall />
				</Route>
			</Switch>
		</div>
	)
}

export default App;
