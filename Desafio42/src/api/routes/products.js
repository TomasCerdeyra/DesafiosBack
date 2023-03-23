const express = require('express')
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products')

const { Router } = express
const routerProductos = Router()

/* ---------- GET ------------ */

// Obtener todos los productos o uno por id
routerProductos.get('/:id?', getProducts)

/* ---------- POST ------------ */

// Agregar un producto
routerProductos.post('/', isAdminMiddleware, addProduct)

/* ---------- PUT ------------ */

// Actualizar un producto
routerProductos.put('/:id', isAdminMiddleware, updateProduct)

/* ---------- DELETE ------------ */

// Eliminar un producto
routerProductos.delete('/:id', isAdminMiddleware, deleteProduct)

module.exports = routerProductos
