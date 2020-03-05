"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Currency = /** @class */ (function () {
    function Currency(name, value) {
        this.name = name;
        this.value = value;
    }
    Object.defineProperty(Currency.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Currency.prototype, "Value", {
        get: function () {
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    return Currency;
}());
exports.Currency = Currency;
