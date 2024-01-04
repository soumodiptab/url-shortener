import {createClient} from 'redis';
import ConfigService from './configService';

export class RedisCacheService{
    private static instance: RedisCacheService;
    private config : ConfigService;
    private client : any;
    private ttl : any;
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
        this.ttl =  this.config.get("REDIS_TTL");
        await this.client.connect();
    }
    async get(key : string) {
        return await this.client.get(key);
    }
    async set(key : string,value : string,expire? : number){
        if(!expire){
            expire = this.ttl;
        }
        return await this.client.set(key,value,'EX',expire);
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new RedisCacheService();
        }
        return this.instance;
    }
}
