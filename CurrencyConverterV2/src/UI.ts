import { Main } from "./index";
import { CurrencyRate } from "./currencyRate";
import Chart from "chart.js";
import { Point } from "./point";
import { Rates } from "./rates";
import { CurrencyName } from "./currencyName";
import { UserData } from "./userData";

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
        (document.querySelector("#exchange-button") as HTMLElement).addEventListener("click", async () => {
            let howMuch = parseFloat((document.querySelector("#exchange-input") as HTMLInputElement).value);

            let currencyFromSelect = document.querySelector("#currency-exchange-from-select") as HTMLSelectElement;
            let currencyFrom =  currencyFromSelect.options[currencyFromSelect.selectedIndex].value;

            let currencyToSelect = document.querySelector("#currency-exchange-to-select") as HTMLSelectElement;
            let currencyTo =  currencyToSelect.options[currencyToSelect.selectedIndex].value;

            if (currencyTo === currencyFrom){
                alert("Currencies shouldn't be the same");
                return;
            }

            let currencyNameFrom = CurrencyName[currencyFrom as keyof typeof CurrencyName]; // enum CurrencyName
            let currencyNameTo = CurrencyName[currencyTo as keyof typeof CurrencyName]; // enum CurrencyName

            try{
                await this.main.CurrencyChange(howMuch, currencyNameFrom, currencyNameTo);
            }catch(err){
                alert(err);
            }

        })
    }

    public UpdateBudget(userData : UserData){
        let rubElement = document.querySelector("#rub-amount") as HTMLElement;
        let eurElement = document.querySelector("#eur-amount") as HTMLElement;
        let usdElement = document.querySelector("#usd-amount") as HTMLElement;

        rubElement.textContent = userData.currencies[0].amount.toString();
        eurElement.textContent = userData.currencies[1].amount.toString();
        usdElement.textContent = userData.currencies[2].amount.toString();
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

    public async ChangeCurrentRates(data : Rates){
        let eurRateElement = document.querySelector("#eur-rate") as HTMLElement;
        if (eurRateElement !== null){
            eurRateElement.textContent = data.currencies[1].rate.toString();
        }
        let usdRateElement = document.querySelector("#usd-rate") as HTMLElement;
        if (usdRateElement !== null){
            usdRateElement.textContent = data.currencies[2].rate.toString();
        }
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