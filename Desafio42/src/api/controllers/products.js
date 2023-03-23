const ContenedorProductosMongo = require('../../components/repository/ProductRepository')
const contenedor = new ContenedorProductosMongo()

const getProducts = async (req, res) => {
  const { id } = req.params

  if (id) {
    const result = await contenedor.getById(id)
    res.json(result)
  } else {
    const productos = await contenedor.getAll()
    res.json(productos)
  }
}

const addProduct = async (req, res) => {
  const producto = req.body

  const { nombre, descripcion, codigo, foto, precio, stock } = req.body

  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
    return res.status(400).json({
      error: 'Faltan datos',
    })
  }

  const result = await contenedor.save(producto)
  res.status(201).json(result)
}

const updateProduct = async (req, res) => {
  const { id } = req.params

  const { nombre, descripcion, codigo, foto, precio, stock } = req.body

  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
    return res.status(400).json({
      error: 'Faltan datos',
    })
  }

  const result = await contenedor.updateById(id, req.body)

  res.json(result)
}

const deleteProduct = async (req, res) => {
  const { id } = req.params

  const result = await contenedor.deleteById(id)

  res.json(result)
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
}
