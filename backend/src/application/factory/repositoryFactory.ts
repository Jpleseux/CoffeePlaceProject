import categoryRepository from "../repository/categoryRepository";
import productRepository from "../repository/productRepository";
import userRepository from "../repository/userRepository";
import chatRepository from "../repository/chatRepository";
import messageRepository from "../repository/messageRepository";
import orderRepository from "../repository/orderRepository";
import notificationRepository from "../repository/notificationRepository";
export default interface repositoryFactory{
    createCategoryRepository():categoryRepository;
    createUserRepository(): userRepository;
    createProductRepository():productRepository;
    createChatRepository():chatRepository;
    createMessageRepository():messageRepository;
    createOrderRepository():orderRepository;
    createMessageRepository():messageRepository;
    createNotificationRepository():notificationRepository;
}