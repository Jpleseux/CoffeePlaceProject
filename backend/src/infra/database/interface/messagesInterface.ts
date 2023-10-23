import { Document } from "mongoose";

<<<<<<< HEAD
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
=======
export default interface messagenterface extends Document{
    message:string,
    NameSender:string,
    chat:string,
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
}