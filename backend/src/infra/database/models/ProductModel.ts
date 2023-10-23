import productInterface from "../interface/productInterface";
import mongoose, { Schema } from "mongoose";
const productSchema = new Schema<productInterface>({
    nameProduct:{
        type:String,
        required:true
    },
    imageProduct:{
        type:String,
        required:true
    },
    descriptionProduct:{
        type:String,
        required:true
    },
    validateProduct:{
        type:Date,
        required:true
    },
    avaliationAmount:{
        type:Number,
        required:false,
        default:0
    },
    productAvaliation:{
        type:Number,
        required:false,
        default:0
    },
    productValue:{
        type:Number,
        required:true
    },
    idCategory:{
        type:Schema.Types.ObjectId,
        ref:"CategoryModel",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    idBuyer:{
        type:Schema.Types.ObjectId,
        ref:"UserModel",
        required:false
    },
    nameSalesman:{
        type:String,
        required:true
    }, 
    isRecomended:{
        type:Boolean,
        required:false,
        default:false
    }
}, {timestamps:true})
const ProductModel = mongoose.model("ProductModel", productSchema)

module.exports = ProductModel