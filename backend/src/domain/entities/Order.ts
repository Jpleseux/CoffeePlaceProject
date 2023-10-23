export default class Order{
    constructor(readonly product:any,readonly finalOrderCode:string, readonly amount:number,readonly saller:string, readonly buyer:{}, _id?:string){
    }

    static async create(product:any, amount:number, saller:string, buyer:{},  finalOrderCode:string){
        if(product.amount < amount){
            return {done:false, msg:"A quantidade em estoque é"+amount+"Seleciona um valor igual ou inferior"}
        }
        if(amount > 0){
            return {done:false} 
        }
        return new Order(product,finalOrderCode, amount, saller, buyer);
    }
}