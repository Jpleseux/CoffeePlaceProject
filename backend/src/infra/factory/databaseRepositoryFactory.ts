import repositoryFactory from "../../application/factory/repositoryFactory";
import categoryRepository from "../../application/repository/categoryRepository";
import chatRepository from "../../application/repository/chatRepository";
import messageRepository from "../../application/repository/messageRepository";
import orderRepository from "../../application/repository/orderRepository";
import productRepository from "../../application/repository/productRepository";
import userRepository from "../../application/repository/userRepository";
import categoryRepositoryDatabase from "../repository/categoryRepositoryDatabase";
import chatRepositoryDatabase from "../repository/chatRepositoryDatabase";
import messageRepositoryDatabase from "../repository/messageRepositoryDatabase";
import productRepositoryDatabase from "../repository/productRepositoryDatabase";
import userRepositoryDatabase from "../repository/userRepositoryDatabase";
import orderRepositoryDatabase from "../repository/orderRepositoryDatabase";
import notificationRepositoryDatabase from "../repository/notificationRepositoryDatabase";
import notificationRepository from "../../application/repository/notificationRepository";
export default class databaseRepositoryFactory implements repositoryFactory{
    createCategoryRepository(): categoryRepository {
        return new categoryRepositoryDatabase()
    };
    createUserRepository(): userRepository {
        return new userRepositoryDatabase();
    };
    createProductRepository(): productRepository {
        return new productRepositoryDatabase();
    }
    createChatRepository(): chatRepository {
        return new chatRepositoryDatabase();
    }
    createMessageRepository(): messageRepository {
        return new messageRepositoryDatabase();
    }
    createOrderRepository(): orderRepository {
        return new orderRepositoryDatabase();
    }
    createNotificationRepository(): notificationRepository {
        return new notificationRepositoryDatabase();
    }
}