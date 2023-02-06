import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectionMongo = ()=> {
    const URL = process.env.URI
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('connect ok');
    })
    .catch((err) => {
        console.log(err);
    })
}

export default connectionMongo