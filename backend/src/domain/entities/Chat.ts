export default class Chat{
    constructor(readonly _id:string,readonly typeChat:string, readonly chatMembers:[]){
    }

    static async create(_id:string,typeChat:string, chatMembers:[]){
        if(!_id || typeof _id === null||typeof _id === undefined){
            return {done:false};
        };

        return new Chat(_id,typeChat, chatMembers);
    }
}