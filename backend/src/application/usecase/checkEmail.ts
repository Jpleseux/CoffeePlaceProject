import userRepository from "../repository/userRepository";

export default class checkEmail{
    constructor(readonly userRepository:userRepository){
    }
 
    async execute(email:string):Promise<boolean>{
        const response = await this.userRepository.verifyIsEmailExist(email);
        if(response ===false){
            return response
        }
        return response
    }
}