import User from "../entity/User";

export default interface userGateway{
    login(Input:{}):Promise<any>;
    signUp(user:User):Promise<any>;
    verifyToken(token:string):Promise<boolean>;
    getUser(email:string):Promise<any>;
}