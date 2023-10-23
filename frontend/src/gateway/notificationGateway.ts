import Notification from "../entity/Notification";
export default interface notificationGateway{
    getByUserName(name:string):Promise<Notification[]>;
    setNotifications(ids:[]):Promise<any>;
    delete(idNotification:string):Promise<any>;
}