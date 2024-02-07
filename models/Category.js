import {model , Schema} from 'mongoose'

const CategorySchema = new Schema({
    name:{
        type:String,
        required:[true,'please provide event category']
    }
})


export default model("Category",CategorySchema)