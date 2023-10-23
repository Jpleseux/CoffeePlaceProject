import repositoryFactory from "../../application/factory/repositoryFactory";
import httpServer from "../htttp/httpServer";
const routerPrefix = "/notifications"; 
export default class notificationController{
    constructor(notificationController: httpServer,databaseFactory: repositoryFactory ){
        notificationController.on("get", routerPrefix+"/get/notification/bynameuser/:id",async function(params:any) {
            try {
                const id = params.id
                const getNotification =await databaseFactory.createNotificationRepository();
                const response = await getNotification.getByUserName(id);

                if(!response){
                    return {data:{msg:"Erro enquanto encontrava o notificações", done:false}, typeHttpResponse: 400}
                }
                return  {data:{response, done:true}, typeHttpResponse:200};

            } catch (error) {
                return {data:{msg:"Erro enquanto encontrava o notificações"+error, done:false}, typeHttpResponse: 400}
            }
        })
        notificationController.on("post", routerPrefix+"/setnotifications", async function(params:any, body:any){
            try {
                const setNotifications = await databaseFactory.createNotificationRepository();

                const response = await setNotifications.setNotifications(body);

                if(response === false){
                    return {data:{msg:"Erro enquanto editava as notificações", done:false}, typeHttpResponse: 400}
                }
                return  {data:{msg:"Notificações visualizadas",response, done:true}, typeHttpResponse:200};
            } catch (error) {
                return {data:{msg:"Erro enquanto editava as notificações"+error, done:false}, typeHttpResponse: 400}
            }
        })
        notificationController.on("delete", routerPrefix+"/delete/:id", async function(params:any){
            try {
                const id = params.id;
                const deleteNotifications = await databaseFactory.createNotificationRepository();

                const response = await deleteNotifications.delete(id);

                if(!response){
                    return {data:{msg:"Erro enquanto deletava as notificações", done:false}, typeHttpResponse: 400}
                }
                return  {data:{msg:"Notificações deletadas",response, done:true}, typeHttpResponse:200};
            } catch (error) {
                return {data:{msg:"Erro enquanto deletava as notificações"+error, done:false}, typeHttpResponse: 400}
            }
        })
    }
}