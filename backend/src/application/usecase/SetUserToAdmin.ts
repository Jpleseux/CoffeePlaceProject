import userRepository from "../repository/userRepository";
export default class SetUserToAdmin{
    constructor(readonly repository:userRepository){
    }
    async execute(id:string){
        const response =await this.repository.SetUserToAdmin(id);
        return await response
    }
}