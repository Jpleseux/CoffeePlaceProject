import categoryRepository from "../repository/categoryRepository";
import productRepository from "../repository/productRepository";
import userRepository from "../repository/userRepository";
export default interface repositoryFactory{
    createCategoryRepository():categoryRepository;
    createUserRepository(): userRepository;
    createProductRepository():productRepository;
}