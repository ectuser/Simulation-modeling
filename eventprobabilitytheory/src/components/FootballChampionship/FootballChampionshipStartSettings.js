import React, {useContext} from 'react';
import { useForm } from "react-hook-form";
import Title from "../Title";
import { Container, Form, Button } from 'react-bootstrap'
import {MyContext} from "./FootballChampionship";

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
export default FootballChampionshipStartSettings;