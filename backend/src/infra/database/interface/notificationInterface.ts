import { Document } from "mongoose";
export default interface notificationInterface{
    msgNotification:String,
    isNewNotification:Boolean,
    receiver:String,
    chat:String,
    order:any
}