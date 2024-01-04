import { Document } from 'mongoose';


interface IUrl{
  originalUrl : string;
  shortUrl : string;
}
interface IUrlDocument extends IUrl,Document{
}
export { IUrl,IUrlDocument};