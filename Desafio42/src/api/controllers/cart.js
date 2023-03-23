const ContenedorCarritosMongo = require('../../components/repository/CartRepository')
const ContenedorProductosMongo = require('../../components/repository/ProductRepository')

const handleCarts = new ContenedorCarritosMongo()
const handleProducts = new ContenedorProductosMongo()

const createCart = async (req, res) => {
  const result = await handleCarts.createCart()
  res.json(result)
}

const addProductToCart = async (req, res) => {
  const { id: idCarrito, idProducto } = req.params

  const producto = await handleProducts.getById(idProducto)

  if (producto.error) {
    res.json({ error: 'No existe el producto' })
  } else {
    const result = await handleCarts.addProductToCart(idCarrito, producto)
    res.json(result)
  }
}

const buyCart = async (req, res) => {
  const dataToBuy = req.body

  if (!Array.isArray(dataToBuy.cart))
    return res.json({ error: 'No hay productos en el carrito' })

  const result = await handleCarts.buyCart(dataToBuy)
  res.json(result)
}

const deleteCart = async (req, res) => {
  const { id } = req.params

  const result = await handleCarts.deleteCart(id)
  res.json(result)
}

const deleteProductFromCart = async (req, res) => {
  const { id: idCarrito, idProducto } = req.params

  const result = await handleCarts.deleteProductFromCart(idCarrito, idProducto)
  res.json(result)
}

const getAllCarts = async (req, res) => {
  const result = await handleCarts.getAll()

  res.json(result)
}

const getProductsFromCart = async (req, res) => {
  const { id } = req.params

  const result = await handleCarts.getProducts(id)
  res.json(result)
}

module.exports = {
  createCart,
  addProductToCart,
  buyCart,
  deleteCart,
  deleteProductFromCart,
  getAllCarts,
  getProductsFromCart,
}
