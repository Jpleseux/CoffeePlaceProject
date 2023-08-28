import Product from "../../domain/entities/Product";

export default interface productRepository{
    save(product:Product):Promise<void>;
    patch(product:Product, idProduct:String):Promise<void>;
    delete(idProduct:String):Promise<void>;
    getByName(nameProduct:String):Promise<Product | {msg:String}>;
    getById(idProduct:String):Promise<Product | {msg:String}>;
    getAll():Promise<Product[]>;
}