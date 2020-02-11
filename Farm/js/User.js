"use strict";
class User {
    constructor() {
        this._money = 100;
    }
    get Money() {
        return this._money;
    }
    AddMoney(amount) {
        this._money += amount;
    }
}
