import { Router } from "express";
export abstract class MainRouter{
    public router: Router;
    constructor(){
        this.router=Router();
        this.registerRoutes();
    }
    public abstract registerRoutes():void
    public getRoutes(){
        return this.router;
    }
}