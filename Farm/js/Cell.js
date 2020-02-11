"use strict";
class Cell extends GameObject {
    constructor(position, ui) {
        super(position);
        this._stateCounter = 0;
        this.actions = setInterval(() => {
            // this.UpdateState();
        }, 5000);
        this._state = Settings.CellStates[this._stateCounter];
        this._ui = ui;
        this._ui.ShowCell(this);
        clearInterval(this.actions);
        // this.Actions();
    }
    get State() {
        return this._state;
    }
    ClickHandler() {
        if (this._stateCounter === 0) {
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
            clearInterval(this.actions);
            this.actions = setInterval(() => {
                this.UpdateState();
            }, 5000);
        }
        else {
            this._stateCounter = 0;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
            clearInterval(this.actions);
        }
    }
    UpdateState() {
        if (this._stateCounter < Settings.CellStates.length - 1) {
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
    }
    ChangeState(state) {
        this._state = state;
        this._ui.UpdateCellColor(this);
    }
}
