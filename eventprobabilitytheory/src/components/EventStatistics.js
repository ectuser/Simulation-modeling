import React, {useRef} from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import {
	Redirect
  } 
from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from 'react-chartjs-2';

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
    
    const data = useSelector(state => state.dataForStatistics);
    console.log(data);
    const labels = useSelector(state => state.labelsForStatistics); 
    const dispatch = useDispatch();


    let refs = useRef([]);
    let numberOfExperimentsRef = useRef();

    const generateEvents = () => {
        let events = []
        for (let i = 0; i < amountOfEvents; i++){
            events.push({name : `Event ${i}`, probability : 0, eventSelectTimes : 0, distributed : 0, frequency : 0});
        }
        return events;
    }

    let events = generateEvents();

    const areValuesCorrect = async () => refs.current.every(el => el.value > 0);
    const isSumCorrect = async () =>{
        let sum = 0;
        for (let ref of refs.current){
            sum += Number(ref.value);
        }
        console.log(sum);
        return sum === 100;
    }


    const click = async () => {
        if (! await areValuesCorrect() || ! await isSumCorrect() || ! parseInt(numberOfExperimentsRef.current.value, 10) > 0){
            alert("Incorrect values or incorrect amount of experiments");
            return;
        }
        console.log(refs.current.length, events);
        for (let i = 0; i < refs.current.length; i++){
            events[i].probability = parseInt(refs.current[i].value, 10);
            if (i === 0){
                events[i].distributed = events[i].probability;
            }
            else{
                events[i].distributed = events[i - 1].distributed + events[i].probability;
            }
        }
        console.log(events);

        await doExperiments(events, parseInt(numberOfExperimentsRef.current.value, 10));
        console.log(events);

        await getFrequency(events, parseInt(numberOfExperimentsRef.current.value, 10));
        console.log(events);

        await changeDataAndLabels(events);


    }

    const random = async (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const doExperiments = async (currentEvents, numberOfExperiments) => {
        for (let i = 0; i < numberOfExperiments; i++){
            let randomNumber = await random(0, 100);
            for (let event of currentEvents ){
                if (event.distributed > randomNumber){
                    event.eventSelectTimes++;
                    break;
                }
            }

        }
    }


    const getFrequency = async (currentEvents, numberOfExperiments) => {
        for(let event of currentEvents){
            event.frequency = event.eventSelectTimes / numberOfExperiments;
        }

    }

    const changeDataAndLabels = async (currentEvents) => {
        let newData = [];
        let newLabels = [];
        for (let i = 0; i < currentEvents.length; i++){
            newData.push(currentEvents[i].frequency);
            newLabels.push(currentEvents[i].name);
        }
        dispatch({type : "SET_DATASET_FOR_STATISTICS", payload : {data : newData, labels : newLabels}});
    }

    if (redirect){
        return (
            <Container>
                There are {amountOfEvents} events:
                <div>
                    {events.map((item, i) =>(
                        <Row key={i} className="m-2">
                            <Col>{item.name}</Col>
                            <Col><Form.Control ref={el => refs.current[i] = el} type="number" placeholder="Probability" /></Col>
                        </Row>
                    ))}
                </div>
                <Form.Control ref={ numberOfExperimentsRef } type="number" placeholder="Number of experiments" />
                <div className="text-center m-3"><Button variant="primary" onClick={ click }>Submit</Button></div>

                <Bar data={ 
                    {
                        datasets: [{
                            data: data
                        }],
                        labels: labels
                    }

                 } options={
                    {
                        legend : {
                            display : false
                        },
                        title: {
                            display: true,
                            text: 'Frequency'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 1
                                }
                            }]
                        }
                    }
                 } />
                {data.map((item, i) => (
                    <div key={i}>{item}</div>
                ))}

            <div className="text-right mt-3"><Button variant="primary" onClick={ () => {
                dispatch({type : "CHANGE_REDIRECT"})
            } }>Back</Button></div>
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