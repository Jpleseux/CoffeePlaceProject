import repositoryFactory from "../../application/factory/repositoryFactory";
import httpServer from "../htttp/httpServer";
import { Request, Response, NextFunction } from "express";
const routerPrefix = "/category" 


export default class CategoryController {
    constructor(categoryController: httpServer, databaseFactory: repositoryFactory) { 
      categoryController.on("post", routerPrefix + "/create", async function (params: any, body: any) {
        try {
          const categorySave = databaseFactory.createCategoryRepository();
          const output = await categorySave.save(body);
          return { data: { msg: "Category created success" }, typeHttpResponse: 201 };
        } catch (error) {
          return { data: { msg: "Error while creating category" }, typeHttpResponse: 400 };
        }
      });
      categoryController.on("get", routerPrefix + "/getcategory/:id", async function (params: any, body: any) {
        try {
          const categoryGet = databaseFactory.createCategoryRepository();
          const output = await categoryGet.getOne(params.id);
          return {data:{output}, typeHttpResponse:201};
        } catch (error) {
          return { data: { msg: "Error while finding category" }, typeHttpResponse: 400 };
        }
      });
  
      categoryController.on("get", routerPrefix + "/getcategories", async function (params: any, body: any) {
        try {
          const getcategories = databaseFactory.createCategoryRepository();
          const output = await getcategories.getAll();
          return {data:{output}, typeHttpResponse:201};
        } catch (error) {
          return { data: { msg: "Error while finding categories"+ error }, typeHttpResponse: 400 };        }
      });
    
      categoryController.on("patch", routerPrefix + "/update/:id", async function (params: any, body: any) {
        try {
          const updateCategory = databaseFactory.createCategoryRepository();
          await updateCategory.patch(body, params.id);
          return { data:{ msg: "Update success"}, typeHttpResponse: 200 };
        } catch (error) {
          return { data: { msg: "Error while finding category"+error}, typeHttpResponse: 400 };
        }
      });
      categoryController.on("delete", routerPrefix+"/delete/:id", async function (params:any, body:any) {
        try {
          const deleteCategory = databaseFactory.createCategoryRepository();
          await deleteCategory.delete(params.id);

          return {data:{msg:"Category deleted success"}, typeHttpResponse:201}
        } catch (error) {
          return {data:{msg:"Error while deleting category"+error}, typeHttpResponse:400}
        }
      })
    }
  }
   