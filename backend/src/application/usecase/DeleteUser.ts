import userRepository from "../repository/userRepository";
export default class DeleteUser{
    constructor(readonly repository:userRepository){

    }
    async execute(id:string){
        const response =await this.repository.delete(id);
        return await response
    }
}