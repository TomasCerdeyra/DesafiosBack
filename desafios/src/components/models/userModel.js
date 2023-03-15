import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const collName= 'user'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
    },
    tokenConfirm: {
        type: String,
        default: null
    },
    cuentaConfirmada: {
        type: Boolean,
        default: false
    }
})

//Hassheo la contrseña
userSchema.pre('save', async function (next) {
    const user = this

    //Si la passwor ya fue modificada(Hasheada) mando el model
    if (!user.isModified('password')) return next()

    //Encripto pasword antes de mandar el model
    try {
        //le digo que quiero 10 letras para la encriptacion
        const salt = await bcrypt.genSalt(10)
        //paso lo que quiero que se hashee
        const hash = await bcrypt.hash(user.password, salt)

        user.password = hash
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Error al codificar la contraseña")
    }
})

//metodo para comparar la contraseña cuando ace login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const ModelUser = mongoose.model(collName, userSchema)

export default ModelUser