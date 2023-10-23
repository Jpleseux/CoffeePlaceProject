import Item from "./Item"
import DateEntity from "./Date"

export default class Product{  
    constructor(readonly idProduct:string, readonly nameProduct:string, readonly validateProduct:Date,readonly productValue:number,readonly idCategory:string, readonly nameSalesman:string,readonly imageProduct:string,readonly amount:number, readonly idBuyer?:string, readonly isRecomended?:string, readonly productAvaliation?:number,
    readonly descriptionProduct?: string){
    }
    static async create(idProduct:string, nameProduct:string,  validateProduct:Date,  productValue:number, idCategory:string, nameSalesman:string,amount:number, imageProduct:string, idBuyer?:string,productAvaliation?:number,
    isRecomended?:string, descriptionProduct?: string){

        const input = {nameProduct:nameProduct, validateProduct: validateProduct, productAvaliation: productAvaliation, productValue:productValue, idBuyer:idBuyer, idCategory:idCategory, idSalesman: nameSalesman, isRecomended:isRecomended, descriptionProduct: descriptionProduct}
        if((await Item.validateItem(input)).done !== true){
            return {msg:"Invalid item in product creation", done:false}
        }
        DateEntity.isExpirede(validateProduct);

        return new Product(idProduct,nameProduct, validateProduct,  productValue, idCategory,  nameSalesman,imageProduct,amount, idBuyer,isRecomended, productAvaliation,descriptionProduct);    

    }
}