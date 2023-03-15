import mongoose from "mongoose";
import { Schema } from "mongoose";

const collName = 'msj'

const msjSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const ModelChat = mongoose.model(collName, msjSchema)

export default ModelChat