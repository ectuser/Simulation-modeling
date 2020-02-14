"use strict";
class UI {
    constructor(field) {
        this._field = field;
        this._uiField = document.createElement("div");
        this._moneyElement = document.querySelector("#money-amount");
        this._slider = document.querySelector("#game-speed");
        this.SliderChangesHandler();
        this.ShowField();
    }
    ShowField() {
        this._uiField.id = "field";
        let body = document.body;
        body.appendChild(this._uiField);
    }
    ShowCell(cell) {
        let cellHtml = document.createElement("canvas");
        cellHtml.width = Settings.PixelsPerUnit;
        cellHtml.height = Settings.PixelsPerUnit;
        cellHtml.style.left = (cell.Position.Col * Settings.PixelsPerUnit).toString() + "px";
        cellHtml.style.top = (cell.Position.Row * Settings.PixelsPerUnit).toString() + "px";
        let ctx = cellHtml.getContext('2d');
        ctx.fillStyle = cell.State.Color;
        ctx.fillRect(0, 0, cellHtml.width, cellHtml.height);
        this.CellEventClickListener(cellHtml, cell);
        this._uiField.appendChild(cellHtml);
        cell.CanvasElement = cellHtml;
        // document.body.appendChild(cellHtml);
    }
    CellEventClickListener(cellHtml, cell) {
        cellHtml.addEventListener("click", () => {
            cell.ClickHandler();
        });
    }
    UpdateCellColor(cell) {
        let canvas = cell.CanvasElement;
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = cell.State.Color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    UpdateUserStats(user) {
        this._moneyElement.textContent = user.Money.toString();
    }
    SliderChangesHandler() {
        this._slider.addEventListener('mouseup', () => {
            let speed = this._slider.value;
            document.querySelector("#speed-label").textContent = speed;
            Settings.Speed = parseInt(speed, 10);
            this._field.UpdateInter();
            console.log(Settings.Speed);
        });
    }
    UpdateDay(number) {
        let dayCounter = document.querySelector("#day");
        dayCounter.textContent = number.toString();
    }
}
