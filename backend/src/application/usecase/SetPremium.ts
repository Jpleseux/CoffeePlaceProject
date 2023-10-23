import userRepository from "../repository/userRepository";
export default class SetPremium{
    constructor(readonly repository:userRepository){
    }
    async execute(id:string){
        const response =await this.repository.setIsPremium(id);
        return await response
    }
}