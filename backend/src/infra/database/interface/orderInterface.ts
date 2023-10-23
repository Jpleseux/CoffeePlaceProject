import { Document } from "mongoose";

export default interface orderInterface extends Document{
    product:any,
    amount:number,
    finalOrderCode:string,
    isFinished:boolean,
    isRated:boolean,
    buyer:{
        nameBuyer:String,
        addressBuyer:{}
    }
    saller:string;
} 