import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';

const MagicBall = () => {
    const [answer, setAnswer] = useState("");
    const [distribution, setDistribution] = useState([]);
    const [p, setProbability] = useState(0);
    let events = [
        'It is certain', 
        'It is decidedly so', 
        'Without a doubt', 
        'Yes — definitely',
        'You may rely on it',
        'As I see it, yes', 
        'Most likely', 
        'Outlook good', 
        'Signs point to yes',
        'Yes',
        'Reply hazy, try again', 
        'Ask again later', 
        'Better not tell you now', 
        'Cannot predict now',
        'Concentrate and ask again',
        'Don’t count on it ',
        'My reply is no', 
        'My sources say no', 
        'Outlook not so good', 
        'Very doubtful'
    ];

    const random = async (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const shuffle = async (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    // events = shuffle(events);

    const distributeEvents = async () => {
        let resultEvents = [];
        let allowToDistribute = 100;
        for (let i = 0; i < events.length - 1; i++){
            let rnd = await random(1, allowToDistribute / 2);
            allowToDistribute -= rnd;
            let obj = {}
            if (i === 0){
                obj = {
                    event : events[i],
                    probability : rnd
                };
            }
            else{
                obj = {
                    event : events[i],
                    probability : resultEvents[i - 1].probability + rnd
                };
            }
            resultEvents.push(obj);
            if (allowToDistribute <= 0){
                break;
            }
        }
        // if (allowToDistribute > 0){
        //     resultEvents.push({
        //         event : events[events.length - 1],
        //         probability : allowToDistribute
        //     })
        // }
        return resultEvents;
    }

    // const eventsAndProbabilities = distributeEvents();
    // console.log(eventsAndProbabilities);

    const getAnswer = async () => {
        events = await shuffle(events);
        const eventsAndProbabilities = await distributeEvents();
        console.log(eventsAndProbabilities);

        setProbability(await random(0, 100));
        // const p = await random(0,100);
        console.log(p);
        setDistribution(eventsAndProbabilities)
        for (let evProb of eventsAndProbabilities){
            if (evProb.probability > p){
                setAnswer(evProb.event);
                console.log(evProb, p)
                break;
            }
        }
    }

    return (
        <Container className="text-center">
            <Form.Control placeholder="Your question" className="m-2" />
            <Button onClick={ getAnswer } className="m-2">Answer</Button>
            <div className="mb-5">{ answer }</div>
            
            <div className="text-left">
                <p>Probability is { p }</p>
                { 
                distribution.map((item,i) => 
                <div key={i}><span>{ item.probability } : </span><span>{ item.event }</span></div>) 
                }
            </div>
        </Container>
    )
}

export default MagicBall;