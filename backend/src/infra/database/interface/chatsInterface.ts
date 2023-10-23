import { Document } from "mongoose";

export default interface categoryInterface extends Document{
    NameChat:string,
    chatMembers:[],
}