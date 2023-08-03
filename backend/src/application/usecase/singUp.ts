import userRepository from "../repository/userRepository";

export default class signUp{
    constructor(readonly userRepository: userRepository){

    }

    async execute(user:any){
        await this.userRepository.save(user);
    }
}

