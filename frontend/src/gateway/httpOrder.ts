import httpClient from "../http/httpClient";
import OrderGateway from "./orderGateway";
import Order from "../entity/Order";

export default class httpOrder implements OrderGateway{
    constructor(readonly httpClient:httpClient){
    }
    async save(Order: Order): Promise<any> {
        const response = await this.httpClient.post("http://localhost:3000/order/create", Order);
        return await response;
    }
    async getOne(idOrder: string): Promise<Order> {
        const response = await this.httpClient.get("http://localhost:3000/order/get/"+idOrder);
        return await response;
    }
}
