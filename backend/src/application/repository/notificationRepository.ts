import Notification from "../../domain/entities/Notification";
export default interface notificationRepository{
    save(Notification:Notification):Promise<Notification>;
    delete(idNotification:string):Promise<any>;
    get(): Promise<Notification[]>;
    getOne(idNotification:string):Promise<Notification>;
    getByUserName(name:string):Promise<Notification[]>;
    getByChat(idChat:string):Promise<any>;
    setNotifications(idNotification:[]):Promise<Boolean>
}