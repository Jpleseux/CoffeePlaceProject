import { Document } from "mongoose";

export default interface userInterface extends Document{
<<<<<<< HEAD
    name:{
        type:string,
        required:true
    },
    age:{
        type:number,
        required:true
    },
=======
>>>>>>> origin/main
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String, 
        required:true
    }
<<<<<<< HEAD
    indentification:{
        type:Object,
=======
    cpf:{
        type:String,
>>>>>>> origin/main
        required:true
    },
    description:{
        type:String,
        required:true
    },
    custonField:{
        isAdmin:{
            type:boolean,
            required:true
        }
    },
    endereco:[{
        cidade:{
            type:String,
            required:false
        },
        estado:{
            type:String,
            required:false
        },
        rua:{
            type:String,
            required:false
        },
        bairro:{
            type:String,
            required:false
        },
        cep:{
            type:String,
            required:false
        }
    }]
}