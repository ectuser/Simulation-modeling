class Field{
    private _ui : UI;
    private _cells : Cell[] = [];
    private _user : User = new User();
    private _day = 0;

    constructor(){
        this._ui = new UI(this);
        this.InitCells();
        this.InitUser();
        this.Actions();
    }
    private InitUser(){
        this._ui.UpdateUserStats(this._user);
    }
    private InitCells(){
        let rows = Settings.Height;
        let cols = Settings.Width;

        for (let row = 0; row < rows; row++){
            for (let col = 0; col < cols; col++){
                let cell = new Cell(new Point(row, col), this._ui, this._user);
                this._cells.push(cell);
            }
        }
    }
    private Actions(){
        let inter = setInterval(() => {
            this._cells.forEach((cell : Cell) => {
                cell.UpdateState();
            });
            this._day++;
            this._ui.UpdateDay(this._day);
        }, Settings.Speed);
    }
    



}