export default class Notification{
    constructor(readonly msgNotification:string, readonly isNewNotification:Boolean, readonly receiver:string, readonly chat:string){
    }
}