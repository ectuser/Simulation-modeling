abstract class GameObject{
    protected _position : Point;
    constructor(position : Point){
        this._position = position;
    }
    public get Position(){
        return this._position;
    }
}