import { Main } from "./index";
import { CurrencyRate } from "./currencyRate";
import Chart from "chart.js";
import { Point } from "./point";
import { Rates } from "./rates";
import { CurrencyName } from "./currencyName";

class UI{
    private main : Main;
    private chart? : Chart;

    constructor(main : Main){
        this.main = main;

        this.ExchangeButtonHandler();
        this.ShowRatesClickHandler();
        this.SimulateClickHandler();
    }

    private ShowRatesClickHandler(){
        (document.querySelector("#show-rates-button") as HTMLElement).addEventListener("click", () => {
            let select = document.querySelector("#currencies-select-id") as HTMLSelectElement;
            let whichRateStr = select.options[select.selectedIndex].value;

            this.DrawGraph(this.main.ratesHistory, CurrencyName[whichRateStr as keyof typeof CurrencyName]);
        })
    }

    private SimulateClickHandler(){
        (document.querySelector("#simulate-button") as HTMLElement).addEventListener("click", () => {
            this.main.Simulate(parseInt((document.querySelector("#simulation-duration-input") as HTMLInputElement).value));
        })
    }

    private ExchangeButtonHandler(){
        (document.querySelector("#exchange-button") as HTMLElement).addEventListener("click", () => {

        })
    }

    private async AddNewElement(newList : Point[], day : Rates, cur : CurrencyRate){
        newList.push(new Point(day.date, cur.rate));
    }

    private async ConvertRateToChartFormat(data : Rates[], whichRate : CurrencyName){
        let newList : Point[] = [];
        for (let day of data){
            for (let cur of day.currencies){
                if (cur.name === whichRate){
                    await this.AddNewElement(newList, day, cur);
                }
            }
        }
        return newList;
    }

    public async DrawGraph(data : Rates[], whichRate : CurrencyName){
        let divForChart : HTMLElement = document.querySelector("#for-chart") as HTMLElement;
        if (document.querySelector("#currency-chart") != null){
            document.querySelector("#currency-chart")?.remove();
        }
        let canvas : HTMLCanvasElement = document.createElement("canvas");
        canvas.id = "currency-chart";
        divForChart.appendChild(canvas);

        let points = await this.ConvertRateToChartFormat(data, whichRate);

        this.chart = new Chart(canvas, {
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
                        type: 'time',
                        time: {
                            unit: 'month'
                        }
                    }]
                }
            }
        });
    }
}

export { UI };