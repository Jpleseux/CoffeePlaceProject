import mongoosePromisse from "./infra/database/mongoosePromise";
import expressAdapter from "./infra/htttp/expressAdapter";
import categoryController from "./infra/controller/categoryController";
import databaseRepositoryFactory from "./infra/factory/databaseRepositoryFactory";
import userController from "./infra/controller/userController";
import useCaseFactory from "./infra/factory/useCaseFactory";
import productController from "./infra/controller/productController";
const port:number = 3000;
const connection = new mongoosePromisse();
connection.connect();


const httpServer = new expressAdapter();
const factoryDatabase = new databaseRepositoryFactory();
const UseCaseFactory = new useCaseFactory(factoryDatabase);
new categoryController(httpServer, factoryDatabase);
new userController(UseCaseFactory, httpServer);
new productController(httpServer, factoryDatabase)
httpServer.listen(port);