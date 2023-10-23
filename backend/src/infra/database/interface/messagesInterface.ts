import { Document } from "mongoose";

export default interface messageInterface extends Document{
    typeMsg:String,
    message:String,
    nameSender:String,
    chat:String,
    order?:{
        product:any,
        isRated:boolean,
        amount:number,
        saller:string,
        buyer:any
    }
}