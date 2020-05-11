import React from 'react';
import './App.css';
import YesNoGame from "./components/YesNoGame"
import MagicBall from "./components/MagicBall"
import {EventStatistics, EventsStatisticsProbabilityCount} from "./components/EventStatistics"
import DiceGame from "./components/DiceGame"
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
					<Link to="/yes-no-game" className="mx-3">Lab 8.1</Link>
					<Link to="/magic-ball" className="mx-3">Lab 8.2</Link>
					<Link to="/events-statistics" className="mx-3">Lab 9</Link>
					<Link to="/dice-game" className="mx-3">Lab 10</Link>
				</Nav>
			</Navbar>

			<Switch>
				<Route path="/yes-no-game">
					<YesNoGame />
				</Route>
				<Route path="/magic-ball">
					<MagicBall />
				</Route>
				<Route exact path="/events-statistics">
					<EventStatistics />
				</Route>
				<Route exact path="/events-statistics/set-probabilities">
					<EventsStatisticsProbabilityCount />
				</Route>
				<Route exact path="/dice-game">
					<DiceGame />
				</Route>
			</Switch>
		</div>
	)
}



export default App;
