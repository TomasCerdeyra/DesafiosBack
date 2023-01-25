const mongoose = require('mongoose');
const { mongoConfig } = require('../config/config');
const { MensajesModel } = require('../model/msgModel');

const { loggerError } = require('../utils/logger');

const normalizeMsgs = require('../utils/normalizr');

mongoose.connect(mongoConfig.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log(err);
});

class ContenedorMensajes {

    async save(msj) {
        try {
            const newMsg = new MensajesModel(msj);
            await newMsg.save();

            return { message: "Se guardó correctamente el mensaje" };
        } catch (err) {
            loggerError.error(err);
        }
    }

    async getAll() {
        try {
            const mensajes = await MensajesModel.find();

            return normalizeMsgs(mensajes);
        } catch (error) {
            loggerError.error(error);
        }
    }
}

module.exports = ContenedorMensajes;