import categoryRepository from "../repository/categoryRepository";
import userRepository from "../repository/userRepository";
export default interface repositoryFactory{
    createCategoryRepository():categoryRepository;
    createUserRepository(): userRepository;
}