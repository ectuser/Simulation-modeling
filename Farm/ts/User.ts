class User{
    private _money : number = 100;
    public get Money(){
        return this._money;
    }
    public AddMoney(amount : number){
        this._money += amount;
    }
}