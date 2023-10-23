export default class Message{
    constructor(readonly typeMsg:string, readonly message:string, readonly nameSender:string, readonly chat:string, readonly order?:any){
    }

    static async create(typeMsg:string, nameSender:string,message:string,idChat:string, order?:any){
        if(!message || typeof message === null||typeof message === undefined){
            return {done:false};
        };
        if(!idChat || typeof idChat === null||typeof idChat === undefined){
            return {done:false};
        };
        if(!nameSender || typeof nameSender === null||typeof nameSender === undefined){
            return {done:false};
        };

        return new Message(typeMsg, message, nameSender, idChat, order);
    }
}