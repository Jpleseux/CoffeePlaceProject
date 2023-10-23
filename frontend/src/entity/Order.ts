export default class Order{
    constructor(readonly product:any, readonly amount:number,readonly saller:string, readonly finalOrderCode:string, readonly buyer:string, _id?:string){
    }
}