import tokenGenerate from "../../domain/entities/TokenGenerator";
import userRepository from "../repository/userRepository";
import PasswordGenerate from "../../domain/entities/PasswordGenerate";
export default class changePassword{
    constructor(readonly userRepository:userRepository){
    } 

    async execute(email:string):Promise<Output| boolean>{
        const user = await this.userRepository.get(email);
        if(!user){
            return false
        }
        const userObj = user.user
        const tokenGenerater = new tokenGenerate(process.env.SECRET)
        return{
            token: tokenGenerater.sign(user),
            user:userObj}
    }
    async executeChangePassword(email:string, newPassword:string):Promise<Boolean>{
        const newUpdatePassword = await PasswordGenerate.create(newPassword);
        const response = await this.userRepository.modifyPassword(email, newUpdatePassword.hash, newUpdatePassword.salt)

        return await response
    }
} 
type Output = {
    token:string
    user:object
}

type Input = {
	email: string
}