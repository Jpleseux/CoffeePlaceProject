import Product from "../../domain/entities/Product";
 
export default interface productRepository{
    save(product:Product):Promise<void>;
    patch(product:Product, idProduct:String):Promise<{msg:string, done:Boolean}>;
    delete(idProduct:String):Promise<void>;
    getByName(nameProduct:String):Promise<Product | {msg:String}>;
    getById(idProduct:String):Promise<Product | {msg:String}>;
    getAll():Promise<Product[]> ;
    getProductsByUser(name:string):Promise<Product[]>;
    getNewProducts():Promise<Product[]>;
    getTopProducts():Promise<Product[]>;
    getRecomendProducts():Promise<Product[]>;
    getProductByCategory(idCategory:string):Promise<Product[]>;
    setNewAmountFromProduct(idProduct:string, newAmount:number):Promise<any>;
    setNewAvaliation(newAvaliation:number, idProduct:string):Promise<Boolean>;
}