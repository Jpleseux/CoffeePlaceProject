import Chat from "../entity/Chat";
import httpClient from "../http/httpClient";
import chatGateway from "./chatGateway";
export default class httpChat implements  chatGateway{
    constructor(readonly httpClient:httpClient){
    }
    async getOne(_id: string|undefined): Promise<any> {
        const response = await this.httpClient.get("http://localhost:3000/chat/get", _id); 
 
        return await response
    }
    async getByUsers(nameUser: string|undefined): Promise<Chat | Chat[]> {
        const response = await this.httpClient.get("http://localhost:3000/chat/get/nameuser", nameUser);

        return await response
    }
}