import notificationRepository from "../../application/repository/notificationRepository";
import Notification from "../../domain/entities/Notification";
const notificatioModel = require("../database/models/notificationModel");
export default class notificationRepositoryDatabase implements notificationRepository{
    async save(notification: Notification): Promise<any> {
        await notificatioModel.create(notification);
    }
    async get(): Promise<Notification[]> {
        const response = await notificatioModel.find();

        return await response
    }
    async delete(idNotification: string): Promise<any> {
        const response = await notificatioModel.findByIdAndDelete(idNotification);
        return await response
    }
    async getOne(idNotification: string): Promise<Notification> {
        const notification = await notificatioModel.findById(idNotification);

        return await notification
    }
    async getByUserName(name:String):Promise<Notification[]>{
        const notifications = await notificatioModel.find({receiver:name});
        return await notifications
    }
    async getByChat(idChat:string):Promise<any>{
        const response = await notificatioModel.find({chat:idChat})
        return await response
    }
    async setNotifications(idNotification:[]):Promise<Boolean> {
        const response = await notificatioModel.updateMany(
                { _id: { $in: idNotification } },
                {
                    $set: {
                        isNewNotification: false,
                    },
                  },
    )
        if(!response){
            return false;
        }
        return true
    }
}