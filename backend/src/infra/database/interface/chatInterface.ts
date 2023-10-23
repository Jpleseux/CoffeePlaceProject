import { Document } from "mongoose";

export default interface chatInterface extends Document{
    _id:String,
    typeChat:string
    chatMembers:[],
}