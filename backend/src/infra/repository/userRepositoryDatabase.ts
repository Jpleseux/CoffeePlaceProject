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
        return await User.restore(user.name, user.age, user.email, user.password, user.salt, user.indentification, user.description, user.field,user.endereco, user.avatar);
    }
    async getUserByName(name:string):Promise<any>{
        const user = await UserModel.findOne({name:name});
        return await User.restore(user.name, user.age, user.email, user.password, user.salt, user.indentification, user.description, user.field,user.endereco, user.avatar);
    }
    async getAll(): Promise<any> {
        const users = []
        const response = await UserModel.find();
        for (let user of response ){
            users.push(new User(response.name, response.age, response.email, response.password, response.salt, response.indentification, response.description, response.field, response.endereco, response.avatar))
        }
        return users
    }
}