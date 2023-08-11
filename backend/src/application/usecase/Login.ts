import tokenGenerate from "../../domain/entities/TokenGenerator";
import userRepository from "../repository/userRepository";

export default class Login{
    constructor(readonly userRepository:userRepository){
    }

    async execute(Input:Input):Promise<Output| boolean>{
        const user = await this.userRepository.get(Input.email);
        const userObj = user.user
        if(await userObj.validatePassword(Input.password, userObj) ===true){
            const tokenGenerater = new tokenGenerate(process.env.SECRET)
            return{
                token: tokenGenerater.sign(user),
                user:userObj
            }
        }else{
            return false
        }
    }
}
type Output = {
    token:string
    user:object
}

type Input = {
	email: string,
	password: string
}