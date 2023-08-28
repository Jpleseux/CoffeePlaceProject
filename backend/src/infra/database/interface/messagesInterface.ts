import { Document } from "mongoose";

export default interface messagenterface extends Document{
    message:string,
    NameSender:string,
    chat:string,
}