import mongoose, { Schema } from "mongoose";
import orderInterface from "../interface/orderInterface";
const orderSchema = new Schema<orderInterface>({
    product:{
        type:[{}],
        required:true
    },
    amount:{
        type:Number,
        required:true
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
    isFinished:{
        type:Boolean,
        required:true,
        default:false
    },  
    saller:{
        type:String,
        required:true
    },
    buyer:{
        nameBuyer:{
            _id:false,
            type:String,
            required:true
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
})

const orderModel = mongoose.model("orderModel", orderSchema);
module.exports = orderModel; 