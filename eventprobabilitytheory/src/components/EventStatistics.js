import React, {useRef, useState, useReducer} from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
	Redirect
  } 
from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const EventStatistics = () => {
    const input = useRef();

    let redirect = useSelector(state => state.shallRedicrectToNext);
    const dispatch = useDispatch();

    const next = () => {
        try {
            let val = Number(input.current.value);   
            if (input.current.value === "" && val < 1){
                throw new Error("Not allowed");
            }
            dispatch({type : "SET_AMOUNT_OF_EVENTS", payload : val})
            dispatch({type : "CHANGE_REDIRECT"})

        } catch (error) {
            alert("Not allowed value in input");
            return;
        }
    }

    if (redirect){
        return(
            <Redirect to='/events-statistics/set-probabilities' />
        )
    }
    else{
        return(
            <Container className="text-center">
                <h2>Number of events: </h2>
                <Form.Control type="number" ref={input} placeholder="Number of events" className="m-2" />
                <Button onClick={ next } className="m-2">Next step</Button>
            </Container>
        )
    }
}

const EventsStatisticsProbabilityCount = () => {
    let redirect = useSelector(state => state.shallRedicrectToNext)
    let amountOfEvents = useSelector(state => state.amountOfEvents);

    if (redirect){
        return (
            <Container>
                There are {amountOfEvents} events
            </Container>
        )
    }
    else{
        return(
            <Redirect to='/events-statistics' />
        )
    }
}
export {EventStatistics, EventsStatisticsProbabilityCount}