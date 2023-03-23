const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

require('dotenv').config()

const config = {
    port: 8080,
    mongoDB: {
        host: process.env.DB_URL_MONGO || 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    },
    sessionConfig: {

        store: MongoStore.create({
            mongoUrl: process.env.DB_URL_MONGO,
            mongoOptions: advancedOptions
        }),

        secret: 'secreto',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            httpOnly: false,
            secure: false,
            // 10 minutos
            maxAge: 600000
        }
    }
}

module.exports = config;