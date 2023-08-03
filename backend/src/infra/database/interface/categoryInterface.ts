import { Document } from "mongoose";

export default interface categoryInterface extends Document{
    nameCategory:String,
    descriptionCategory:String
}