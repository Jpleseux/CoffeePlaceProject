import notificationInterface from "../interface/notificationInterface";
import mongoose, {Schema} from "mongoose";

const notificationSchema = new Schema<notificationInterface>({
    msgNotification:{
        type:String,
        required:true
    },
    isNewNotification:{
        type:Boolean,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    chat:{
        type:String,
        required:false
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
})
const notificationModel = mongoose.model("notificationModel", notificationSchema);
module.exports = notificationModel;