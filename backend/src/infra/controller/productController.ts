import repositoryFactory from "../../application/factory/repositoryFactory";
import httpServer from "../htttp/httpServer";
const RoutePrefix = "/products"

export default class productController{
    constructor(productController: httpServer,databaseFactory: repositoryFactory ){
        productController.on("post", RoutePrefix+"create", async function (body:any) {
            try {
                const productDatabase = databaseFactory.createProductRepository();
                
            } catch (error) {
                return {data:{msg:"Erro enquanto cadastrava o produto", done:false}, typeHttpResponse: 400}
            }            
        })
    }    
}