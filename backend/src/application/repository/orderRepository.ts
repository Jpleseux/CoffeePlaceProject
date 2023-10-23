import Order from "../../domain/entities/Order";
export default interface orderRepository{
    save(Order:Order):Promise<any>;
    delete(idOrder:string):Promise<any>;
    get(): Promise<Order[]|{msg:string, done:Boolean}>;
    getOne(idOrder:string):Promise<Order|{msg:string, done:Boolean}>;
    setfinalizedOrder(idOrder:string):Promise<Boolean>;
}