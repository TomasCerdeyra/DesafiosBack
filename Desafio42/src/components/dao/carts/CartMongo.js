const mongoose = require('mongoose')
const { CarritosModel } = require('../../model/carritosModel')
const { loggerError } = require('../../../utils/logger')

mongoose.connect(
  process.env.DB_URL_MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) loggerError.error(err)
  }
)

class CartMongo {
  async getProducts(id) {
    try {
      return await CarritosModel.findOne({ _id: id })
    } catch (err) {
      return { error: 'carrito no encontrado' }
    }
  }

  async createCart() {
    try {
      const cart = new CarritosModel({
        timestamp: Date.now(),
        productos: [],
      })

      const result = await cart.save()

      return result._id.toString()
    } catch (err) {
      loggerError.error(err)
    }
  }

  async addProductToCart(id, product) {
    try {
      const cart = await CarritosModel.findOne({ _id: id })

      if (!cart) return { error: 'Carrito no encontrado!' }

      cart.productos.push(product)

      await cart.save()

      return {
        message: `Se agregó el producto: '${product.nombre}' al carrito`,
      }
    } catch (err) {
      return { error: 'Carrito no encontrado!' }
    }
  }

  async deleteProductFromCart(id, productId) {
    try {
      const cart = await CarritosModel.findOne({ _id: id })

      if (!cart) return { error: 'Carrito no encontrado!' }

      const product = cart.productos.find(
        (element) => element._id.toString() === productId
      )

      if (!product)
        return { error: `Ese producto no se encuentra en el carrito ID: ${id}` }

      const filteredArray = cart.productos.filter(
        (element) => element._id.toString() !== productId
      )

      cart.productos = filteredArray

      await cart.save()

      return {
        message: `Se eliminó el producto: '${product.nombre}' del carrito`,
      }
    } catch (err) {
      return { error: 'Carrito no encontrado!' }
    }
  }

  async deleteCart(id) {
    try {
      const cart = await CarritosModel.findOne({ _id: id })

      if (!cart) return { error: 'carrito no encontrado' }

      await CarritosModel.deleteOne({ _id: id })

      return { message: `Se eliminó el carrito ID: ${id}` }
    } catch (err) {
      return { error: 'carrito no encontrado' }
    }
  }

  async getAll() {
    try {
      return await CarritosModel.find()
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = CartMongo
