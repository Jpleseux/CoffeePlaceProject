import repositoryFactory from "../../application/factory/repositoryFactory";
import httpServer from "../htttp/httpServer";
const routerPrefix = "/messages";
export default class messageController{
    constructor(messageController: httpServer,databaseFactory: repositoryFactory ){
        messageController.on("get", routerPrefix+"/get/chat/:id",async function(params:any) {
           try {
            const id = params.id;
            const getMessage = await databaseFactory.createMessageRepository();
            const output = await getMessage.getByChat(id);
            if(!output){
                return {data:{msg:"Erro enquanto encontrava a mensagem", done:false}, typeHttpResponse: 404}
            }

            return {data:{output, done:false}, typeHttpResponse: 200}
           } catch (error) {
            return {data:{msg:"Erro enquanto encontrava a mensagem"+error, done:false}, typeHttpResponse: 400}
           } 
        })
    }
}