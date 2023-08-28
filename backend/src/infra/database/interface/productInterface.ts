import { Document } from "mongoose";
export default interface productInterface extends Document{
    nameProduct: String,
    descriptionProduct: String,
    validateProduct:Date,
    productAvaliation?:number,
    productValue: number,
    idCategory?: String,
    idSalesman?:String,
    idBuyer?:String,
    isRecomended?:Boolean
}