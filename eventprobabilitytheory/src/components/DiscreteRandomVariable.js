import React, {useRef, useReducer} from 'react'
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import Title from "./Title"
import { Bar } from 'react-chartjs-2';
import chiSquareTable from "../chiSquareTable";

const initialState = {events : [], 
    startButton : "", 
    experimentsData : [], 
    experimentsLabels : [],
    expectedValue : 0,
    variance : 0,
    expectedValueError : 0,
    varianceError : 0
};

const reducer = (state, action) => {
    if (action.type === "INIT_EMPTY_EVENTS"){
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
        return {
            ...state,
            experimentsData : [...action.payload.data],
            experimentsLabels : [...action.payload.labels]
        }
    }
    else if (action.type === "SET_COUNTED_DATA"){
        return {
            ...state,
            expectedValue : action.payload.expectedValue,
            variance : action.payload.variance,
            expectedValueError : action.payload.expectedValueError,
            varianceError : action.payload.varianceError
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
                    amountOfSelections : 0,
                    ferProbability : 0
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

    const countExpectedValue = async (xs, ps) => {
        let sum = 0;
        for (let i = 0; i < xs.length; i++){
            sum += xs[i] * ps[i];
        }
        return sum;
    }
    const countVariance = async (xs, ps, Ex) => {
        let sum = 0;
        for (let i = 0; i < xs.length; i++){
            sum += (ps[i] * (xs[i] ** 2))
        }
        sum -=  (Ex ** 2);
        return sum;
    }
    const countChiSquare = async (xs, ps, N) => {
        let sum = 0;
        for (let i = 0; i < xs.length; i++){
            sum += ((xs[i] ** 2) / (N * ps[i]));
        }
        sum -= N;
        return sum;
    }
    
    const getChiSquareFromTable = async (m, alpha) => {
        let arr = [0.95,	0.90,	0.80,	0.70,	0.50,	0.30,	0.20,	0.10,	0.05,	0.01,	0.001];
        for (let i = 0; i < arr.length; i++){
            if (arr[i] === alpha){
                return chiSquareTable[m][i];
            }
        }
        throw new Error("Can't define alpha");
    }



    const roundTwoDecimal = (number) => Math.round((number + Number.EPSILON) * 100) / 100

    const solve = async (experimentsNumber) => {
        let xs = [];
        let ps = [];
        let realPs = [];
        for (let i = 0; i < state.events.length; i++){
            xs.push(i);
            ps.push(Number(state.events[i].ref.value) / 100);
            realPs.push(state.events[i].ferProbability);
        }

        let theoreticalEx = await countExpectedValue(xs, ps);
        let theoreticalVariance = await countVariance(xs, ps, theoreticalEx);

        let realEx = await countExpectedValue(xs, realPs);
        let realVariance = await countVariance(xs, realPs, realEx);
        console.log(theoreticalEx, theoreticalVariance, realEx, realVariance);

        const absMeasurementExError = Math.abs(realEx - theoreticalEx);
        const absMeasurementVarianceError = Math.abs(realVariance - theoreticalVariance);

        const relativeMeasurementExError = absMeasurementExError / Math.abs(theoreticalEx);
        const relativeMeasurementVarianceError = absMeasurementVarianceError / Math.abs(theoreticalVariance);

        const chiSquare = await countChiSquare(xs, realPs, experimentsNumber);
        const alpha = 0.05;

        // try {
        //     let chiSquareFromTableValue = getChiSquareFromTable(alpha);
        // } catch (error) {
            
        // }
        console.log(chiSquare);


        dispatch({type : "SET_COUNTED_DATA", payload : {
            expectedValue : realEx,
            variance : realVariance,
            expectedValueError : relativeMeasurementExError,
            varianceError : relativeMeasurementVarianceError
        }})
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
                    ev.ferProbability = ev.amountOfSelections / experimentsNumber;
                    break;
                }
            }
        }
        let chartData = await getChartData(tempEvents, experimentsNumber);
        dispatch({type : "SET_CHART_DATA", payload : chartData});

        await solve(experimentsNumber);
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
                <Form.Control ref={amountOfExperimentsInput} type="number" placeholder="Amount of experiments" />
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
                <div>Expected value : {roundTwoDecimal(state.expectedValue)} (error = {roundTwoDecimal(state.expectedValueError * 100)} % )</div>
                <div>Variance : {roundTwoDecimal(state.variance)} (error = {roundTwoDecimal(state.varianceError * 100)} % )</div>

            </div>
        </Container>
    )
}
export default DiscreteRandomVariable;