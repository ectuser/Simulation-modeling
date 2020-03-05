import { CurrencyAmount } from "./currencyAmount";
import { CurrencyName } from "./currencyName";

class UserData{
    public currencies : CurrencyAmount[] = [
        new CurrencyAmount(CurrencyName.RUB, 10000),
        new CurrencyAmount(CurrencyName.EUR, 0),
        new CurrencyAmount(CurrencyName.USD, 0),
    ];
}
export { UserData };