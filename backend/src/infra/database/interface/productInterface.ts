import { Document } from "mongoose";
export default interface productInterface extends Document{
    nameProduct: String,
    descriptionProduct: String,
    validateProduct:Date,
    productAvaliation?:number,
    dateCreation:number,
    valorProduct: number,
    idCategory?: String,
    idSalesman?:String,
    idUser?:String
}