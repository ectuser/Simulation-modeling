import React from 'react';
import './App.css';
import YesNoGame from "./components/YesNoGame"
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
					<Nav.Link><Link to="/yes_no_game">Yes No Game</Link></Nav.Link>
					<Nav.Link><Link to="/magic_ball">Magic Ball</Link></Nav.Link>
				</Nav>
			</Navbar>

			<Switch>
				<Route path="/yes_no_game">
					<YesNoGame />
				</Route>
				<Route path="/magic_ball">
					{/* Magic ball */}
				</Route>
			</Switch>
		</div>
	)
}

export default App;
