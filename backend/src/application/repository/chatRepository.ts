import Chat from "../../domain/entities/Chat";
export default interface chatRepository{
    save(chat:Chat):Promise<Chat>;
    delete(idChat:string):Promise<any>;
    get(): Promise<Chat[]>;
    getOne(idChat:string):Promise<Chat>;
    getByUser(nameUser:string):Promise<Chat[]>;
}