import httpServer from "./httpServer";
import express, {NextFunction, Request, Response}  from "express";
import cors from "cors"
import dotenv from "dotenv"
enum httpMethods{
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
}

export default class expressAdapter implements httpServer{
    app:any;
 
    constructor(){
        dotenv.config()
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
<<<<<<< HEAD
    };  
    on(method: httpMethods, url: String, callBack: Function, middleware?:any): void {
        if(middleware){
=======
    }; 
    on(method: httpMethods, url: String, callBack: Function, middleware?:any): void {
        if(middleware){
            console.log(method, url, callBack, middleware)
>>>>>>> origin/main
            this.app[method](url,middleware, async function (req:Request, res:Response) {
                try {
                    const output = await callBack(req.params, req.body, req.headers);
                    res.status(output.typeHttpResponse).json(output.data)
                } catch (e:any) {
                    res.status(422).json({msg:"Error:"+e.message})
                };
            });
        }else{
            this.app[method](url, async function (req:Request, res:Response) {
                try {
                    const output = await callBack(req.params, req.body, req.headers);
                    res.status(output.typeHttpResponse).json(output.data)
                } catch (e:any) {
<<<<<<< HEAD
                    res.status(422).json({msg:e.message,done:false})
=======
                    res.status(422).json({msg:"Error:"+e.message})
>>>>>>> origin/main
                };
            });
        }
    }

    listen(port: Number): void {
        this.app.listen(port, ()=>{
            console.log(`Server is runing on port ${port}`)
        });
    };
};