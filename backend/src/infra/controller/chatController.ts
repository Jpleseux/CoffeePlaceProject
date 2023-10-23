import repositoryFactory from "../../application/factory/repositoryFactory";
import httpServer from "../htttp/httpServer";
const routerPrefix = "/chat";
export default class chatController{
    constructor(chatController: httpServer,databaseFactory: repositoryFactory ){
        chatController.on("get", routerPrefix+"/get/:id", async function(params:any) {
            try {
                const id = params.id;
                const getChat = await databaseFactory.createChatRepository();

                const response = await getChat.getOne(id);
                if(!response){
                    return {data:{msg:"Erro enquanto encontrava o chat", done:false}, typeHttpResponse: 400}
                }
                return {data:{response, done:true}, typeHttpResponse: 201}
            } catch (error) {
                return {data:{msg:"Erro enquanto encontrava o chat"+error, done:false}, typeHttpResponse: 400}
            }
        })
        chatController.on("get", routerPrefix+"/get/nameuser/:id", async function(params:any) {
            try {
                const name = params.id;
                const getChats = await databaseFactory.createChatRepository();

                const response = await getChats.getByUser(name);
                if(!response){
                    return {data:{msg:"Erro enquanto encontrava o chat", done:false}, typeHttpResponse: 400}
                }
                return {data:{response, done:true}, typeHttpResponse: 201}
            } catch (error) {
                return {data:{msg:"Erro enquanto encontrava o chat"+error, done:false}, typeHttpResponse: 400}
            }
        })
    }
}