import {model , Schema, Types} from 'mongoose'

const OrderSchema = new Schema({
    totalAmount:{
        type:String,
    },
    event:{
        type:Types.ObjectId,
        ref:"Event"

    },
    buyer:{
        type:Types.ObjectId,
        ref:"User"
    }
})


export default model("Order",OrderSchema)