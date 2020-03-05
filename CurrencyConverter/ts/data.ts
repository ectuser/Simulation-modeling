import { Currency } from "./currency";
import { CurrencyName } from "./currencyName";

class Data{
    public static currencies : Currency[] = [
        new Currency(CurrencyName.RUB, 1),
        new Currency(CurrencyName.EUR, 73.76),
        new Currency(CurrencyName.USD, 66.22)
    ];


}
export { Data };