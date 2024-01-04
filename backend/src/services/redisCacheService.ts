import {createClient} from 'redis';
import ConfigService from './configService';

export class RedisCacheService{
    private static instance: RedisCacheService;
    private config : ConfigService;
    private client : any;
    constructor(){
        this.config = ConfigService.getInstance()
        this.configure();
    }
    private async configure(){
        const username=this.config.get("REDIS_USER");
        const password=this.config.get("REDIS_PASS");
        const host=this.config.get("REDIS_HOST");
        const port=this.config.get("REDIS_PORT");
        const url=`redis://${username}:${password}@${host}:${port}`
        this.client =createClient({url:url});
        await this.client.connect();
    }
    async get(key : string) {
        const val=await this.client.get(key);
        if(!val){
            throw new Error()
        }
    }
    async set(key : string,value : string,expire : number){
        if(expire){
            return await this.client.set(key,value,'EX',expire);
        }
        return await this.client.set(key,value);
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new RedisCacheService();
        }
        return this.instance;
    }
}
