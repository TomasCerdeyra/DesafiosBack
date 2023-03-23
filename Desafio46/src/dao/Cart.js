import { loggerError } from '../utils/logger.js'

let instance = null

class Cart {
  constructor() {
    this.db = []
  }

  async getProducts(id) {
    try {
      const targetCart = this.db.find((cart) => cart.id == id)

      if (!targetCart) return { error: 'Carrito no encontrado!' }

      if (targetCart.productos.length == 0)
        return { message: `El carrito ID: ${id} no tiene productos todavía` }

      return targetCart.productos
    } catch (error) {
      loggerError.error(error)
    }
  }

  async createCart() {
    try {
      const listOfId = this.db.map((cart) => cart.id)
      const maxId = listOfId.reduce((acc, id) => {
        if (id > acc) {
          acc = id
        }
        return acc
      }, 0)

      const newCart = {
        id: maxId + 1,
        timestamp: Date.now(),
        productos: [],
      }

      this.db.push(newCart)

      return {
        message: `Se creó correctamente el carrito!`,
        id: newCart.id,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async addProductToCart(id, product) {
    try {
      const targetCart = this.db.find((cart) => cart.id == id)

      if (!targetCart) return { error: 'Carrito no encontrado' }

      const products = targetCart.productos
      products.push(product)

      return {
        message: `Se agregó el producto: '${product.nombre}' al carrito`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteProductFromCart(id, productId) {
    try {
      const targetCart = this.db.find((cart) => cart.id == id)

      if (!targetCart) return { error: 'Carrito no encontrado!' }

      const products = targetCart.productos

      const targetProduct = products.find((prod) => prod.id == productId)

      if (!targetProduct)
        return { error: `Ese producto no se encuentra en el carrito ID: ${id}` }

      const filteredProducts = products.filter((prod) => prod.id != productId)

      targetCart.productos = filteredProducts

      return {
        message: `Se eliminó el producto: '${targetProduct.nombre}' del carrito`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteCart(id) {
    try {
      const targetCart = this.db.find((cart) => cart.id == id)

      if (!targetCart) return { error: 'Carrito no encontrado' }

      const targetCartIndex = this.db.findIndex((cart) => cart.id == id)

      this.db.splice(targetCartIndex, 1)

      return { message: `Se eliminó el carrito ID: ${id}` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      return this.db
    } catch (error) {
      loggerError.error(error)
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new Cart()
    }
    return instance
  }
}

export default Cart
