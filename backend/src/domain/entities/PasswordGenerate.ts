import bcrypt from "bcrypt";
import User from "./User";

export default class PasswordGenerate{
    constructor(password:string, salt:string){

    }
    static async create(password:string){

        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(password, salt);

        return {hash: passwordHash, salt:salt}
    }
    static async restore(password:string, salt:string){

    }
 
    static async validate(password:string, user: User){
        try {
            const isCorrect = await bcrypt.compare(password, user.password);
            return isCorrect

        } catch (error) {
            return false
        }
    }
}