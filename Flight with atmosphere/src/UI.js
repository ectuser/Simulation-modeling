import { StartData } from './startData';
import { Settings } from './settings';
class UI{
    constructor(){
        this.SliderChangesHandler();
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
    StopButtonClickHandler(){
        let button = document.querySelector("#stop-button");
        button.addEventListener("click", () => {
            // (STATE.state) ? STATE.state = false : STATE.state = true;
            if (Settings.GetState()){
                Settings.SetState(false);
                button.textContent = "Play";
            }
            else{
                Settings.SetState(true);
                button.textContent = "Stop";
            }
        })
    }
    async GetDataFromInputs(){
        let height = parseFloat(document.querySelector("#height-data").value);
        let angle = parseFloat(document.querySelector("#angle-data").value);
        let speed = parseFloat(document.querySelector("#speed-data").value);
        let size = parseFloat(document.querySelector("#size-data").value);
        let weight = parseFloat(document.querySelector("#weight-data").value);
        
        let startData = new StartData(height, angle, speed, size, weight);
        return startData;
    }

    async DrawGraph(points){
        var speedCanvas = document.getElementById("flight-chart");

        this.scatterChart = new Chart(speedCanvas, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Flight',
                    data: points,
                    showLine: true
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
        });
    }

    async AddChart(){
        let canvas = document.createElement("canvas");
        canvas.id = "flight-chart";
        canvas.height = 200;
        document.querySelector("#chart-container").appendChild(canvas);
    }

    async RemoveChart(){
        if (document.querySelector("flight-chart") !== null){
            document.querySelector("flight-chart").remove();
        }
    }

    async SliderChangesHandler(){
        let delayElement = document.querySelector("#delay-slider");
        delayElement.addEventListener('mouseup', () => {
            let delay = parseFloat(delayElement.value) / 100;
            (document.querySelector("#delay-value")).textContent = delay;
            Settings.SetDelay(delay);
            console.log(Settings.GetDelay());
            
        });
    }

    async UpdateTimer(time){
        let roundedString = time.toFixed(2); 
        document.querySelector("#time-element").textContent = roundedString;
    }
}
export { UI };