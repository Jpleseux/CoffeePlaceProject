import Chat from "../entity/Chat";
export default interface chatGateway{
    getOne(_id:string):Promise<any>;
    getByUsers(nameUser:string|undefined):Promise<Chat[]|Chat>;
}