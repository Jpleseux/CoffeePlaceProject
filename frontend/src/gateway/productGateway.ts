import Product from "../entity/Product";

export default interface productGateway{
    save(product:{}):Promise<any>;
    delete(idProduct:string):Promise<any>;
    getNewProducts():Promise<any>;
    getProduct(id:string):Promise<Product>;
    getTopProducts():Promise<Product[]>;
    getRecomendProducts():Promise<Product[]>;
    getProductByName(name: string): Promise<Product[]>;
}