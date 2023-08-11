import Email from "../../domain/entities/Email";
import userRepository from "../repository/userRepository";

export default class getUser{
    constructor(readonly userRepository: userRepository) {
    }

    async execute(email:string){
        const response = this.userRepository.get(email);
        return response
    }
}