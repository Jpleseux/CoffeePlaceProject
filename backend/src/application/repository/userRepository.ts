import User from "../../domain/entities/User";
import signUpRepository from "./signUpRepository";

export default interface userRepository extends signUpRepository{
    save(user:User):Promise<void>;
    verifyIsEmailExist(email: string):Promise<boolean>;
    get(email:string):Promise<any>;
    getAll():Promise<any>;
    getUserByName(name:string):Promise<any>;
}