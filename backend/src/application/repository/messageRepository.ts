import Message from "../../domain/entities/Message";
export default interface messageRepository{
    save(message:Message):Promise<any>;
    delete(idMessage:string):Promise<any>;
    get(): Promise<Message[]>;
    getOne(idMessage:string):Promise<Message>;
    getByChat(idChat:string):Promise<Message[]>;
}