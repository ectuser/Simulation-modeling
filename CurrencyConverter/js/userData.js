"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserData = /** @class */ (function () {
    function UserData() {
        this.rub = 10000;
        this.eur = 0;
        this.usd = 0;
    }
    Object.defineProperty(UserData.prototype, "Rub", {
        get: function () {
            return this.rub;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "Eur", {
        get: function () {
            return this.eur;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "Usd", {
        get: function () {
            return this.usd;
        },
        enumerable: true,
        configurable: true
    });
    return UserData;
}());
exports.UserData = UserData;
