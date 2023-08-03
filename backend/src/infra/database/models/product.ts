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
    valorProduct:{
        type:Number,
        required:true
    }
})

