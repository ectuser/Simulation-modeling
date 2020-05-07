import React from 'react';
import { Container } from 'react-bootstrap';

const MagicBall = () => {
    const events = [
        'Do some shit', 
        'Do another shit', 
        'Play minecraft', 
        'I want some react',
        'Fantastic weed'
    ];
    const eventsAndProbabilities = []

    const generateProbabilities = () => {
        let average = 100 / events;
        for(let event of events){
            
        }
    }

    return (
        <Container>
            <div>Hello world</div>
        </Container>
    )
}

export default MagicBall;