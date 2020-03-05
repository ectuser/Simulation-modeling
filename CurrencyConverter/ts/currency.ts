import { CurrencyName } from './currencyName';
class Currency{
    private name : CurrencyName;
    private value : Number;
    constructor(name : CurrencyName, value : Number){
        this.name = name;
        this.value = value;
    }
    get Name() : CurrencyName{
        return this.name;
    }
    get Value() : Number{
        return this.value;
    }
}

export { Currency };