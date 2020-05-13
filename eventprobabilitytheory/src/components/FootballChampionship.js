import React, { useReducer, useContext, useEffect } from 'react'
import { Container, Form, Button, Table } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import Title from "./Title";

const initialState = {
    amountOfTeams : 0,
    whichPage : 0,
    lambda : 1,
    teams : [],
    games : []
}
const reducer = (state, action) => {
    if (action.type === "SET_TEAMS"){
        return{
            ...state,
            teams : [...action.payload]
        };
    }
    else if (action.type === "SET_GAMES"){
        return{
            ...state,
            games : [...action.payload]
        }
    }
    else if (action.type === "SET_LAMBDA"){
        return{
            ...state,
            lambda : action.payload
        }
    }
    else if (action.type === "NEXT_PAGE"){
        return{
            ...state,
            whichPage : state.whichPage + 1
        }
    }
}

const MyContext = React.createContext();


const FootballChampionship = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    if (state.whichPage === 0){
        return (
            <MyContext.Provider value={{ state, dispatch }}>
                <FootballChampionshipStartSettings />
            </MyContext.Provider>
        )
    }
    else if (state.whichPage === 1){
        return (
            <MyContext.Provider value={{ state, dispatch }}>
                <GeneratorSettings />
            </MyContext.Provider>
        )
    }
    else if (state.whichPage === 2){
        return (
            <MyContext.Provider value={{ state, dispatch }}>
                <Results />
            </MyContext.Provider>
        )
    }
}

const FootballChampionshipStartSettings = () => {

    const {dispatch} = useContext(MyContext);
    const { register, handleSubmit, errors } = useForm();

    const generateTeams = async (teamsLength) => {
        let teams = []
        for (let i = 0; i < teamsLength; i++){
            const name = `Team${i}`;
            teams.push({
                name : name,
                points : 0
            })
        }
        return teams;
    }

    const generateGames = async (teams) => {
        let games = [];
        // const N = teams.length;
        for (let i = 0; i < teams.length - 1; i++){
            for (let j = i + 1; j < teams.length; j++){
                games.push({
                    first : teams[i],
                    second : teams[j]
                })
            }
        }
        return games;
    }

    const setAmountOfTeams = async (data) => {
        const amount = Number(data.amountOfTeams);
        const teams = await generateTeams(amount);
        const games = await generateGames(teams);
        console.log(teams, games);

        dispatch({type : "SET_TEAMS", payload : teams});
        dispatch({type : "SET_GAMES", payload : games});
        dispatch({type : "NEXT_PAGE"});
    }

    return (
        <Container>
            <Title>Football Championship</Title>
            <h2>Type amount of teams</h2>
            <Form onSubmit={handleSubmit(setAmountOfTeams)}>

                <Form.Control type="number" name="amountOfTeams" ref={register({ required: true, min: 2 })} />
                <div style={{ color:'red' }}>{errors.amountOfTeams && <span>The field is required and at least two teams are needed</span>}</div>
                
                <div className="text-center"><Button type="submit" className="m-3">Submit</Button></div>
            </Form>
        </Container>
    )
}

const GeneratorSettings = () =>{

    const {dispatch} = useContext(MyContext);
    const { register, handleSubmit, errors } = useForm();

    const submitLambda = (data) => {
        let lambda = Number(data.lambda);

        dispatch({type : "SET_LAMBDA", payload : lambda});
        dispatch({type : "NEXT_PAGE"});
    }

    return (
        <Container>
            <h2>Type lambda. I suggest you to use lambda = 1 for football matches</h2>
            <Form onSubmit={handleSubmit(submitLambda)}>

                <Form.Control type="number" name="lambda" ref={register({ required: true, min: 1 })} />
                <div style={{ color:'red' }}>{errors.lambda && <span>Lambda is needed, min is 1</span>}</div>
                
                <div className="text-center"><Button type="submit" className="m-3">Submit</Button></div>

            </Form>
        </Container>
    )
}
const Results = () => {
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
export default FootballChampionship;