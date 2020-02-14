"use strict";
class Cell extends GameObject {
    constructor(position, ui, user) {
        super(position);
        this._stateCounter = 0;
        this._localCounter = 0;
        this._state = Settings.CellStates[this._stateCounter];
        this._ui = ui;
        this._user = user;
        this._ui.ShowCell(this);
    }
    get State() {
        return this._state;
    }
    ClickHandler() {
        this._user.AddMoney(this._state.Value);
        this._ui.UpdateUserStats(this._user);
        if (this._stateCounter === 0) {
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
        else {
            this._stateCounter = 0;
            this._localCounter = 0;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
    }
    UpdateState() {
        console.log(this._localCounter);
        if (this._stateCounter < Settings.CellStates.length - 1 && this._stateCounter > 0) {
            this._localCounter++;
            // this._stateCounter++;
            this.CheckLocalCounter();
        }
    }
    CheckLocalCounter() {
        if (this._localCounter === 10) {
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
        else if (this._localCounter === 30) {
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
        else if (this._localCounter === 60) {
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
        else if (this._localCounter === 80) {
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
    }
    ChangeState(state) {
        this._state = state;
        this._ui.UpdateCellColor(this);
    }
}
