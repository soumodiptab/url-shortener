const fs = require('fs');

class ConfigService{
    constructor(filePath){
        try{
            this.config = JSON.parse(fs.readFileSync(filePath));
        }
        catch(e){
            console.log("Error in reading config file:",e);
        }
    }
    static getInstance(){
        if (!this.instance) {
            this.instance = new ConfigService("../config/config.json");
          }
        return this.instance;
    }
}

module.exports = ConfigService