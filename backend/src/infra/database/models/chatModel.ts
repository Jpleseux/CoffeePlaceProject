import chatInterface from "../interface/chatInterface"
import mongoose, {Schema} from "mongoose"

const chatSchema = new Schema<chatInterface>({
    _id:{
        type:String,
        required:true
    },
    typeChat:{
        type:String,
        enum:["normal", "order"],
        required:true
    },
    chatMembers:[
        {nameUser:String, role:{
            type:String,
            enum:["buyer", "salesman"],
            required:false
        },_id:false}
    ]
})
const chatModel = mongoose.model("chatModel", chatSchema);

module.exports = chatModel;