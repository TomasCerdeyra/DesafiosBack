const mongoose = require('mongoose')
const { ProductosModel } = require('../../model/productosModel')
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

class ProductMongo {
  async getById(id) {
    try {
      return await ProductosModel.findById(id)
    } catch (error) {
      return { error: 'Producto no encontrado' }
    }
  }

  async save(product) {
    try {
      product.timestamp = Date.now()

      const newProduct = new ProductosModel(product)

      await newProduct.save()

      return { message: `Producto ${product.nombre} guardado!` }
    } catch (err) {
      return { error: 'Producto no guardado, faltan datos' }
    }
  }

  async updateById(id, newData) {
    try {
      const products = await this.getAll()
      const product = products.find((prod) => prod.id == id)

      if (!product) return { error: 'Producto no encontrado' }

      await ProductosModel.updateOne({ _id: id }, newData)

      return { message: `Producto id: ${id} actualizado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll()
      const product = products.find((prod) => prod.id == id)

      if (!product) return { error: 'Producto no encontrado' }

      await ProductosModel.deleteOne({ _id: id })

      return { message: `Producto id: ${id} eliminado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      return await ProductosModel.find()
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = ProductMongo
