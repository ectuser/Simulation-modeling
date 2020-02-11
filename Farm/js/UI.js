"use strict";
class UI {
    // private _fieldContext : CanvasRenderingContext2D;
    constructor(field) {
        this._field = field;
        this._uiField = document.createElement("div");
        // this._fieldContext = this._uiField.getContext('2d') as CanvasRenderingContext2D;
        this.ShowField();
    }
    ShowField() {
        // this._uiField.height = Settings.Height * Settings.PixelsPerUnit;
        // this._uiField.width = Settings.Height * Settings.PixelsPerUnit;
        this._uiField.id = "field";
        // this._fieldContext.fillStyle = "#FFA500";
        // this._fieldContext.fillRect(0, 0, this._uiField.width, this._uiField.height);
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
}
