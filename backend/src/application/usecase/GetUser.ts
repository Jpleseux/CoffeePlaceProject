import Email from "../../domain/entities/Email";
import userRepository from "../repository/userRepository";

export default class getUser{
    constructor(readonly userRepository: userRepository) {
    }

    async getUserByEmail(email:string){
        const response = this.userRepository.get(email);
        return response
    }
    async getUserByName(name: string){
        const response = this.userRepository.getUserByName(name);
        return response
    }
}