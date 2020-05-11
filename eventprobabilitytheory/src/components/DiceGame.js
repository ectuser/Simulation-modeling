import React, {useRef, useState} from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import Title from "./Title"

const DiceGame = () => {

    let refs = useRef([]);
    const [winDiceComponent, setWinDice] = useState();
    

    const generateDice = () => {
        let dice = [];
        for (let i = 0; i < 6; i++){
            dice.push({
                probability : 0,
                component : (<Face value={i + 1}/>)
            })
        }
        return dice;
    }

    let dice = generateDice();

    const areValuesCorrect = async () => {
        let sum = 0;
        console.log(refs, refs.current, refs.current.length)
        for (let ref of refs.current){
            try {
                sum += Number(ref.value, 10);
                if (Number(ref.value, 10) < 0){
                    throw new Error("");
                }
            } catch (error) {
                return false;
            }
        }
        return sum === 100;
    }

    const random = async (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const arraySum = async (arr) => arr.reduce((a, b) => a + b, 0);

    const generateProbabilities = async () => {
        let flag = false;
        let allowToDistribute = 100;
        let probabilities = Array(6);
        while (!flag){
            for (let i = 0; i < 5; i++){
                let rnd = await random(0,allowToDistribute / 2);
                probabilities[i] = rnd;
                allowToDistribute -= rnd;
            }
            probabilities[probabilities.length - 1] = allowToDistribute;
            if (await arraySum(probabilities) === 100){
                break;
            }
        }
        for (let i = 0; i < 6; i++){
            dice[i].probability = probabilities[i];
            refs.current[i].value = probabilities[i];
        }
    }
    

    const click = async () => {
        if (! await areValuesCorrect()){
            alert("Incorrect values or sum of parobabilities is not 100%")
            return;
        }
        for (let i = 0; i < refs.current.length; i++){
            dice[i].probability = Number(refs.current[i].value);
        }
        
        let randomProbability = await random(0, 100);

        for (let d of dice){
            randomProbability -= d.probability;
            if (randomProbability <= 0){
                showWin(d);
                break;
            }
        }
    }

    const showWin = (element) => {
        console.log(element);
        setWinDice(element.component);
    }

    return (
        <Container>
            <Title>Dice Game</Title>
            <Row className="m-2">
                <Col style={{lineHeight : '70px'}}>Face number</Col>
                <Col style={{lineHeight : '70px'}}>Face </Col>
                <Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}><span>Probability (%)</span></Col>
            </Row>
            <hr />
            {dice.map((item, i) => (
            <Row key={i} className="m-2">
                <Col style={{lineHeight : '70px'}}>Face {i}</Col>
                <Col>{item.component}</Col>
                <Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}><Form.Control ref={el => refs.current[i] = el} type="number" placeholder="Probability" /></Col>
            </Row>
            ))}
            <Button variant="primary" onClick={click}>Roll the dice</Button>
            <Button className="float-right" variant="primary" onClick={generateProbabilities}>Auto probabilities</Button>
            <hr />
            <div><span className="float-left">The winning dice: </span><span className="float-right mt-3">{winDiceComponent}</span></div>
        </Container>
    )
}

const Face = (props) => {
    
    const amount = [...Array(props.value)];
    return (
        <div style={{ width: '70px', height: '70px', border : 'solid 1px Black', borderRadius : '5px' }}>
            {amount.map((item, i) => (
                <div key={i} style={{ width: '15px', height: '15px', border : 'solid 1px Black', borderRadius : '5px', backgroundColor : 'black', margin: '4px 9px', float:'left' }}></div>
            ))}
        </div>
    )
}

export default DiceGame;