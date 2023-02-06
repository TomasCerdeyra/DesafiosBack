import express from 'express'
import { create } from 'express-handlebars'
import connectionMongo from './dataBase/MongoDB.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import ModelUser from './models/userModel.js';
import flash from 'connect-flash'
//Routes
import routeHome from './routes/HomeRoute.js';
import routeChat from './routes/ChatRoute.js';
import routeLogin from './routes/LoginRoute.js';
//config __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

connectionMongo()

//confi session
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URI
    }),
    secret: process.env.CLAVE,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 900000
    }
}))

app.use(flash())

//confi passport
passport.use(new LocalStrategy({
    passReqToCallback: true
}, async (email, password, done) => {
    try {
        const user = await ModelUser.findOne({ email: email })
        console.log(email);
        if (user) done('el usuario ya esta conectado')
    } catch (error) {
        done(error)
    }
}));

passport.serializeUser((user, done) => {
    done(null, { id: user._id, email: user.email })
})

passport.deserializeUser(async (user, done) => {
    const userDB = await ModelUser.findById(user.id)
    return done(null, { id: userDB._id, email: userDB.email })
})

app.use(passport.initialize())
app.use(passport.session())

//config handlebasr
const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"]
})
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

//Middleware
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

//Paso variable mensajes como local
app.use((req, res, next) => {
    res.locals.mensajes = req.flash("mensajes")
    next()
})

//Rutas
app.use('/', routeHome)
app.use('/chat', routeChat)
app.use('/', routeLogin)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Escuchando 8080');
})