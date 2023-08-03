<<<<<<< HEAD
import { verify } from "jsonwebtoken";
=======
>>>>>>> origin/main
import repositoryFactory from "../../application/factory/repositoryFactory";
import userRepository from "../../application/repository/userRepository";
import Login from "../../application/usecase/Login";
import checkEmail from "../../application/usecase/checkEmail";
import signUp from "../../application/usecase/singUp";
import User from "../../domain/entities/User";
import databaseRepositoryFactory from "./databaseRepositoryFactory";

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
}