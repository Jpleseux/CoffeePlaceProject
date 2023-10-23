import httpClient from "../http/httpClient";
import emailGateway from "./emailGateway";
export default class httpEmail implements  emailGateway{
    constructor(readonly httpClient:httpClient){
    }
    async changePassword(emailReciver: string): Promise<any> {
        const response = await this.httpClient.get("http://localhost:3000/email/sendemail/password/change",emailReciver);

        return await response
    }
    async sendComplaint(emailSender: string, body:any): Promise<any> {
        const response = await this.httpClient.post("http://localhost:3000/email/sendemail/complaints/"+emailSender,body);

        return await response
    }
}