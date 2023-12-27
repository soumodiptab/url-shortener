import express from 'express';
import ConfigService from './services/configService';
import { Router } from 'express';
import { RouterConfig } from './routes/RouterConfig';
class Server{
    private config : ConfigService;
    private router: Router
    public app : express.Application;
    constructor(){
        this.config = ConfigService.getInstance();
        this.app = express();
        this.router=Router();
        this.configure();
    }
    private configure(){
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.registerRoutes();
        this.app.use("/",this.router);
    }
    private registerRoutes(){
        const routes=RouterConfig.getRoutes();
        Object.entries(routes).forEach(([path,router])=>{
            this.router.use(path,router.getRoutes());
        })
    }
    public start(){
        const port = this.config.get("SERVER_PORT")
        this.app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }
}

const server=new Server();
server.start();