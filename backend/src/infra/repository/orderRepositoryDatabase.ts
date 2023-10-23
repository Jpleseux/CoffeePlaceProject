import orderRepository from "../../application/repository/orderRepository";
import Order from "../../domain/entities/Order";
const orderModel = require("../database/models/orderModel")
export default class orderRepositoryDatabase implements orderRepository {
    async save(Order: Order): Promise<any> {
        const response = await orderModel.create(Order);
        if(!response){
            return await {msg:"Erro ao salvar pedido", done:false};
        } 
        return await {msg:"Salvo com sucesso", done:true, response};
    }
    async delete(idOrder: string): Promise<any> {
        const response = await orderModel.findByIdAndDelete(idOrder);
        if(!response){
            return await {msg:"Erro ao deletar pedido", done:false};
        }
        return await {msg:"Deletado com sucesso", done:true};
    } 
    async get(): Promise<Order[]|{msg:string, done:Boolean}> {
        const orders = []
        const response = await orderModel.find();
        if(!response){
            return await {msg:"Erro ao salvar pedido", done:false};
        }
        for (let order of response){
            orders.push(new Order(order.product,order.finalOrderCode ,order.amount, order.saller, order.buyer))
        }
        return orders;     
    }
    async getOne(idOrder: string): Promise<Order|{msg:string, done:Boolean}> {
        const response = await orderModel.findById(idOrder);
        if(!response){
            return await {msg:"Erro ao salvar pedido", done:false};
        }
        return await response;
    }
    async setfinalizedOrder(idOrder:string):Promise<Boolean> {
        const response = await orderModel.updateMany(
            { finalOrderCode: { $in: idOrder } },
            {
                $set: {
                    isFinished: true,
                },
              },)
    if(!response){
        return false;
    }
    return true
    }
}