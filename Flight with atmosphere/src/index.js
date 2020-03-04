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
        this.g = 9.81;
        this.C = 0.15;
        this.po = 1.29;
        this.betta = 0.5 * this.C * startData.size * this.po;
        this.k = this.betta / startData.weight; 

        this.Vx = this.speed * this.cosAngle;
        this.Vy = this.speed * this.sinAngle;

        this.points = [this.currentPoint];

        await this.CountPoints();
        console.log(this.points);
    }

    async CountPoints(){
        while (true){
            if (Settings.GetState()){
                await this.CountNewPoint();
                if (this.currentPoint.y < 0){
                    break;
                }
                if (this.t == 0){
                    await this.ui.DrawGraph(this.points);
                }
                else{
                    this.ui.scatterChart.data.datasets.forEach((dataset) => {
                        dataset.data.push(this.currentPoint);
                    });
                    this.ui.scatterChart.update();
                }
                this.t += Settings.GetDelay();
                await this.ui.UpdateTimer(this.t);
            }
            await this.Sleep(100);
        }
    }
    async CountNewPoint(){
        this.Vx = this.Vx - this.k * this.Vx * Math.sqrt(this.Vx * this.Vx + this.Vy * this.Vy) * Settings.GetDelay();
        this.Vy = this.Vy - (this.g + this.k * this.Vy * Math.sqrt(this.Vx * this.Vx + this.Vy * this.Vy)) * Settings.GetDelay();

        let x = this.currentPoint.x + this.Vx * Settings.GetDelay();
        let y = this.currentPoint.y + this.Vy * Settings.GetDelay();
        this.currentPoint = new Point(x, y);
    }
    async Sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

let main = new Main();