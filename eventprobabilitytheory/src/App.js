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
				<Navbar.Brand href="#home">Navbar</Navbar.Brand>
				<Nav className="mr-auto">
					{/* <Nav.Link href="/yes_no_game">Yes No Game</Nav.Link>
					<Nav.Link href="/magic_ball">Magic Ball</Nav.Link> */}
					{/* <Link to="/yes_no_game">Yes No Game</Link>
					<Link to="/magic_ball">Magic Ball</Link> */}
				</Nav>
			</Navbar>
			{/* <div>
				<div><Link to="/yes_no_game">Yes No Game</Link></div>
				<div><Link to="/magic_ball">Magic Ball</Link></div>
			</div> */}

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
