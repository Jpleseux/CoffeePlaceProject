import httpClient from "../http/httpClient";
import userGateway from "./userGateway";
 
export default class httpUser implements userGateway{
    constructor(readonly httpClient:httpClient){
    }
    async login(Input:{}): Promise<any> {
        const response = await this.httpClient.post("http://localhost:3000/users/login",Input)
        return await response
    }
    async signUp(user: {}): Promise<any> {
        const response = await this.httpClient.post("http://localhost:3000/users/signup", user)
        
        return await response
    }
    async verifyToken(token: string): Promise<boolean> {
        const Input = {token:token}
        const response = await this.httpClient.post("http://localhost:3000/users/verifytoken", Input);
        
        return await response
    } 
    async getUser(email: string): Promise<any> {
        const response = await this.httpClient.get("http://localhost:3000/users/getuser", email)
        return await response
    }
    async getUserByName(name: string |undefined):Promise<any>{
        const response = await this.httpClient.get("http://localhost:3000/users/getuserbyname", name)

        return await response
    }
}