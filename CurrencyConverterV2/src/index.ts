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
    private ws : number[];
    constructor(){
        this.ws = [];
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
            new Date(Date.now())));
        this.ws.push(-0.001);
    }
    private async Count(days : number){
        for (let i = 0; i < days; i++){
            let newDate = new Date(this.ratesHistory[this.ratesHistory.length - 1].date);
            newDate.setDate(newDate.getDate() + 1);
            console.log(newDate, this.ratesHistory[this.ratesHistory.length - 1].date);
            let rate = new Rates([], newDate);

            const mu = 0.001;
            const sigma = 0.001;
            const delta = 0.001;
            const zeta = this.GenerateRandomNumber();
            const w = this.ws[this.ws.length - 1] + Math.sqrt(delta) * zeta;
            console.log(mu, sigma, delta, zeta, w);

            for (let el of this.ratesHistory[this.ratesHistory.length - 1].currencies){
                if (el.name !== CurrencyName.RUB){
                    let genNumber = await this.GenerateNewRate(mu, sigma, delta, w, this.ws[this.ws.length - 1]);
                    let newRate = el.rate * genNumber;
                    let newCurRate = new CurrencyRate(el.name, newRate);
                    rate.currencies.push(newCurRate);
                }
                else{
                    rate.currencies.push(new CurrencyRate(el.name, el.rate));
                }
            }
            this.ratesHistory.push(rate);
            this.ws.push(w);
        }
    }
    public async Simulate(days : number){
        await this.Count(days);
        let select = document.querySelector("#currencies-select-id") as HTMLSelectElement;
        let whichRateStr = select.options[select.selectedIndex].value;
        await this.ui.ChangeCurrentRates(this.ratesHistory[this.ratesHistory.length - 1]);
        await this.ui.DrawGraph(this.ratesHistory, CurrencyName[whichRateStr as keyof typeof CurrencyName]);
    }

    private async GenerateNewRate(mu : number , sigma : number, delta : number, w : number, prevW : number) : Promise<number>{
        return Math.exp( (mu - (sigma ** 2) / 2) * delta + sigma * w );
    }

    private GenerateRandomNumber() : number{
        let min = -10, max = 10;
        let highlightedNumber = Math.random() * (max - min) + min;
        return highlightedNumber;
    }

    public async CurrencyChange(amount : number, currencyFrom : CurrencyName, currencyTo : CurrencyName){
        let currencyFromRate;
        let currencyToRate
        try{
            currencyFromRate = await this.GetRateByName(currencyFrom);
            currencyToRate = await this.GetRateByName(currencyTo);
        }catch(e){
            throw new Error(e);
        }

        for (let cur of this.userData.currencies){
            if (currencyFrom === cur.name){
                if (cur.amount > amount){
                    cur.amount -= amount;
                }
                else{
                    throw new Error("You don't have enough money");
                }
            }
        }

        for (let cur of this.userData.currencies){
            if (currencyTo === cur.name){
                cur.amount += amount * currencyFromRate / currencyToRate;
            }
        }

        this.ui.UpdateBudget(this.userData);
    }
    private async GetRateByName(name : CurrencyName){
        for (let cur of this.ratesHistory[this.ratesHistory.length - 1].currencies){
            if (name === cur.name){
                return cur.rate;
            }
        }
        throw new Error("err");
    }

}
export { Main };

let main = new Main();