import React from 'react';
import {useState} from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';

const YesNoGame = () => {
    const [answer, setAnswer] = useState();

    const getAnswer = () => {
        setAnswer("Yes");
    }

    return (
        <Container>
            <Form.Control placeholder="Your question" className="mt-2" />
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