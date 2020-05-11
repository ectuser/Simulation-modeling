import React, {useRef, useReducer} from 'react'
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import Title from "./Title"
import { Bar } from 'react-chartjs-2';

const initialState = {events : [], startButton : "", experimentsData : [], experimentsLabels : []};

const reducer = (state, action) => {
    if (action.type === "INIT_EMPTY_EVENTS"){
        console.log(action.payload)
        return {
            ...state,
            events : [...action.payload]
        };
    }
    else if (action.type === "SET_START_BUTTON"){
        return {
            ...state,
            startButton : action.payload
        }
    }
    else if (action.type === "SET_CHART_DATA"){
        console.log(action.payload);
        return {
            ...state,
            experimentsData : [...action.payload.data],
            experimentsLabels : [...action.payload.labels]
        }
    }
}

const DiscreteRandomVariable = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let amountOfEventsInput = useRef();
    let refs = useRef([]);
    let amountOfExperimentsInput = useRef();

    const next = () => {
        try {
            let number = Number(amountOfEventsInput.current.value);
            let newEvents = [];
            for (let i = 0; i < number; i++){
                newEvents.push({
                    name : `Event ${i}`,
                    ref : refs.current[i],
                    amountOfSelections : 0
                })
            }
            console.log(newEvents);
            dispatch({type : "INIT_EMPTY_EVENTS", payload : newEvents});
        } catch (error) {
            alert("Not allowed value");
            return;
        }
    }

    const areValuesCorrect = async () => {
        let sum = 0;
        console.log(state.events);
        for (let ev of state.events){
            try {
                let number = Number(ev.ref.value);   
                if (number < 0){
                    throw new Error("");
                }
                sum += number;
            } catch (error) {
                return false;
            }

        }
        return sum === 100;
    }

    const random = async (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const getChartData = async (events, amountOfExperiments) => {
        let data = []
        let labels = [];
        for (let ev of events){
            labels.push(ev.name);
            data.push(ev.amountOfSelections / amountOfExperiments);
        }
        return {data : data, labels : labels}
    }

    const start = async () => {
        if (! await areValuesCorrect()){
            alert("Values are incorrect");
            return;
        }
        let experimentsNumber;
        try {
            experimentsNumber = Number(amountOfExperimentsInput.current.value);
        } catch (error) {
            alert("Incorrect amount of experiments data");
            return;
        }

        let tempEvents = [...state.events];
        for (let ev of tempEvents){
            ev.amountOfSelections = 0;
        }
        for (let i = 0; i < experimentsNumber; i++){
            let randomProbability = await random(0, 100);
            
            for (let ev of tempEvents){
                randomProbability -= Number(ev.ref.value);
                if (randomProbability <= 0){
                    ev.amountOfSelections++;
                    break;
                }
            }
        }
        let chartData = await getChartData(tempEvents, experimentsNumber);
        dispatch({type : "SET_CHART_DATA", payload : chartData});
        
    }

    return(
        <Container>
            <Title>Statistics processing of discrete random variable simulation</Title>
            <Form.Control type="number" ref={amountOfEventsInput} placeholder="Amount of events" />
            <Button className="m-2" onClick={next}>Next</Button>
            {state.events.map((item, i) => (
                <Row key={i} className="m-2">
                    <Col>{item.name}</Col>
                    <Col><Form.Control ref={el => item.ref = el} type="number" placeholder="Probability" /></Col>
                </Row>
            ))}
            <div>
                    <Form.Control ref={amountOfExperimentsInput} type="number" placeholder="Probability" />
                    <Button className="m-2" variant="primary" onClick={start}>Start</Button>
                    <Bar data={{
                        datasets: [{
                            data: state.experimentsData
                        }],
                        labels: state.experimentsLabels
                    }} 
                    options={{
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
                </div>
        </Container>
    )
}
export default DiscreteRandomVariable;