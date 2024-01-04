import dotenv from 'dotenv';

export default class ConfigService{
    private static instance : ConfigService;
    private environ : { [key : string]: string | undefined};
    constructor(){
            dotenv.config();
            this.environ=process.env;
    }

    public get(key: string): any | undefined {
        return this.environ[key];
    }
    public static getInstance(): ConfigService{
        if (!this.instance) {
            this.instance = new ConfigService();
          }
        return this.instance;
    }
}
