const { promisify } = require('util');
const redis = require('redis');
const Singleton = require('../models/singleton');

class RedisCacheService extends Singleton{
    constructor(){
        this.client =redis.createClient({
            host : 'localhost',
            port : '6379'
        });
        this.client.connect();
    }
    async get(key) {
        const val=await this.client.get(key);
        if(!val){
            throw new Error()
        }
    }
    async set(key,value,expire){
        if(expire){
            return await this.client.set(key,value,'EX',expire);
        }
        return await this.client.set(key,value);
    }
}
