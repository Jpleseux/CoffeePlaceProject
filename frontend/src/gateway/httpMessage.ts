import ChatMessage from "../entity/Message";
import httpClient from "../http/httpClient";
import messageGateway from "./messageGateway";
export default class httpMessage implements messageGateway{
    constructor(readonly httpClient:httpClient){

    }
    async getByChat(idChat: string|undefined): Promise<ChatMessage[]> {
        const response = await this.httpClient.get("http://localhost:3000/messages/get/chat", idChat);
        return await response
    }
}