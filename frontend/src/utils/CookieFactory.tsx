import Cookies from "js-cookie";

export default class CookieFactory {
  static async cookieUtil(nameCookie: string, data: any) {
    const isCookieExist = Cookies.get(nameCookie); 
    if (!isCookieExist) {
      const expirationTime = 30;

      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + expirationTime * 60 * 1000);
        
      Cookies.set(nameCookie, data, { expires: expirationDate });
    }

    return null;
  }

  static async verifyToken(token: any, gatewayContext: any) {
    const userGateway = gatewayContext?.userGateway;

    const response = await userGateway?.verifyToken(token);
    return response;
  }
}
