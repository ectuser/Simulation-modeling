import React, {useContext} from 'react';
import { useForm } from "react-hook-form";
import { Container, Form, Button } from 'react-bootstrap'
import {MyContext} from "./FootballChampionship";

const GeneratorSettings = () =>{

    const {dispatch} = useContext(MyContext);
    const { register, handleSubmit, errors, setError } = useForm();

    const submitLambda = (data) => {
        let lambda
        try {
            lambda = Number(data.lambda);
            if (isNaN(lambda))
                throw new Error("Not a number");
        } catch (error) {
            setError("lambda", "Not a number");
            return;   
        }
        dispatch({type : "SET_LAMBDA", payload : lambda});
        dispatch({type : "NEXT_PAGE"});
    }

    return (
        <Container>
            <h2>Type lambda. I suggest you to use lambda &lt; 1 for football matches</h2>
            <Form onSubmit={handleSubmit(submitLambda)}>

                <Form.Control name="lambda" ref={register({ required: true })} />
                <div style={{ color:'red' }}>{errors.lambda && <span>Lambda is needed, lambda should be number and > 0</span>}</div>
                
                <div className="text-center"><Button type="submit" className="m-3">Submit</Button></div>

            </Form>
        </Container>
    )
}

export default GeneratorSettings;