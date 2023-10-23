import Chat from "./Chat";
export default class Notification{
    constructor(readonly msgNotification:string, readonly isNewNotification:Boolean, readonly receiver:string, readonly chat?:string|number, readonly order?:any){
    }

    static async create( msgNotification:string, isNewNotification:Boolean, receiver:string, chat:string){
        return new Notification(msgNotification, isNewNotification, receiver, chat);
    }
}