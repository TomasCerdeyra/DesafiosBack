import CartRepository from '../../dao/Cart.js'
import ProductRepository from '../../dao/Product.js'

const handleCarts = new CartRepository()
const handleProducts = new ProductRepository()

const createCart = async (ctx) => {
  const result = await handleCarts.createCart()
  ctx.body = result
}

const addProductToCart = async (ctx) => {
  const { id: cartId, productId } = ctx.params

  const product = await handleProducts.getById(productId)

  if (product.error) {
    ctx.body = { error: 'No existe el producto' }
  } else {
    const result = await handleCarts.addProductToCart(cartId, product)
    ctx.body = result
  }
}

const buyCart = async (ctx) => {
  const dataToBuy = ctx.request.body

  if (!Array.isArray(dataToBuy.cart))
    return (ctx.body = { error: 'No hay productos en el carrito' })

  const result = await handleCarts.buyCart(dataToBuy)
  ctx.body = result
}

const deleteCart = async (ctx) => {
  const { id } = ctx.params

  const result = await handleCarts.deleteCart(id)
  ctx.body = result
}

const deleteProductFromCart = async (ctx) => {
  const { id: cartId, productId } = ctx.params

  const result = await handleCarts.deleteProductFromCart(cartId, productId)
  ctx.body = result
}

const getAllCarts = async (ctx) => {
  const result = await handleCarts.getAll()

  ctx.body = result
}

const getProductsFromCart = async (ctx) => {
  const { id } = ctx.params

  const result = await handleCarts.getProducts(id)
  ctx.body = result
}

export {
  createCart,
  addProductToCart,
  buyCart,
  deleteCart,
  deleteProductFromCart,
  getAllCarts,
  getProductsFromCart,
}
