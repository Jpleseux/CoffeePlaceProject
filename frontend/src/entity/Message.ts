export default class ChatMessage{
    constructor(readonly typeMsg:string, readonly message:string, readonly nameSender:string, readonly chat:string, readonly order:any){
    }
}