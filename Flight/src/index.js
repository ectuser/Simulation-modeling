import Chart from 'chart.js';
import { StartData } from './startData'

class UI{
    constructor(){
    }
    StartButtonClick() {
        return(
            new Promise(res => {
                    document.querySelector("#start-button").addEventListener("click", 
                    async () => {
                        res(await this.GetDataFromInputs());
                    })
                }
            ))
    }
    async GetDataFromInputs(){
        let height = document.querySelector("#height-data").value;
        let angle = document.querySelector("#angle-data").value;
        let speed = document.querySelector("#speed-data").value;
        
        let startData = new StartData(height, angle, speed);
        return startData;
    }
}

class Main{
    constructor(){
        this.ui = new UI();
        this.InitValues();
    }
    async InitValues(){
        this.startData = await this.ui.StartButtonClick();
    }
}

let main = new Main();

let ctx = document.getElementById('myChart').getContext('2d');
let data = [{
    x: 10,
    y: 20
}, {
    x: 15,
    y: 10
}]
let myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
});