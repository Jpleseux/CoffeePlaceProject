import { Document } from "mongoose";
export default interface productInterface extends Document{
    nameProduct: String,
    descriptionProduct: String,
    validateProduct:Date,
    avaliationAmount:number,
    productAvaliation?:number,
    productValue: number,
    idCategory?: String,
<<<<<<< HEAD
    imageProduct:String,
    amount:number
    nameSalesman?:String,
=======
    idSalesman?:String,
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
    idBuyer?:String,
    isRecomended?:Boolean
}