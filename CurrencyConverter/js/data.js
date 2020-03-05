"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var currency_1 = require("./currency");
var currencyName_1 = require("./currencyName");
var Data = /** @class */ (function () {
    function Data() {
    }
    Data.currencies = [
        new currency_1.Currency(currencyName_1.CurrencyName.RUB, 1),
        new currency_1.Currency(currencyName_1.CurrencyName.EUR, 73.76),
        new currency_1.Currency(currencyName_1.CurrencyName.USD, 66.22)
    ];
    return Data;
}());
exports.Data = Data;
