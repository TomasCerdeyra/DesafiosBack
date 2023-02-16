import express from 'express'
import { create } from 'express-handlebars'
import connectionMongo from './dataBase/MongoDB.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import ModelUser from './models/userModel.js';
import flash from 'connect-flash'
import { args } from './config/minimit.js';
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

connectionMongo();

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

//INFO PROCESS
const trabajo = process.execPath
const idProcess = process.pid
const version = process.version
const plataforma = process.platform
const memoriaRss = process.memoryUsage().rss
const carpeta = process.cwd()

//Rutas
app.use('/', routeHome)
app.use('/chat', routeChat)
app.use('/', routeLogin)

//INFO RPOCESS
import compression from 'compression';
app.get('/info', (req, res) => {
    res.send(`Trabajo: ${trabajo}<br>IdProcess: ${idProcess}<br>Version: ${version}<br>Plataforma: ${plataforma}<br>MemoriaRss: ${memoriaRss}<br>Carpeta: ${carpeta}<br>Peso sin compresion: 170B<br>Procesos Cluster: 16<br>Procesos Fork: 1 `);
    
})
app.get('/infoGzip', compression(), (req, res) => {
    res.send(`Trabajo: ${trabajo}<br>IdProcess: ${idProcess}<br>Version: ${version}<br>Plataforma: ${plataforma}<br>MemoriaRss: ${memoriaRss}<br>Carpeta: ${carpeta}<br>Peso con compresion: 17B<br>Procesos Cluster: 16<br>Procesos Fork: 1 `);
    
})

//Route nums random
import randomNumbers from './utils/randomNums.js';
app.get('/api/randoms', (req, res) => {
    const { query } = req.query
    res.json(`numeros randoms: ${randomNumbers(query)}`)
})

const PORT = parseInt(process.argv[2]) || args.puerto
app.listen(PORT, () => {
    console.log('Escuchando 8080');
})