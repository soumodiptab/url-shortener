import mongoose, {Schema,Model} from 'mongoose';
import { IUrlDocument } from '../models/url';
import * as crypto from "crypto";
/**
 * This is the URL Model, put all custom query methods over here as static methodsss
 */
interface IUrlModel extends Model<IUrlDocument> {
    findbyShortUrl(shortUrl: string):Promise<any>
    findbyLongUrl(longUrl : string): Promise<any>
}

const UrlSchema: Schema<IUrlDocument> = new Schema({
    originalUrl: { type: String, required: true,unique:true },
    shortUrl: { type: String, required: true,unique:true }
},{timestamps:true});
/**
 * Hashes the long url 
 */
UrlSchema.pre("save",function(next){
    const hash = crypto.createHash('sha256');
    const hashValue = hash.update(this.originalUrl).digest('hex');
    this.shortUrl = hashValue.substring(0, 8);
    next();
})

UrlSchema.static("findbyShortUrl" , async function(shortUrl: string){
    return await this.findOne({shortUrl: shortUrl});
});
UrlSchema.static("findbyLongUrl",async function(longUrl:string) {
    return await this.findOne({longUrl: longUrl});
})

const Url = mongoose.model<IUrlDocument,IUrlModel>("url",UrlSchema);
export default Url;