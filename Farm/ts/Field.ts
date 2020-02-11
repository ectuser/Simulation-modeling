class Field{
    private _ui : UI;
    private _cells : Cell[] = [];
    private _user : User = new User();

    constructor(){
        this._ui = new UI(this);
        this.InitCells();
        this.InitUser();
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



}