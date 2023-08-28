import Item from "./Item"
import DateEntity from "./Date"

export default class Product{
    constructor(readonly nameProduct:string, readonly validateProduct:Date,readonly productValue:number,readonly idCategory:string, readonly idSalesman:string,readonly idBuyer?:string, readonly isRecomended?:string, readonly productAvaliation?:number,
    readonly descriptionProduct?: string){
    }
    static async create(nameProduct:string,  validateProduct:Date,  productValue:number, idCategory:string,  idSalesman:string,idBuyer?:string,productAvaliation?:number,
    isRecomended?:string, descriptionProduct?: string){

        const input = {nameProduct:nameProduct, validateProduct: validateProduct, productAvaliation: productAvaliation, productValue:productValue, idBuyer:idBuyer, idCategory:idCategory, idSalesman: idSalesman, isRecomended:isRecomended, descriptionProduct: descriptionProduct}
        if(await Item.validateItem(input) === false){
            return {msg:"Invalid item in category creation", done:false}
        }
        DateEntity.isExpirede(validateProduct);

        return new Product(nameProduct, validateProduct,  productValue, idCategory,  idSalesman,idBuyer,isRecomended, productAvaliation,descriptionProduct);

    }
}