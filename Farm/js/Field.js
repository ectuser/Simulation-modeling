"use strict";
class Field {
    constructor() {
        this._cells = [];
        this._user = new User();
        this._day = 0;
        this.inter = setInterval(() => {
            this.InterIteration();
        }, Settings.Speed);
        this._ui = new UI(this);
        this.InitCells();
        this.InitUser();
        // this.Actions();
    }
    InitUser() {
        this._ui.UpdateUserStats(this._user);
    }
    InitCells() {
        let rows = Settings.Height;
        let cols = Settings.Width;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let cell = new Cell(new Point(row, col), this._ui, this._user);
                this._cells.push(cell);
            }
        }
    }
    InterIteration() {
        this._cells.forEach((cell) => {
            cell.UpdateState();
        });
        this._day++;
        this._ui.UpdateDay(this._day);
        console.log(Settings.Speed);
    }
    UpdateInter() {
        clearInterval(this.inter);
        this.inter = setInterval(() => {
            this.InterIteration();
        }, Settings.Speed);
    }
}
