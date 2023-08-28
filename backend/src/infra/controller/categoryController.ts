import repositoryFactory from "../../application/factory/repositoryFactory";
import httpServer from "../htttp/httpServer";
const routerPrefix = "/category" 


export default class CategoryController {
    constructor(categoryController: httpServer, databaseFactory: repositoryFactory) { 
      categoryController.on("post", routerPrefix + "/create", async function (params: any, body: any) {
        try { 
          const categorySave = databaseFactory.createCategoryRepository();
          const output = await categorySave.save(body);
          return { data: { msg: "categoria criada com sucesso", done:true }, typeHttpResponse: 201 };
        } catch (error) {
          return { data: { msg: "Erro equanto criava categoria", done:false }, typeHttpResponse: 400 };
        }
      });
      categoryController.on("get", routerPrefix + "/getcategory/:id", async function (params: any, body: any) {
        try {
          const categoryGet = databaseFactory.createCategoryRepository();
          const output = await categoryGet.getOne(params.id);
          return {data:{output, done:true}, typeHttpResponse:201};
        } catch (error) {
          return { data: { msg: "Erro enquanto achava categoria", done:false  }, typeHttpResponse: 400 };
        }
      });
  
      categoryController.on("get", routerPrefix + "/getcategories", async function (params: any, body: any) {
        try {
          const getcategories = databaseFactory.createCategoryRepository();
          const output = await getcategories.getAll();
          return {data:{output, done:true}, typeHttpResponse:201};
        } catch (error) {
          return { data: { msg: "Erro enquanto encontrava categorias"+ error, done:false }, typeHttpResponse: 400 };        }
      });
     
      categoryController.on("patch", routerPrefix + "/update/:id", async function (params: any, body: any) {
        try {
          const updateCategory = databaseFactory.createCategoryRepository();
          await updateCategory.patch(body, params.id);
          return { data:{ msg: "Atualizada com sucesso"}, typeHttpResponse: 200 };
        } catch (error) {
          return { data: { msg: "Error equanto encontrava categoria"+error}, typeHttpResponse: 400 };
        }
      });
      categoryController.on("delete", routerPrefix+"/delete/:id", async function (params:any, body:any) {
        try {
          const deleteCategory = databaseFactory.createCategoryRepository();
          await deleteCategory.delete(params.id);

          return {data:{msg:"Categoria deletada com sucesso"}, typeHttpResponse:201}
        } catch (error) {
          return {data:{msg:"Error enquanto deletava categoria"+error}, typeHttpResponse:400}
        }
      })
    }
  }
   