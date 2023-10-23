import chatRepository from "../../application/repository/chatRepository";
import Chat from "../../domain/entities/Chat";
const chatModel = require("../database/models/chatModel");
const messageModel = require("../database/models/messageModel")
export default class chatRepositoryDatabase implements chatRepository{
    async save(chat:Chat):Promise<Chat>{
        const newChat = await chatModel.create(chat);
        return newChat
    }
    async delete(idChat: string): Promise<any> {
        await messageModel.deleteMany({chat :idChat});
        await chatModel.findByIdAndDelete(idChat);
    }
    async get(): Promise<Chat[]> {
        const chats = []
        const response = await chatModel.find();

        for (let chat of response){
            chats.push(new Chat(chat.NameChat,chat.typeChat, chat.chatMembers))
        }    

        return chats
    }
    async getOne(idChat: string): Promise<Chat> {
        const chat = await chatModel.findById({_id:idChat});
        return await chat
    }
    async getByUser(nameUser:string):Promise<Chat[]>{
        const chats = await chatModel.find({ chatMembers: { $elemMatch: { nameUser: nameUser } } })
        console.log(chats)
        return await chats
    }
}