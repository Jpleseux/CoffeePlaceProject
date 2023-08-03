import { verify, sign } from "jsonwebtoken";
import User from "./User";

export default class tokenGenerate{
    constructor(readonly key:any){
<<<<<<< HEAD
=======
        console.log(this.key)
>>>>>>> origin/main
    }
    EXPIRES_IN = "4h"
    sign(user:User){
        return sign({
            email:user.email, expiresIn: this.EXPIRES_IN
        }, this.key)
    }
    verify(token:string){
        return verify(token, this.key)
    }
}