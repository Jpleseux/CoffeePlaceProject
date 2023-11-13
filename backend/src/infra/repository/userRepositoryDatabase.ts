import userRepository from "../../application/repository/userRepository";
import User from "../../domain/entities/User";
const UserModel = require("../database/models/UserModel");
const productModel = require("../database/models/ProductModel");

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
        const userObj = await User.restore(user.name, user.age, user.email, user.password, user.salt, user.indentification, user.description, user.field,user.endereco, user.avatar, user.isPremium);
        console.log(userObj)
        return await userObj
    }
    async getUserByName(name:string):Promise<any>{
        const user = await UserModel.findOne({name:name});
        return await User.restore(user.name, user.age, user.email, user.password, user.salt, user.indentification, user.description, user.field,user.endereco, user.avatar, user.isPremium);
    }
    async getAll(): Promise<any> {
        const users = []
        const response = await UserModel.find();
        for (let user of response ){
            users.push(new User(response.name, response.age, response.email, response.password, response.salt, response.indentification, response.description, response.field, response.endereco, response.avatar))
        }
        return users
    }  
    async getSaller():Promise<any>{
        const users = []
        const response = await UserModel.find();
        for (let user of response ){
            if(user.field.isSalesman !== true){
                continue
            }
            if(user.field.isSalesman === true){
                users.push(new User(user.name, user.age, user.email, user.password, user.salt, user.indentification, user.description, user.field,user.endereco, user.avatar))
            }
        }
        return users
    }
    async modifyPassword(email:string, newPassword:string, newSalt:string):Promise<Boolean>{
        const response = await UserModel.updateOne(
            { email: { $in: email } },
            {
                $set: {
                    salt:newSalt,
                    password: newPassword,
                },
              },
        )
        if(!response){
            return false;
        }
        return true
    }
    async setIsPremium(email:string):Promise<Boolean>{
        const user = await UserModel.findOne({email:email});
        const productResponse = await productModel.updateMany(
            { nameSalesman: { $in: user.name } },
            {
                $set: {
                    isRecomended:true    
                },
              },
        )
        const response = await UserModel.updateOne(
            { email: { $in: email } },
            {
                $set: {
                    isPremium:true    
                },
              },
        )
        if(!response || !productResponse){
            return false;
        }
        return true
    }
    async delete(email:string):Promise<Boolean>{
        const product = await UserModel.findOne({email:email});
        const response = await UserModel.findByIdAndDelete(product.id);
        if(!response){
            return false;
        }
        return true
    }
    async SetUserToAdmin(email:string):Promise<Boolean>{
        const response = await UserModel.updateOne(
            { email: { $in: email } },
            {
                $set: { 'field.isAdmin': true },
            },
        )
        if(!response){
            return false;
        }
        return true
    }
}