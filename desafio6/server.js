const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.set("views", "./public/views");
app.set('view engine', 'ejs')

app.use(express.static('./public'))

httpServer.listen(8080, ()=> console.log('server en 8080'))

//<----------------------------------------------------------------------------------->//
const productos = [{nombre: 'auto', precio: 333, url: 'wewe'}]
const mensajes = [{mail: 'www.com', hora: '10/02 30:40', mensaje: 'hola'}]

app.get('/', (req, res) => {
    res.render('inicio', { productos, mensajes })
})

io.on('connection', (socket) => {
    console.log('usuario conectado');

    /* Envio de productos*/
    socket.on('new-productos', data =>{
        productos.push(data)
    })

    /* Envio de mensajes */ 
    socket.on('new-message', data =>{
        mensajes.push(data)

        io.sockets.emit('message', mensajes)
    })
})