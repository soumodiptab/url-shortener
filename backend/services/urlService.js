const Singleton = require("../models/singleton");
const UrlModel = require("../db/urlModel");
const crypto  = require("crypto")
class UrlService extends Singleton{
    constructor(){
        super();
        this.urlModel = new UrlModel;
    }
    generateShortUrl(originalUrl){
        const hash = crypto.createHash('sha256');
        const hashValue = hash.update(originalUrl).digest('hex');
        const shortUrl = hashValue.substring(0, 8);
        return shortUrl;
    }
    getOriginalUrl(shortUrl){
        this.urlModel.findByShortUrl(shortUrl);
        
    }
}
module.exports = UrlService