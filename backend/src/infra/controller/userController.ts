import repositoryFactory from "../../application/factory/repositoryFactory";
import Email from "../../domain/entities/Email";
import User from "../../domain/entities/User";
import useCaseFactory from "../factory/useCaseFactory";
import httpServer from "../htttp/httpServer";
import Item from "../../domain/entities/Item";
<<<<<<< HEAD
import verifyToken from "../../application/usecase/verify";
const routerPrefix = "/users"
=======
import { Request, Response, NextFunction } from "express";
const routerPrefix = "/users"
function middlewareCase(req:Request, res:Response, next:NextFunction){
    try {
        
        next()
    } catch (error) {
        next(error);
    }
}
>>>>>>> origin/main
//@ts-ignore
export default class userController{
    constructor(repositoryFactory: useCaseFactory, userController: httpServer){
        userController.on("post",routerPrefix+"/signup", async function (params:any, body:any) {
<<<<<<< HEAD
            try {       
                const user = await User.create(body.name,body.age,body.Inputemail, body.password, body.indentification, body.description, body.field, body.endereco)
=======
            try {            
                const user = await User.create(body.email, body.password, body.cpf, body.description, body.field, body.endereco)
>>>>>>> origin/main
                const signUp = await repositoryFactory.createSignUp()
                const verifyIsEmailExist = await repositoryFactory.verifyIsEmailExist()
                if(await verifyIsEmailExist.execute(body.email) === true){
                    return {data:{msg:"This Email already exist"},typeHttpResponse:400}
                }

                if(user.done ===false){
                    return {data:user, typeHttpResponse:400}
                }
                await signUp.execute(user.user);
                
                return {data:{msg:"Creation success"}, typeHttpResponse:201}
            } catch (error) {
                return {data:{msg:"Error while creating User"+error}, typeHttpResponse:400};
            };
        });
        userController.on("post",routerPrefix+"/login", async function (params:any, body:any) {
            try {
                const Input = {email:body.email, password: body.password}
                if(await Item.validateItem(Input) === false){
<<<<<<< HEAD
                    return {data:{msg:"Login invalid, email and password is required", done:false}, typeHttpResponse:400};
                }
                const verifyIsEmailExist = await repositoryFactory.verifyIsEmailExist()
                if(await verifyIsEmailExist.execute(body.email) === false){
                    return {data:{msg:"This account doesn't exist, create an account!!!", done:false},typeHttpResponse:400}
=======
                    return {data:{msg:"Login invalid, email and password is required"}, typeHttpResponse:400};
                }
                const verifyIsEmailExist = await repositoryFactory.verifyIsEmailExist()
                if(await verifyIsEmailExist.execute(body.email) === false){
                    return {data:{msg:"This account doesn't exist, create an account!!!"},typeHttpResponse:400}
>>>>>>> origin/main
                }

                const login = await repositoryFactory.createLogin()
                const response = await login.execute(Input);
<<<<<<< HEAD
                if(response === false) return {data:{msg:"Senha incorreta", done:false},typeHttpResponse:400}
//@ts-ignore
                return {data:{msg:"successfully logged in",token: response.token, done:true}, typeHttpResponse:201}
            } catch (error) {
                return {data:{msg:"Error while creating User  "+error, done:false}, typeHttpResponse:400};
            };
        });
        userController.on("post", routerPrefix+"/verifytoken", async function (params:any, body:any, headers:any) {
            if(!body.token || body.token === null ||body.token ===undefined ){
                return {data:{msg:"Você deve estar logado para acessar essa pagina",done:false}, typeHttpResponse:400}
            }

            const verifytoken = new verifyToken;

            const checkToken = await verifytoken.execute(body.token)
            if(checkToken ===false){
                return {data:{msg:"Você deve estar logado para acessar essa pagina",done:false}, typeHttpResponse:400}
            }
            return {data:{msg:"Logged",done:true}, typeHttpResponse:200}
        })
=======
                if(response === false) return {data:{msg:"Senha incorreta"},typeHttpResponse:400}
//@ts-ignore
                return {data:{token: response.token}, typeHttpResponse:201}
            } catch (error) {
                return {data:{msg:"Error while creating User"+error}, typeHttpResponse:400};
            };
        });
        userController.on("get", "/ola", async function (params:any, body:any) {
            return {data: {msg:"OLÁ"}, typeHttpResponse:200}
        }, middlewareCase)
>>>>>>> origin/main
    }
}