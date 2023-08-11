import tokenGenerate from "../../domain/entities/TokenGenerator";

export default class verify{
    constructor(){
    }
    async execute(token:string):Promise<any>{
        const tokenGenerater = new tokenGenerate(process.env.SECRET);
        const output = tokenGenerater.verify(token);
        return output
    }
}

  