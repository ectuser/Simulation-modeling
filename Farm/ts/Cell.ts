class Cell extends GameObject{
    private _state : CellState;
    private _ui : UI;
    private _stateCounter = 0;
    private _user : User;
    public CanvasElement : HTMLCanvasElement | undefined;
    private actions = setInterval(() => {
        // this.UpdateState();
    }, 5000);
    constructor(position : Point, ui : UI, user : User){
        super(position);

        this._state = Settings.CellStates[this._stateCounter];
        this._ui = ui;
        this._user = user;
        this._ui.ShowCell(this);
        clearInterval(this.actions);
        // this.Actions();
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
            clearInterval(this.actions);
            this.actions = setInterval(() => {
                this.UpdateState();
            }, 5000);
        }
        else{
            this._stateCounter = 0;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
            clearInterval(this.actions);
        }
    }

    private UpdateState(){
        if (this._stateCounter < Settings.CellStates.length - 1){
            this._stateCounter++;
            this.ChangeState(Settings.CellStates[this._stateCounter]);
        }
    }
    private ChangeState(state : CellState){
        this._state = state;
        this._ui.UpdateCellColor(this);
    }


}