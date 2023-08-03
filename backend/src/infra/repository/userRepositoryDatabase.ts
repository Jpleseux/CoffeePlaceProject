import userRepository from "../../application/repository/userRepository";
import User from "../../domain/entities/User";
const UserModel = require("../database/models/UserModel")

export default class userRepositoryDatabase implements userRepository  {
    async save(user: User): Promise<void> {
        await UserModel.create(user);
    };
    async verifyIsEmailExist(email: string): Promise<boolean> {
        const exist = await UserModel.findOne({email: email});
        if(exist){
            return true
        }
        return false
    }
    async get(email: string): Promise<any> {
        const user = await UserModel.findOne({email:email});

<<<<<<< HEAD
        return await User.restore(user.name, user.age, user.email, user.password, user.salt, user.indentification, user.description, user.custonField,user.endereco);
=======
        return await User.restore(user.email, user.password, user.salt, user.cpf, user.description, user.custonField,user.endereco);
>>>>>>> origin/main
    }
}
