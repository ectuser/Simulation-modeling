import React from 'react';
import {useState, useRef} from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';

const YesNoGame = () => {
    const [answer, setAnswer] = useState();
    const [range, setRange] = useState("50");

    const myInput = useRef();

    const getAnswer = () => {
        let rnd = random(0, 100);
        if (rnd < Number(range))
            setAnswer("Yes")
        else
            setAnswer("No");
    }

    const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const change = () => {
        setRange(myInput.current.value);
    }

    return (
        <Container>
            <Form.Control onChange={ change } ref={ myInput } 
                type="range" 
                className="w-50 mx-auto my-3"
                min="0" max="100" step="10" value={ range }
            />
            <div className="text-center">Probability: { range }%</div>
            <Form.Control placeholder="Your question" className="mb-2" />
            <div className="text-center m-3"><Button variant="info" onClick={ getAnswer }>Primary</Button></div>
            <Card style={{ width: '18rem', height: '10rem', margin: '0 auto' }}>
                <Card.Body>
                    <Card.Title >Answer: </Card.Title>
                    <Card.Text className="text-center">
                        { answer }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default YesNoGame;