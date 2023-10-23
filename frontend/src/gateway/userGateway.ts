import User from "../entity/User";

export default interface userGateway{
    login(Input:{}):Promise<any>;
    signUp(user:User):Promise<any>;
    verifyToken(token:string):Promise<boolean>;
    getUser(email:string|undefined):Promise<any>; 
    modifyPassword(updateUser:updateUser):Promise<any>;
    setIsPremium(email:string):Promise<any>;
    delete(email:string):Promise<any>;
    setUserToAdmin(email:string):Promise<any>;
}

type updateUser={
    password:string,
    email:string
}