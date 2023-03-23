const express = require('express')

const {
  createCart,
  addProductToCart,
  buyCart,
  deleteCart,
  deleteProductFromCart,
  getAllCarts,
  getProductsFromCart,
} = require('../controllers/cart')

const { Router } = express
const routerCarritos = Router()

/* ---------- GET ------------ */

// Obtener todos los carritos
routerCarritos.get('/', getAllCarts)

// Obtener un carrito por id
routerCarritos.get('/:id/productos', getProductsFromCart)

/* ---------- POST ------------ */

// Crear un carrito
routerCarritos.post('/', createCart)

// Agregar un producto al carrito
routerCarritos.post('/:id/productos/:idProducto', addProductToCart)

// Confirmación de compra de carrito
routerCarritos.post('/confirmar-compra', buyCart)

/* ---------- Delete ---------- */

// Eliminar un carrito entero
routerCarritos.delete('/:id', deleteCart)

// Eliminar un producto del carrito
routerCarritos.delete('/:id/productos/:idProducto', deleteProductFromCart)

module.exports = routerCarritos
