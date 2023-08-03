import tokenGenerate from "../../domain/entities/TokenGenerator";

<<<<<<< HEAD
export default class verifyToken{
=======
export default class verify{
>>>>>>> origin/main
    constructor(){
    }
    async execute(token:string):Promise<any>{
        const tokenGenerater = new tokenGenerate(process.env.SECRET);
        const output = tokenGenerater.verify(token);
<<<<<<< HEAD
=======
        console.log(output)
>>>>>>> origin/main
        return output
    }
}