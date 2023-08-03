import User from "../entity/User";
import httpClient from "../http/httpClient";
import userGateway from "./userGateway";

export default class httpUser implements userGateway{
    constructor(readonly httpClient:httpClient){
    }
    async login(Input:{}): Promise<any> {
        const response = await this.httpClient.post("http://localhost:3000/users/login",Input)
        return await response
    }
    async signUp(user: User): Promise<any> {
        const response = await this.httpClient.post("http://localhost:3000/", user)

        return await response
    }
    async verifyToken(token: string): Promise<boolean> {
        const Input = {token:token}
        const response = await this.httpClient.post("http://localhost:3000/users/verifytoken", Input);
        
        return await response
    }
}