class Cell extends GameObject{
    private _state : CellState;
    private _ui : UI;
    private _stateCounter = 0;
    private _localCounter = 0;
    private _user : User;
    public CanvasElement : HTMLCanvasElement | undefined;

    constructor(position : Point, ui : UI, user : User){
        super(position);

        this._state = Settings.CellStates[this._stateCounter];
        this._ui = ui;
        this._user = user;
        this._ui.ShowCell(this);
    }
    public get State(){
        return this._state;
    }
    public ClickHandler(){
        this._user.AddMoney(this._state.Value);
        this._ui.UpdateUserStats(this._user);
        if (this._stateCounter === 0){
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
        else{
            this._stateCounter = 0;
            this._localCounter = 0;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
    }

    public UpdateState(){
        console.log(this._localCounter);
        if (this._stateCounter < Settings.CellStates.length - 1 && this._stateCounter > 0){
            this._localCounter++;
            // this._stateCounter++;
            this.CheckLocalCounter();
        }
    }
    private CheckLocalCounter(){
        if (this._localCounter === 10){
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
        else if (this._localCounter === 30){
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
        else if (this._localCounter === 60){
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
        else if (this._localCounter === 80){
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
    }
    private ChangeState(state : CellState){
        this._state = state;
        this._ui.UpdateCellColor(this);
    }


}