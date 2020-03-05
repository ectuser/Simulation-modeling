import { CurrencyName } from "./currencyName";

class CurrencyRate{
    public name : CurrencyName;
    public rate : number;

    constructor(name : CurrencyName, rate : number){
        this.name = name;
        this.rate = rate;
    }
}

export { CurrencyRate };