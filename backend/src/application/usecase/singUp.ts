import tokenGenerate from "../../domain/entities/TokenGenerator";
import userRepository from "../repository/userRepository";

export default class signUp{
    constructor(readonly userRepository: userRepository){

    }
 
    async execute(user:any){
        await this.userRepository.save(user);
        const tokenGenerater = new tokenGenerate(process.env.SECRET)
        return {token: await tokenGenerater.sign(user)}
        
    }
}
