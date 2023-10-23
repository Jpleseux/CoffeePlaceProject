import userRepository from "../repository/userRepository";
export default class getSallers{
    constructor(readonly repository:userRepository){

    }
    async execute(){
        const response =await this.repository.getSaller();
        return await response
    }
}