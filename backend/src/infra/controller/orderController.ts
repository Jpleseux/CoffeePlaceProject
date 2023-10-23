import repositoryFactory from "../../application/factory/repositoryFactory";
import httpServer from "../htttp/httpServer";
const routerPrefix = "/order";
import Order from "../../domain/entities/Order";
export default class orderController{
    constructor(orderController:httpServer, databaseFactory:repositoryFactory){
        orderController.on("post", routerPrefix+"/create",async function(params:any, body:Order){
            try {
                const saveOrder = await databaseFactory.createOrderRepository();
                if(body.amount > body.product.amount){
                    return {data:{msg:"A quantidade do pedido deve ser menor ou igual a quantidade em estoque",  done:false}, typeHttpResponse: 201}
                }
                const response = await saveOrder.save(body);
                if(response.done === false){
                    return {data:{msg:response.msg, done:false}, typeHttpResponse: 400}
                }
                return {data:{msg:"Pedido realizado com sucesso",response,  done:true}, typeHttpResponse: 201}
            } catch (error) {
                return {data:{msg:"Erro enquanto cadastrava o pedido"+error, done:false}, typeHttpResponse: 400}
            }
        })
        orderController.on("get", routerPrefix+"/get/:id",async function(params:any, body:Order){
            try { 
                const id = params.id
                const getOrder = await databaseFactory.createOrderRepository();
                const response = await getOrder.getOne(id)
                return {data:{msg:"Pedido encontrado:",response,  done:true}, typeHttpResponse: 201}
            } catch (error) {
                return {data:{msg:"Erro enquanto encontrava o pedido"+error, done:false}, typeHttpResponse: 400}
            }
        })
    }
}