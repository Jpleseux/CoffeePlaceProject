import httpClient from "../http/httpClient";
import notificationGateway from "./notificationGateway";
import Notification from "../entity/Notification";

export default class httpNotification implements notificationGateway{
    constructor(readonly httpClient:httpClient){
    }
    async getByUserName(name: string): Promise<Notification[]> {
        const response = await this.httpClient.get("http://localhost:3000/notifications/get/notification/bynameuser", name);
        return await response
    }
    async setNotifications(ids: []): Promise<any> {
       const response = await this.httpClient.post("http://localhost:3000/notifications/setnotifications", ids);
       return await response;
    }
    async delete(idNotification: string): Promise<any> {
        const response = await this.httpClient.delete("http://localhost:3000/notifications/delete", idNotification)
        return await response
    }
}