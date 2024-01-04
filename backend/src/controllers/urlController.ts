import { Request, Response } from "express";
import Url from "../db/urlModel";
import { RedisCacheService } from "../services/redisCacheService";
import { UrlUtils } from "../utils/utilService";
import { IUrlDocument } from "../models/url";
export class UrlController{
    private cache : RedisCacheService
    constructor(){
        this.cache = RedisCacheService.getInstance();
    }
    registerUrl(req: Request, res: Response){
        const {originalUrl} = req.body;
        if(!originalUrl){
            return res.status(400).send({"error":"Invalid arguments"});
        }
    }
    async getUrl(req : Request, res: Response){
        const {url} = req.body;
        if(!url){
            return res.status(400).send({"error":"Invalid arguments"});
        }
        try {
            const shortUrl = UrlUtils.extract(url);
            const cachedUrl = await this.cache.get(shortUrl);
            if(!cachedUrl){
                const urlRec : IUrlDocument = await Url.findbyShortUrl(shortUrl);
                if(!urlRec){
                    throw new Error("Url not found");

                }
                this.cache.set(shortUrl,urlRec.originalUrl,200);
            }
            return cachedUrl;
        }
        catch(e){
            console.log(e);
            return res.status(500).send({"error":"Internal Server Error"});
        }
    }
}