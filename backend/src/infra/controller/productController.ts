import repositoryFactory from "../../application/factory/repositoryFactory";
import Item from "../../domain/entities/Item";
import httpServer from "../htttp/httpServer";
const RoutePrefix = "/products"
 
export default class productController{
    constructor(productController: httpServer,databaseFactory: repositoryFactory ){
        productController.on("post", RoutePrefix+"/create", async function (params:any, body:any) {
            try {
                const productDatabase = databaseFactory.createProductRepository();
                const validateItem = await Item.validateItem(body) 
                if( validateItem.done !== true){
                    // @ts-ignore
                    return {data:{msg:"Dado invalido"+ validateItem.itens, done:false}, typeHttpResponse: 400}
                };
  
                await productDatabase.save(body);

                return {data:{msg:"Produto cadastrado com sucesso", done:true}, typeHttpResponse: 201}


            } catch (error) {
                return {data:{msg:"Erro enquanto cadastrava o produto"+error, done:false}, typeHttpResponse: 400}
            }            
        })
        productController.on("get",RoutePrefix+"/getproduct/:id", async function (params:any) {
            try {
                const id = params.id;
                const getUserByUser = await databaseFactory.createProductRepository()
                const output = await getUserByUser.getById(id);
                return  {data:{output, done:true}, typeHttpResponse:201};

            } catch (error) {
                return {data:{msg:"Erro enquanto encontrava os produtos"+error, done:false}, typeHttpResponse: 400}
            }
        })
        productController.on("get",RoutePrefix+"/getproductbyuser/:name", async function (params:any) {
            try {
                const name = params.name;
                const getUserByUser = await databaseFactory.createProductRepository()
                const output = await getUserByUser.getProductsByUser(name);
                return  {data:{output, done:true}, typeHttpResponse:201};

            } catch (error) {
                return {data:{msg:"Erro enquanto encontrava os produtos"+error, done:false}, typeHttpResponse: 400}
            }
        })
        productController.on("delete", RoutePrefix+"/deleteproducts/:id", async function (params:any) {
            try {
                const id = params.id

                const deleteItem =  await databaseFactory.createProductRepository()

                const output = deleteItem.delete(id);
                if(!output){
                    return {data:{msg:"Produto não encontrado", done:false}, typeHttpResponse: 400}
                }
                return  {data:{output, done:true}, typeHttpResponse:200};
            } catch (error) {
                return {data:{msg:"Erro enquanto deletava os produtos"+error, done:false}, typeHttpResponse: 400}
            }
        })
        productController.on("get", RoutePrefix+"/getNewProducts", async function () {
            try {
                const getItens = await databaseFactory.createProductRepository();

                const output = await getItens.getNewProducts();
                if(!output){
                    return {data:{msg:"Produtos não encontrado", done:false}, typeHttpResponse: 400}
                }
                return  {data:{output, done:true}, typeHttpResponse:200};
            } catch (error) {
                return {data:{msg:"Erro enquanto buscava os produtos"+error, done:false}, typeHttpResponse: 400}
            }
        })
        productController.on("get", RoutePrefix+"/getTopProducts", async function () {
            try {
                const getItens = await databaseFactory.createProductRepository();

                const output = await getItens.getTopProducts();
                if(!output){
                    return {data:{msg:"Produtos não encontrado", done:false}, typeHttpResponse: 400}
                }
                return  {data:{output, done:true}, typeHttpResponse:200};
            } catch (error) {
                return {data:{msg:"Erro enquanto buscava os produtos"+error, done:false}, typeHttpResponse: 400}
            } 
        })
        productController.on("get", RoutePrefix+"/getRecomendProducts", async function () {
            try {
                const getItens = await databaseFactory.createProductRepository();

                const output = await getItens.getRecomendProducts();
                if(!output){
                    return {data:{msg:"Produtos não encontrado", done:false}, typeHttpResponse: 400}
                }
                return  {data:{output, done:true}, typeHttpResponse:200};
            } catch (error) {
                return {data:{msg:"Erro enquanto buscava os produtos"+error, done:false}, typeHttpResponse: 400}
            }
        })
        productController.on("get", RoutePrefix+"/getallproducts", async function (params:any) {
            try {
                const getItens = await databaseFactory.createProductRepository();

                const output = await getItens.getAll();
                if(!output){
                    return {data:{msg:"Produtos não encontrado", done:false}, typeHttpResponse: 400}
                }
                return  {data:{output, done:true}, typeHttpResponse:200};
            } catch (error) {
                return {data:{msg:"Erro enquanto buscava os produtos"+error, done:false}, typeHttpResponse: 400}
            }
        })
        productController.on("get", RoutePrefix+"/getproductByCategory/:id", async function (params:any) {
            try {
                const id = params.id;
                const getItens = await databaseFactory.createProductRepository();

                const output = await getItens.getProductByCategory(id);
                if(!output){
                    return {data:{msg:"Produtos não encontrado", done:false}, typeHttpResponse: 400}
                }
                return  {data:{output, done:true}, typeHttpResponse:200};
            } catch (error) {
                return {data:{msg:"Erro enquanto buscava os produtos"+error, done:false}, typeHttpResponse: 400}
            }
        })
        productController.on("patch", RoutePrefix+"/update/:id", async function (params:any, body:any) {
            try {
                const id = params.id;
                const patchItens = await databaseFactory.createProductRepository();

                const output = await patchItens.patch(body, id);
                if(output.done === false){
                    return {data:{msg:"Produtos não encontrado", done:false}, typeHttpResponse: 400}
                }else{
                    return  {data:{msg:"Editado com sucesso", done:true}, typeHttpResponse:200};
                }
            } catch (error) {
                return {data:{msg:"Erro enquanto buscava os produtos"+error, done:false}, typeHttpResponse: 400}
            }
        })
        productController.on("patch", RoutePrefix+"/submitavaliation/:id", async function (params:any, body:any) {
            try {
                const id = params.id;
                const changeAvaliation = await databaseFactory.createProductRepository()
                const output = await changeAvaliation.setNewAvaliation(body.avaliation, id);
                if(output === false){
                    return {data:{msg:"Erro ao mudar avaliação", done:false}, typeHttpResponse: 400}
                }else{
                    return  {data:{msg:"Avaliado com sucesso", done:true}, typeHttpResponse:200};
                }
            } catch (error) {
                return {data:{msg:"Erro ao mudar avaliação"+error, done:false}, typeHttpResponse: 400}
            }
        })
    }    
}