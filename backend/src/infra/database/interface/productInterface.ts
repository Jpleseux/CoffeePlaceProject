import { Document } from "mongoose";
export default interface productInterface extends Document{
    nameProduct: String,
    descriptionProduct: String,
    validateProduct:Date,
    avaliationAmount:number,
    productAvaliation?:number,
    productValue: number,
    idCategory?: String,
    imageProduct:String,
    amount:number
    nameSalesman?:String,
    idBuyer?:String,
    isRecomended?:Boolean
}