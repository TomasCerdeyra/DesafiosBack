const uniqid = require('uniqid')
const { loggerError, loggerBuy } = require('../../../utils/logger')
const handleSubmitMail = require('../../../utils/mailOptions')

class ContenedorCarritosFirebase {
  constructor(db) {
    this.db = db
  }

  async getProducts(id) {
    try {

      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      return carritosArray.find((cart) => cart.id === id)
    } catch (error) {
      loggerError.error(error)
    }
  }

  async createCart() {
    try {
      const carritos = this.db.collection('carritos')

      const id = uniqid()

      await carritos.add({
        id: id,
        timestamp: Date.now(),
        productos: [],
      })

      return id
    } catch (error) {
      loggerError.error(error)
    }
  }

  async addProductToCart(id, product) {
    try {
      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      const carrito = carritosArray.find((elemento) => elemento.id == id)

      if (!carrito) return { error: 'carrito no encontrado' }

      const carritoId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      const productos = carrito.productos

      productos.push(product)

      await carritos.doc(carritoId).update({ productos: productos })

      return {
        message: `Se agregó correctamente el producto ID: ${product.id} al carrito`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async buyCart(buyInfo) {
    try {
      const { cart, email, personName } = buyInfo

      const productsName = cart.map((element) => element.nombre)
      const totalPrice = cart.reduce((acc, element) => acc + element.precio, 0)

      const mailOptions = {
        from: 'Servidor Ecommerce',
        to: process.env.EMAIL,
        subject: `Nuevo pedido recibido de ${personName}`,
        html: `
                    <h1>Nueva compra!</h1>
                    <p>Se compraron los siguientes productos</p>
                    <ul>
                        ${productsName
                          .map((element) => `<li>${element}</li>`)
                          .join('')}
                    </ul>
                    <p>Por un total de: $${totalPrice}</p>
                    <p>El pedido es a nombre de ${personName}</p>
                    <p>El email de contacto es: ${email}</p>
                    `,
      }

      const whatsappMsg = `Nueva compra!\n\nSe compraron los siguientes productos:\n${productsName
        .map((element) => `◆ ${element}`)
        .join(
          '\n'
        )}\n\nPor un total de: $${totalPrice}\n\nEl pedido es a nombre de ${personName} y su email es ${email}`

      handleSubmitMail(mailOptions)
      handleSubmitWhatsapp(whatsappMsg)

      loggerBuy.trace(
        `Se compraron los productos: ${productsName.join(
          ', '
        )} por un total de: $${totalPrice}`
      )

      return {
        message: `Se compraron los productos: ${productsName.join(
          ', '
        )} por un total de: $${totalPrice}`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteProductFromCart(id, productId) {
    try {
      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      const carrito = carritosArray.find((elemento) => elemento.id == id)

      if (!carrito) return { error: 'carrito no encontrado' }

      const carritoId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      const productos = carrito.productos

      const producto = productos.find((elemento) => elemento.id == productId)

      if (!producto) return { error: 'Ese producto no está en el carrito' }

      const productosFiltrados = productos.filter(
        (elemento) => elemento.id != productId
      )

      await carritos.doc(carritoId).update({ productos: productosFiltrados })

      return {
        message: `Se eliminó correctamente el producto ID: ${productId} del carrito`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteCart(id) {
    try {
      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      const carrito = carritosArray.find((elemento) => elemento.id == id)

      if (!carrito) return { error: 'carrito no encontrado' }

      const carritoId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      await carritos.doc(carritoId).delete()

      return { message: `Se eliminó correctamente el carrito!` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      return carritosArray
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = ContenedorCarritosFirebase
