import { loggerError } from '../utils/logger.js'

let instance = null

class Product {
  constructor() {
    this.products = [
      {
        id: 1,
        timestamp: 1676322832455,
        nombre: 'Mouse Logitech',
        descripcion: 'Mouse ultra DPI Logitech',
        codigo: 3312,
        foto: 'https://picsum.photos/212',
        precio: 500,
        categoria: "Tecnologia",
        stock: 24,
      },
      {
        id: 2,
        timestamp: 1676344832455,
        nombre: 'Teclado Razer',
        descripcion: 'Teclado ultra DPI Razer',
        codigo: 3313,
        foto: 'https://picsum.photos/213',
        precio: 1000,
        categoria: "Tecnologia",
        stock: 12,
      },
      {
        id: 3,
        timestamp: 1676344832467,
        nombre: 'Monitor Samsung',
        descripcion: 'Monitor 4k Samsung',
        codigo: 3314,
        foto: 'https://picsum.photos/214',
        precio: 2000,
        categoria: "Monitores",
        stock: 6,
      },
    ]
  }

  async getById(id) {
    try {
      const targetProduct = this.products.find((prod) => prod.id == id)

      if (!targetProduct) return { error: 'producto no encontrado' }

      return targetProduct
    } catch (error) {
      loggerError.error(error)
    }
  }

  async save(product) {
    try {
      const maxId = this.products.reduce((acc, prod) => {
        if (prod.id > acc) {
          acc = prod.id
        }
        return acc
      }, 0)

      const newProduct = {
        id: maxId + 1,
        timestamp: Date.now(),
        ...product,
      }

      this.products.push(newProduct)

      return {
        message: `Producto ${newProduct.nombre} guardado con el id ${newProduct.id}`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async updateById(id, newData) {
    try {
      const targetProduct = this.products.find((prod) => prod.id == id)

      if (!targetProduct) return { error: 'Producto no encontrado' }

      const updatedProduct = {
        ...targetProduct,
        ...newData,
      }

      const targetProductIndex = this.products.findIndex(
        (prod) => prod.id == id
      )

      this.products[targetProductIndex] = updatedProduct

      return { message: `Producto id: ${id} actualizado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteById(id) {
    try {
      const targetProduct = this.products.find((prod) => prod.id == id)

      if (!targetProduct) return { error: 'Producto no encontrado' }

      const targetProductIndex = this.products.findIndex(
        (prod) => prod.id == id
      )

      this.products.splice(targetProductIndex, 1)

      return { message: `Producto id: ${id} eliminado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      return this.products
    } catch (error) {
      loggerError.error(error)
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new Product()
    }

    return instance
  }
}

export default Product
