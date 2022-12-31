import express from "express"
import { productRoute } from "./routes/products.routes.js";
import { Server } from "socket.io";

const app = express();

app.use(express.urlencoded ({extended: true}))
app.use(express.json())

app.set("views", "./views");
app.set('view engine', 'ejs')

app.use('/', productRoute)

const server = app.listen(8080, () =>{console.log("corriendo");})

const io = new Server(server)

//Exportar esto a routes
export const productos = [{
    nombre: "hola", precio: 300, url:"www.com"
} ]

io.on('connection', socket=>{
    console.log('nuevlo conectado');

    socket.emit('productos', productos)

    socket.on('new-product', data =>{
        productos.push(data)

        io.sockets.emit('productos', productos)
    })
})