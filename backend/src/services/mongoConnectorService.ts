import mongoose from "mongoose";
import ConfigService from "./configService";

class MongoDBConnector{
    private config : ConfigService;
    constructor(){
        this.config = ConfigService.getInstance();
        this.connect();
    }
    private prepareConnectionString(){
        const user = this.config.get("DB_USER");
        const host =this.config.get("DB_HOST");
        const port = this.config.get("DB_PORT"); 
        const password = this.config.get("DB_PASS");
        const dbName = this.config.get("DB_NAME");
        let connectionString = `mongodb://${user}:${password}@${host}:${port}/${dbName}`
        if(this.config.get("DB_TLS")){
            throw new Error("Unsupported TLS");
        }
        return connectionString;
    }
    public connect(){
        mongoose.connect(this.prepareConnectionString());
    }
    public async disconnect(){
        await mongoose.disconnect();
    }
    public static getInstance(){

    }
}