import getSallers from "../../application/usecase/getSallers";
import Login from "../../application/usecase/Login";
import checkEmail from "../../application/usecase/checkEmail";
import signUp from "../../application/usecase/singUp";
import User from "../../domain/entities/User";
import databaseRepositoryFactory from "./databaseRepositoryFactory";
import getUser from "../../application/usecase/GetUser";
import defineEmail from "../../application/usecase/defineEmail";
import changePassword from "../../application/usecase/changePassword";
import DeleteUser from "../../application/usecase/DeleteUser";
import SetPremium from "../../application/usecase/SetPremium";
import SetUserToAdmin from "../../application/usecase/SetUserToAdmin";
export default class useCaseFactory{
    constructor(readonly repositoryFactory:databaseRepositoryFactory) {
    }
    async createSignUp(){
        return await new signUp(this.repositoryFactory.createUserRepository())
    }
    async verifyIsEmailExist(){
        return await new checkEmail(this.repositoryFactory.createUserRepository())
    }
    async createLogin(){
        return await new Login(this.repositoryFactory.createUserRepository())
    }
    async getUser(){
        return await new getUser(this.repositoryFactory.createUserRepository())
    }
    async getUserByName(){
        return await new getUser(this.repositoryFactory.createUserRepository())
    }
    async getSaller(){
        return await new getSallers(this.repositoryFactory.createUserRepository())
    }
    async defineEmailAdmin(){
        const adminEmail = new defineEmail();
        return await adminEmail.getEmailAdmin();
    }
    async changePassword(){
        return await new changePassword(this.repositoryFactory.createUserRepository());
    }
    async deleteUser(){
        return await new DeleteUser(this.repositoryFactory.createUserRepository());
    }
    async setPremium(){
        return await new SetPremium(this.repositoryFactory.createUserRepository());
    }
    async SetUserToAdmin(){
        return await new SetUserToAdmin(this.repositoryFactory.createUserRepository())
    }
}
  