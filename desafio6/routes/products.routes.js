import express from "express"
import { productos } from "../server.js"

const productRoute = express.Router()


productRoute.get('/', (req, res) =>{
    res.render('inicio', {productos})
})

/* productRoute.post('/productos', (req, res) =>{
    productos.push(req.body)
    console.log(req.body);
    res.redirect('/')
})
 */
export{productRoute}