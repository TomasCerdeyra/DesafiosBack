import ProductRepository from '../../dao/Product.js'

const handleProducts = new ProductRepository()

const getProducts = async (ctx) => {
  const { id } = ctx.request.query

  if (id) {
    const result = await handleProducts.getById(id)
    ctx.body = result
  } else {
    const productos = await handleProducts.getAll()
    ctx.body = productos
  }
}

const getProductsByCategory = async (ctx) => {
  const { category } = ctx.params

  const result = await handleProducts.getByCategory(category)

  ctx.body = result
}

const addProduct = async (ctx) => {
  const product = ctx.request.body

  const { nombre, descripcion, codigo, foto, precio, stock } = ctx.request.body

  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
    ctx.throw(400, 'Faltan datos')
  }

  const result = await handleProducts.save(product)

  ctx.status = 201
  ctx.body = result
}

const updateProduct = async (ctx) => {
  const { id } = ctx.params

  const { nombre, descripcion, codigo, foto, precio, stock } = ctx.request.body

  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
    ctx.throw(400, 'Faltan datos')
  }

  const result = await handleProducts.updateById(id, ctx.request.body)

  ctx.body = result
}

const deleteProduct = async (ctx) => {
  const { id } = ctx.params

  const result = await handleProducts.deleteById(id)

  ctx.body = result
}

export {
  getProducts,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
}
