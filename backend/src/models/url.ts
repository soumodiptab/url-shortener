import { Document } from 'mongoose';


interface IUrl{
  originalUrl : string;
  shortUrl : string;
  createdAt ?: Date;
}
interface IUrlDocument extends IUrl,Document{
  createdAt : Date;
}
export { IUrl,IUrlDocument};