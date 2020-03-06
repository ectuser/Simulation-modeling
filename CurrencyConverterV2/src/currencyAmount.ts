import { CurrencyName } from "./currencyName";

class CurrencyAmount{
    public name : CurrencyName;
    public amount : number;

    constructor(name : CurrencyName, amount : number){
        this.name = name;
        this.amount = amount;
    }
}

export { CurrencyAmount };