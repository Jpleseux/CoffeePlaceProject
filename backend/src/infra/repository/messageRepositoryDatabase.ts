import messageRepository from "../../application/repository/messageRepository";
import Message from "../../domain/entities/Message";
const messageModel = require("../database/models/messageModel");

export default class messageRepositoryDatabase implements messageRepository{
    async save(message: Message): Promise<any> {
        await messageModel.create(message);
    }
    async get(): Promise<Message[]> {
        const response = await messageModel.find();

        return await response
    }
    async delete(idMessage: string): Promise<any> {
        await messageModel.findByIdAndDelete(idMessage);
    }
    async getOne(idMessage: string): Promise<Message> {
        const message = await messageModel.findById(idMessage);

        return await message
    }
    async getByChat(idChat: string): Promise<Message[]> {
        const message = await messageModel.find({chat:idChat});
        return await message
    }
}