import httpClient from "../http/httpClient";
import productGateway from "./productGateway";
import Product from "../entity/Product";
export default class httpProduct implements productGateway {
    constructor(readonly httpClient:httpClient){
    }
    async save(product: {}): Promise<any> {
        const response = await this.httpClient.post("http://localhost:3000/products/create", product);
        return await response
    }
    async getProduct(id: string|undefined): Promise<Product> {
        const response  = await this.httpClient.get("http://localhost:3000/products/getproduct", id)
        return response
    }
    async getProductByName(name: string): Promise<Product[]> {
        const response  = await this.httpClient.get("http://localhost:3000/products/getproductbyuser", name)
        return response
    }
    async getNewProducts(): Promise<any> {
        const response = await this.httpClient.get("http://localhost:3000/products/getNewProducts");

        return response
    }
    async delete(idProduct: string): Promise<any> {
        const response = await this.httpClient.delete("http://localhost:3000/products/deleteproducts", idProduct)
        return response
    }
    async getTopProducts(): Promise<Product[]> {
        const response = await this.httpClient.get("http://localhost:3000/products/getTopProducts");

        return response
    }
    async getRecomendProducts():Promise<Product[]>{
        const response = await this.httpClient.get("http://localhost:3000/products/getRecomendProducts");

        return response
    }
     
}