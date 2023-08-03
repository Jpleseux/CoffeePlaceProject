import mongoose,{ Schema } from "mongoose";
import userInterface from "../interface/userInterface";

const userSchema = new Schema<userInterface>({
<<<<<<< HEAD
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
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
    },
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
            type:Boolean,
            required:true
        }
    },
    endereco:{
        _id:false,
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
    }
}, {timestamps:true});

const userModel = mongoose.model("UserModel", userSchema)

module.exports = userModel
