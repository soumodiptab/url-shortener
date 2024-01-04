import { Document } from 'mongoose';


interface IUser{
  username : string;
  password : string;
}
interface IUrlDocument extends IUser,Document{
}
export { IUser,IUrlDocument};