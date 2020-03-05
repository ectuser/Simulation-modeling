import express from 'express';
import { UserData } from './userData';
class Router{
    private app : express.Application;
    private userData : UserData;
    constructor(app : express.Application, userData : UserData){
        this.app = app;
        this.userData = userData;
        this.GetMainPage();
    }
    private GetMainPage(){
        this.app.get('/', (req : express.Request, res : express.Response) => {
            res.render("index", this.userData);
        })
    }
}

export { Router };