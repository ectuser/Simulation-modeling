class Settings{
    static GetState(){
        return this.State;
    }
    static GetDelay(){
        return this.Delay;
    }
    static SetState(newState){
        this.State = newState;
    }
    static SetDelay(newDelay){
        this.Delay = newDelay;
    }
}

export { Settings };