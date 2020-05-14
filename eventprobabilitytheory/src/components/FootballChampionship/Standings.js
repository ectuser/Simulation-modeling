import React, {useContext, useEffect} from 'react';
import { Container, Table } from 'react-bootstrap'
import {MyContext} from "./FootballChampionship";
import Title from "../Title";

const Standings = () => {
    const {state, dispatch} = useContext(MyContext);

    useEffect(() => {
        playGames();
    }, []);


    const playGames = async () => {
        let teams = state.teams;
        let games = state.games;

        for (let game of games){
            let firstTeamObj = game.first;
            let secondTeamObj = game.second;
            game.firstTeamScore = await getScore();
            game.secondTeamScore = await getScore();
            if (game.firstTeamScore > game.secondTeamScore){
                firstTeamObj.points += 3;
            }
            else if (game.firstTeamScore === game.secondTeamScore){
                firstTeamObj.points++;
                secondTeamObj.points++;
            }
            else{
                secondTeamObj.points += 3;
            }

        }
        teams.sort((a, b) => (a.points > b.points) ? -1 : (a.points < b.points) ? 1 : 0);
        dispatch({type:"SET_TEAMS", payload : teams});
        dispatch({type:"SET_GAMES", payload : games});
    }

    const getScore = async () => {
        const lambda = state.lambda;
        let alpha = Math.random();
        let m = 0;
        let S = 0;
        while (S < lambda){
            S -= Math.log(alpha);
            m++;
        }
        return m;
    }

    return (
        <Container>
            <Title>Standings:</Title>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {state.teams.map((item, i) => (
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{item.name}</td>
                            <td>{item.points}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h2 className="m-5 text-center">Games:</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>First team</th>
                        <th>Score</th>
                        <th>Score</th>
                        <th>Second team</th>
                    </tr>
                </thead>
                <tbody>
                    {state.games.map((item, i) => (
                        <tr key={i}>
                            <td>{item.first.name}</td>
                            <td>{item.firstTeamScore}</td>
                            <td>{item.secondTeamScore}</td>
                            <td>{item.second.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Standings;