export default class category{
    idCategory?:String
    constructor(readonly descriptionCategory:String, readonly nameCategory:string, idCategory?:String){
        this.idCategory = idCategory
        if(!this.descriptionCategory|| !this.nameCategory){
            throw new Error("Dados invalidos")
        }
    }
}