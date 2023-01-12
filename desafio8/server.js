// Server setup
import express from 'express'
import { Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import { engine } from 'express-handlebars'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))


import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// dataBase
import Mensajes from './DB/mensajes.js'
import Productos from './DB/productos.js'
import optionsMaria from './DB/options/mariadb.js'
import optionsSqlite from './DB/options/sqlite.js'
const mensajes = new Mensajes(optionsSqlite)
const productos = new Productos(optionsMaria)


app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/views/layouts"
}))
app.set('views', './views')
app.set('view engine', 'hbs')

// Request handlers
app.get('/', (req, res) => {
    res.render('main.hbs')
})
app.post('/productos', async (req, res) => {
    try {
        const userInput = {...req.body, thumbnail: curateUrl(req.body.thumbnail)}
        const added = await productos.insertar(userInput)
        if(!added) throw new Error('Unable to add product')
        const allProds = await productos.getAll()
        io.sockets.emit('productList', allProds)
        res.redirect('/')
    } catch (err) {
        res.status(500).json({error: err})
    }
})
const curateUrl = (url) => {
    if(url.includes('//')) return url
    return `//${url}`
}

// Socket handlers
io.on('connection', async socket => {
    console.log(`User connected with socket id: ${socket.id}`)
    const allProds = await productos.getAll()
    socket.emit('productList', allProds)
    const msjs = await mensajes.getAll()
    socket.emit('messageBoard', msjs)
    socket.on('userMessage', async (msg) => {
        const timeStamp = new Date(Date.now())
        let timeString = `[${timeStamp.toLocaleDateString()} ${timeStamp.toTimeString()}`
        let cutoffIndex = timeString.indexOf("G")-1
        let formatedTimeStamp = timeString.slice(0, cutoffIndex) + "]"
        let msgData = { ...msg, date: formatedTimeStamp }
        await mensajes.insertar(msgData)
        io.sockets.emit('newMessage', msgData)
    })
})

const PORT = process.env.PORT || 8080

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (err) => {
    console.error(`Server error: ${err}`)
})