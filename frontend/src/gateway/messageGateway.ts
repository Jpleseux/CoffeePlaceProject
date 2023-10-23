import ChatMessage from "../entity/Message";
export default interface messageGateway{
    getByChat(idChat:string|undefined):Promise<ChatMessage[]>;
}