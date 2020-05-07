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
            <Form.Control placeholder="Your question" />
            <Button variant="info" onClick={ getAnswer }>Primary</Button>
            <Card style={{ width: '18rem', height: '10rem' }}>
                <Card.Body>
                    <Card.Title >Answer: </Card.Title>
                    <Card.Text class="text-center">
                        { answer }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default YesNoGame;