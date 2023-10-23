import mongoose,{ Schema } from "mongoose";
import userInterface from "../interface/userInterface";

const userSchema = new Schema<userInterface>({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    isPremium:{
        type:Boolean,
        required:true,
        default:false
    },
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
    indentification:{
        type:Object,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false
    },
    field:{
        isAdmin:{
            type:Boolean,
            required:false
        },
        isSalesman:{
            type:Boolean,
            required:false
        },
        isBuyer:{
            type:Boolean,
            required:false
        }
    },
    endereco:{
        _id:false,
        city:{
            type:String,
            required:false
        },
        state:{
            type:String,
            required:false
        },
        street:{
            type:String,
            required:false
        },
        neighborhood:{
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
