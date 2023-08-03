import repositoryFactory from "../../application/factory/repositoryFactory";
import categoryRepository from "../../application/repository/categoryRepository";
import userRepository from "../../application/repository/userRepository";
import categoryRepositoryDatabase from "../repository/categoryRepositoryDatabase";
import userRepositoryDatabase from "../repository/userRepositoryDatabase";

export default class databaseRepositoryFactory implements repositoryFactory{
    createCategoryRepository(): categoryRepository {
        return new categoryRepositoryDatabase()
    };
    createUserRepository(): userRepository {
        return new userRepositoryDatabase();
    };
}