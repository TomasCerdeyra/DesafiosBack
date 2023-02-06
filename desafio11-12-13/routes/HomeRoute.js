import express from 'express'
import { addProduct, editProductFomr, listHomeAndProducts, editProduct, deleteProduct } from '../controllers/HomeController.js'
import validateURL from '../middlewares/urlValid.js'
import verificarUser from '../middlewares/verificarUser.js'

const routeHome = express.Router()

//Muestro y listo productos
routeHome.get('/', verificarUser, listHomeAndProducts)

//Añadir 
routeHome.post('/', verificarUser, validateURL, addProduct)

//Muestro form para editar
routeHome.get('/editar/:id', verificarUser, editProductFomr)

//Añado el producto editado
routeHome.post('/editar/:id', verificarUser, validateURL, editProduct)

//Eliminar un Producto
routeHome.get('/eliminar/:id', verificarUser, deleteProduct)

export default routeHome