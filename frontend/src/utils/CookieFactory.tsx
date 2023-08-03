import Cookies from "js-cookie";

export default class CookieFactory{
    static async cookieUtil(token:string){
        const isCookieExist = Cookies.get(token);
        if(!isCookieExist){
            const expirationTime = 30;
    
            const expirationDate = await new Date();
    
            expirationDate.setTime(expirationDate.getTime() + expirationTime * 60 * 1000);
    
            Cookies.set("jwttoken", token, {expires: expirationDate})
        }
 
    return null
    }
    static async verifyToken(token:any, gatewayContext:any){
        const userGateway = await gatewayContext?.userGateway

        const response = await userGateway?.verifyToken(token);
        return await response
    }
}