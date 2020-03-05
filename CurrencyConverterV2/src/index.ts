import Chart from 'chart.js';
import { UserData } from "./userData";
import { UI } from './UI';
import { Rates } from './rates';
import { CurrencyRate } from './currencyRate';
import { CurrencyName } from './currencyName';

class Main{
    private userData : UserData = new UserData();
    public ratesHistory : Rates[] = [];
    private ui : UI;
    constructor(){
        this.ui = new UI(this);
        this.FirstRatesInit();
        this.ui.DrawGraph(this.ratesHistory, CurrencyName.EUR);
    }

    private FirstRatesInit(){
        this.ratesHistory.push(new Rates([
            new CurrencyRate(CurrencyName.RUB, 1), 
            new CurrencyRate(CurrencyName.EUR, 73.79), 
            new CurrencyRate(CurrencyName.USD, 66.30)
        ], 
            new Date(Date.now())))
    }
    private async Count(days : number){
        for (let i = 0; i < days; i++){
            let newDate = new Date(this.ratesHistory[this.ratesHistory.length - 1].date);
            newDate.setDate(newDate.getDate() + 1);
            console.log(newDate, this.ratesHistory[this.ratesHistory.length - 1].date);
            let rate = new Rates([], newDate);
            for (let el of this.ratesHistory[this.ratesHistory.length - 1].currencies){
                if (el.name !== CurrencyName.RUB){
                    let genNumber = await this.GenerateRandomNumber();
                    let newRate = el.rate + genNumber;
                    let newCurRate = new CurrencyRate(el.name, newRate);
                    rate.currencies.push(newCurRate);
                }
                else{
                    rate.currencies.push(new CurrencyRate(el.name, el.rate));
                }
            }
            this.ratesHistory.push(rate);
        }
    }
    public async Simulate(days : number){
        await this.Count(days);
        let select = document.querySelector("#currencies-select-id") as HTMLSelectElement;
        let whichRateStr = select.options[select.selectedIndex].value;
        await this.ui.DrawGraph(this.ratesHistory, CurrencyName[whichRateStr as keyof typeof CurrencyName]);
    }

    private async GenerateRandomNumber(){
        let min = -0.1, max = 0.1;
        let highlightedNumber = Math.random() * (max - min) + min;
        return highlightedNumber;
    }
    private CountRates(curRate : CurrencyRate){

    }

}
export { Main };

let main = new Main();