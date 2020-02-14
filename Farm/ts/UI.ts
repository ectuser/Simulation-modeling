class UI{
    private _field : Field;
    private _uiField : HTMLElement;
    private _moneyElement : HTMLElement;
    private _slider : HTMLInputElement;
    constructor(field : Field){
        this._field = field;
        this._uiField = document.createElement("div");
        this._moneyElement = document.querySelector("#money-amount") as HTMLElement;
        this._slider = document.querySelector("#game-speed") as HTMLInputElement;
        this.SliderChangesHandler();
        this.ShowField();
    }
    private ShowField(){
        this._uiField.id = "field";
        let body = document.body;
        body.appendChild(this._uiField);
    }
    public ShowCell(cell : Cell){
        let cellHtml : HTMLCanvasElement = document.createElement("canvas");
        cellHtml.width = Settings.PixelsPerUnit;
        cellHtml.height = Settings.PixelsPerUnit;
        cellHtml.style.left = (cell.Position.Col * Settings.PixelsPerUnit).toString() + "px";
        cellHtml.style.top = (cell.Position.Row * Settings.PixelsPerUnit).toString() + "px";
        let ctx = cellHtml.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = cell.State.Color;
        ctx.fillRect(0, 0, cellHtml.width, cellHtml.height);
        this.CellEventClickListener(cellHtml, cell);
        this._uiField.appendChild(cellHtml);
        cell.CanvasElement = cellHtml;
        // document.body.appendChild(cellHtml);
    }
    private CellEventClickListener(cellHtml : HTMLCanvasElement, cell : Cell){
        cellHtml.addEventListener("click", () => {
            cell.ClickHandler();
        })
    }
    public UpdateCellColor(cell : Cell){
        let canvas = cell.CanvasElement as HTMLCanvasElement;
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = cell.State.Color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    public UpdateUserStats(user : User){
        this._moneyElement.textContent = user.Money.toString();
    }
    private SliderChangesHandler(){
        this._slider.addEventListener('mouseup', () => {
            let speed = this._slider.value;
            (document.querySelector("#speed-label") as HTMLElement).textContent = speed;

            Settings.Speed = parseInt(speed, 10);
            console.log(Settings.Speed);
        });
    }
    public UpdateDay(number : number){
        let dayCounter : HTMLElement = document.querySelector("#day") as HTMLElement;
        dayCounter.textContent = number.toString();
    }

}