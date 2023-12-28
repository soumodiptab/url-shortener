import { UrlController } from "../controllers/urlController";
import { MainRouter } from "./router";

export class UrlRouter extends MainRouter{
    private urlController : UrlController
    constructor(){
        super();
        this.urlController = new UrlController();
    }
    registerRoutes(){
        this.router.get("/urls",this.urlController.getUrls);
    }
}