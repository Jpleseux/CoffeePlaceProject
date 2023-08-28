import Category from "../entity/Category";
import httpClient from "../http/httpClient";
import categoryGateway from "./categoryGateway";

export default class httpCategory implements categoryGateway{
    constructor(readonly httpClient:httpClient) {
    }
    async save(category: Category): Promise<any> {
        const response  = await this.httpClient.post("http://localhost:3000/category/create", category)
        return response
    }
}

