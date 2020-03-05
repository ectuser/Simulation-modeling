import { CurrencyName } from "./currencyName";
import { CurrencyRate } from "./currencyRate";

class Rates{
    public date : Date;
    public currencies : CurrencyRate[];
    constructor(newcurrencyData : CurrencyRate[], date : Date){
        this.currencies = newcurrencyData;
        this.date = date;
    }

}

export { Rates };