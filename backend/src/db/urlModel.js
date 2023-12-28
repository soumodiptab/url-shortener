const Singleton = require("../models/singleton");
const Url = require("../models/url");
class UrlModel extends Singleton {
    constructor() {
        super();
    }
    async saveUrl(originalUrl,shortUrl){
        const url = new Url({ originalUrl, shortUrl });
        return url.save();
    }
    async findByShortUrl(shortUrl){
        return Url.findOne({shortUrl:shortUrl});
    }
    async findByOriginalUrl(originalUrl){
        return Url.findOne({originalUrl:originalUrl});
    }
    async updateShortUrl(originalUrl,shortUrl){
        return Url.findOneAndUpdate({originalUrl:originalUrl},{shortUrl:shortUrl,createdAt:Date.now()});
    }
}
module.exports = UrlModel;