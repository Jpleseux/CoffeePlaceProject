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

const corsOptions = {
    origin: "http://localhost:5173", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
  };
  

export default class expressAdapter implements httpServer{
    app:any;
    
    constructor(){
        dotenv.config()
        this.app = express();
        this.app.use(express.json({ limit: "10mb" }));
        this.app.use(cors(corsOptions));
    }; 
    on(method: httpMethods, url: String, callBack: Function, middleware?:any): void {
        if(middleware){
            console.log(method, url, callBack, middleware)
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
                    res.status(422).json({msg:e.message,done:false})

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

   