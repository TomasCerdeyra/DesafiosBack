import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const collName = 'products' 

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price:{ 
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        //Con Schema.Types.ObjectId, puedo traer el Id referido ("User")
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const ModelProduct = mongoose.model(collName, productSchema)

export default ModelProduct