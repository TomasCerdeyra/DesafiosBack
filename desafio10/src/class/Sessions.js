const mongoose = require('mongoose');

const { mongoConfig } = require('../config/config');
const { SessModel } = require('../model/sessModel');
const { createHash } = require('../utils/handlePass');

const { loggerError } = require('../utils/logger');

mongoose.connect(mongoConfig.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) loggerError.error(err);
});

class ContenedorSesiones {

    async findUser(user) {
        try {
            const userFound = await SessModel.findOne({ email: user });
            return userFound;
        } catch (err) {
            loggerError.error(err);
        }
    }

    async createUser(user) {
        try {
            const isValidUser = await SessModel.findOne({ email: user.email });

            if (isValidUser) {
                loggerError.error("El usuario ya existe");
                return { err: "El usuario ya existe" }
            } else {
                user.password = createHash(user.password);
                const newUser = new SessModel(user);
                await newUser.save();
                return newUser;
            }
        } catch (err) {
            loggerError.error(err);
        }
    }
}

module.exports = ContenedorSesiones;

