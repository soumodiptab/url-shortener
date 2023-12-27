import express from 'express';
import ConfigService from './services/configService';
class Server{
    private config : ConfigService;
    public app : express.Application;
    constructor(){
        this.config = ConfigService.getInstance();
        this.app = express();
        this.configure();
    }
    private configure(){
        this.app.use(express.json());
        this.app.use(express.urlencoded());
    }
    private registerRoutes(){
        
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