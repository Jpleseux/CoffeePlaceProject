import Order from "../entity/Order";
export default interface OrderGateway{
    save(Order:Order):Promise<any>;
    getOne(idOrder:string):Promise<Order>;
}