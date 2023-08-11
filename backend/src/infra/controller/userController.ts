import { Response } from 'express';
import repositoryFactory from "../../application/factory/repositoryFactory";
import Email from "../../domain/entities/Email";
import User from "../../domain/entities/User";
import useCaseFactory from "../factory/useCaseFactory";
import httpServer from "../htttp/httpServer";
import Item from "../../domain/entities/Item";
import verifyToken from "../../application/usecase/verify";
const routerPrefix = "/users"

//@ts-ignore
export default class userController{
    constructor(repositoryFactory: useCaseFactory, userController: httpServer){
        userController.on("post",routerPrefix+"/signup", async function (params:any, body:any) {
            console.log(body)
            try {      
                if(await Item.validateItem(body) === false){
                    return {data:{msg:"Existe um dado invalido cadastre tudo o necesario", done:false}, typeHttpResponse:400};
                }
                const user = await User.create(body.name,body.age,body.email, body.password, body.indentification, body.description, body.field, body.endereco, body.avatar)

                const signUp = await repositoryFactory.createSignUp()
                const verifyIsEmailExist = await repositoryFactory.verifyIsEmailExist()
                if(await verifyIsEmailExist.execute(body.email) === true){
                    return {data:{msg:"This Email already exist",  done:false},typeHttpResponse:400}
                }

                if(user.done ===false){
                    return {data:user, typeHttpResponse:400}
                }
                await signUp.execute(user.user);
                
                return {data:{msg:"Creation success",  done:true}, typeHttpResponse:201}
            } catch (error) {
                return {data:{msg:"Error while creating User"+error,  done:false}, typeHttpResponse:400};
            };
        });
        userController.on("post",routerPrefix+"/login", async function (params:any, body:any) {
            try {
                const Input = {email:body.email, password: body.password}
                if(await Item.validateItem(Input) === false){
                    return {data:{msg:"Login invalid, email and password is required", done:false}, typeHttpResponse:400};
                }
                const verifyIsEmailExist = await repositoryFactory.verifyIsEmailExist()
                if(await verifyIsEmailExist.execute(body.email) === false){
                    return {data:{msg:"This account doesn't exist, create an account!!!", done:false},typeHttpResponse:400}
                } 

                const login = await repositoryFactory.createLogin()
                const response = await login.execute(Input);
                if(response === false) return {data:{msg:"Senha incorreta", done:false},typeHttpResponse:400}
//@ts-ignore
                return {data:{msg:"successfully logged in",token: response.token,user:response.user, done:true}, typeHttpResponse:201}
            } catch (error) {
                return {data:{msg:"Error in auth  "+error, done:false}, typeHttpResponse:400};
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
        userController.on("get", routerPrefix+"/getuser/:email", async function (params:any, body:any) {
            try {
                const email = params.email;
                const getUser= await repositoryFactory.getUser();
    
                const data = await getUser.execute(email);
    
                if(data.done === false) return {data: {msg: "Invalid request", done:false}, typeHttpResponse:400}

                return {data:{msg:"success",done:true, user:data}, typeHttpResponse:200}
            } catch (error) {
                return {data:{msg:"bad request",done:false}, typeHttpResponse:400}
            }
        })
    }
}
