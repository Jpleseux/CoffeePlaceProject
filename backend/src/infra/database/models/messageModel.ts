import messageInterface from "../interface/messagesInterface";
import mongoose, {Schema} from "mongoose";

const messageSchema = new Schema<messageInterface>({
    typeMsg:{
        type:String,
        enum:["normal", "order"],
        required:true
    },
    message:{
        type:String, 
        required:true
    },
    nameSender:{
        type:String,
        required:true
    },
    chat:{
        type:String,
        required:true
    },
    order: {
        type: {
            _id:{
                type:String,
                required: false  
            },
            finalOrderCode:{
                type:String,
                required:true
            },
            isRated:{
                type:Boolean,
                required:true,
                default:false
            },
            product:{
                type:[{}],
                required: false 
            },
            amount:{
                type:Number,
                required: false  
            },
            saller:{
                type:String,
                required:false
            },
            buyer:{
                nameBuyer:{
                    _id:false,
                    type:String,
                    required:false
                },
                addressBuyer:{
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
            }
        },
        required: false  
    }
}, {timestamps:true});
const messageModel = mongoose.model("messageModel", messageSchema)

module.exports = messageModel