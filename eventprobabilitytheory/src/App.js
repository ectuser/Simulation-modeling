import React from 'react'
import './App.css'
import YesNoGame from "./components/YesNoGame"
import MagicBall from "./components/MagicBall"
import {EventStatistics, EventsStatisticsProbabilityCount} from "./components/EventStatistics"
import DiceGame from "./components/DiceGame"
import DiscreteRandomVariable from "./components/DiscreteRandomVariable"
import {FootballChampionship} from "./components/FootballChampionship/FootballChampionship"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route, Link} from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap'


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
					<Link to="/discrete-random-variable" className="mx-3">Lab 11</Link>
					<Link to="/football-championship" className="mx-3">Lab 12</Link>
				</Nav>
			</Navbar>

			<Switch>
				<Route path="/yes-no-game" component={ YesNoGame } />
				<Route path="/magic-ball" component={MagicBall}/>
				<Route exact path="/events-statistics" component={EventStatistics}/>
				<Route exact path="/events-statistics/set-probabilities" component={EventsStatisticsProbabilityCount} />
				<Route exact path="/dice-game" component={DiceGame} />
				<Route exact path="/discrete-random-variable" component={DiscreteRandomVariable} />
				<Route exact path="/football-championship" component={FootballChampionship} />
			</Switch>
		</div>
	)
}



export default App;
