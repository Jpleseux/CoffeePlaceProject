import mongoose, {Schema} from "mongoose";
import categoryInterface from "../interface/categoryInterface";
const categorySchema = new Schema<categoryInterface>({
    nameCategory:{
        type:String,
        required:true
    },
    descriptionCategory:{
        type:String,
        required:true
    }
},{timestamps:true})

const categoryModel = mongoose.model("CategoryModel", categorySchema)

module.exports = categoryModel 