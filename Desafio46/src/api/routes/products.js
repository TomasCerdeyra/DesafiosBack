import Router from 'koa-router'
import isAdminMiddleware from '../middleware/isAdminMiddleware.js'

import {
  getProducts,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.js'

const routerProducts = new Router({
    prefix: '/api/productos',
})

/* ---------- GET ------------ */

// Obtener todos los productos o uno por id
routerProducts.get('/:id?', getProducts)

// Obtener productos según su categoría
routerProducts.get('/categoria/:category', getProductsByCategory)

/* ---------- POST ------------ */

// Agregar un producto
routerProducts.post('/', isAdminMiddleware, addProduct)

/* ---------- PUT ------------ */

// Actualizar un producto
routerProducts.put('/:id', isAdminMiddleware, updateProduct)

/* ---------- DELETE ------------ */

// Eliminar un producto
routerProducts.delete('/:id', isAdminMiddleware, deleteProduct)

export default routerProducts