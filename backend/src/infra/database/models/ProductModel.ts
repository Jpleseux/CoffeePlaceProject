import productInterface from "../interface/productInterface";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema<productInterface>({
    nameProduct:{
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
    productAvaliation:{
        type:Number,
        required:false
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
    idBuyer:{
        type:Schema.Types.ObjectId,
        ref:"UserModel",
        required:false
    },
    idSalesman:{
        type:Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    isRecomended:{
        type:Boolean,
        required:false
    }
})
const ProductModel = mongoose.model("ProductModel", productSchema)

module.exports = ProductModel