const Product = require('../dao/Product')
const Cart = require('../dao/Cart')

const handleProducts = Product.getInstance()
const handleCart = Cart.getInstance()

const schema = require('../graphql/schema')

const { loggerError } = require('../utils/logger')

const graphQlQuery = {
  schema: schema,
  rootValue: {
    getById,
    getAll,
    save,
    updateById,
    deleteById,
    getProducts,
    getAllCarts,
    createCart,
    addProductToCart,
    deleteProductFromCart,
    deleteCart,
  },
  graphiql: true,
}

async function getById({ id }) {
  try {
    return handleProducts.getById(id)
  } catch (error) {
    loggerError.error(error)
  }
}

async function getAll() {
  try {
    return await handleProducts.getAll()
  } catch (error) {
    loggerError.error(error)
  }
}

async function save({ datos }) {
  try {
    const result = await handleProducts.save(datos)
    return {
      message: result.message || '',
      error: result.error || '',
      id: '',
    }
  } catch (error) {
    loggerError.error(error)
  }
}

async function updateById({ id, datos }) {
  try {
    const result = await handleProducts.updateById(id, datos)
    return {
      message: result.message || '',
      error: result.error || '',
      id: id,
    }
  } catch (error) {
    loggerError.error(error)
  }
}

async function deleteById({ id }) {
  try {
    const result = await handleProducts.deleteById(id)
    return {
      message: result.message || '',
      error: result.error || '',
      id: id,
    }
  } catch (error) {
    loggerError.error(error)
  }
}

async function getProducts({ id }) {
  try {
    const res = await handleCart.getProducts(id)

    return {
      id: id,
      productos: res || [],
      message: res.message || '',
      error: res.error || '',
    }
  } catch (error) {
    loggerError.error(error)
  }
}

async function getAllCarts() {
  try {
    return await handleCart.getAll()
  } catch (error) {
    loggerError.error(error)
  }
}

async function createCart() {
  try {
    const res = await handleCart.createCart()
    return res
  } catch (error) {
    loggerError.error(error)
  }
}

async function addProductToCart({ id, idProducto }) {
  try {
    const product = await handleProducts.getById(idProducto)
    const res = await handleCart.addProductToCart(id, product)
    return {
      id: id,
      message: res.message || '',
      error: res.error || '',
    }
  } catch (error) {
    loggerError.error(error)
  }
}

async function deleteProductFromCart({ id, productId }) {
  try {
    const res = await handleCart.deleteProductFromCart(id, productId)

    return {
      id: id,
      message: res.message || '',
      error: res.error || '',
    }
  } catch (error) {
    loggerError.error(error)
  }
}

async function deleteCart({ id }) {
  try {
    const res = await handleCart.deleteCart(id)

    return {
      id: id,
      message: res.message || '',
      error: res.error || '',
    }
  } catch (error) {
    loggerError.error(error)
  }
}

module.exports = graphQlQuery
