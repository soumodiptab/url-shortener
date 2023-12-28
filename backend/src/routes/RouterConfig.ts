import { MainRouter } from "./router";
import { UrlRouter } from "./urlRouter";
export class RouterConfig{
    public static getRoutes(): { [key: string] : MainRouter } {
        const routes={
            'url':new UrlRouter,
        };
        return routes;
    }
}