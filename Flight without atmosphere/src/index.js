import Chart from 'chart.js';
import { StartData } from './startData';
import { UI } from './UI';
import { Point } from './point';
import { Settings } from './settings';


class Main{
    constructor(){
        Settings.SetState(true);
        Settings.SetDelay(0.1);

        this.ui = new UI();
        this.InitValues();
        this.ui.StopButtonClickHandler();

    }
    async InitValues(){
        let startData = await this.ui.StartButtonClick();
        await this.ui.RemoveChart();
        await this.ui.AddChart();
        this.InitValues();
        this.speed = startData.speed;
        this.height = startData.height;
        this.t = 0;
        this.currentPoint = new Point(0, startData.height);
        this.radAngle = startData.angle * Math.PI / 180;
        this.cosAngle = Math.cos(this.radAngle);
        this.sinAngle = Math.sin(this.radAngle);
        this.secondsStep = 0.1;
        this.g = 9.81;

        this.points = [this.currentPoint];

        await this.CountPoints();
        console.log(this.points);
    }

    async CountPoints(){
        while (true){
            if (Settings.GetState()){
                let newPoint = await this.CountNewPoint();
                if (newPoint.y < 0){
                    break;
                }
                if (this.t == 0){
                    await this.ui.DrawGraph(this.points);
                }
                else{
                    this.ui.scatterChart.data.datasets.forEach((dataset) => {
                        dataset.data.push(newPoint);
                    });
                    this.ui.scatterChart.update();
                }
                this.t += this.secondsStep;
                await this.ui.UpdateTimer(this.t);
            }
            await this.Sleep(Settings.GetDelay() * 1000);
        }
    }
    async CountNewPoint(){
        let x = this.speed * this.cosAngle * this.t;
        let y = this.height + this.speed * this.sinAngle * this.t - this.g * this.t * this.t / 2;
        let newPoint = new Point(x, y);
        return newPoint;
    }
    async Sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

let main = new Main();