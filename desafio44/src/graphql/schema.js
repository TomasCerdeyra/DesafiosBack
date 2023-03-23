const { buildSchema } = require('graphql')

const schema = buildSchema(`
type Producto {
  id: ID!
  timestamp: Float
  nombre: String!
  descripcion: String!
  codigo: String!
  foto: String!
  precio: Int!
  stock: Int!
  message: String!
  error: String!
}

type Cart {
  id: Int
  timestamp: Float
  productos: [Producto]
  message: String!
  error: String!
}

input ProductoInput {
  nombre: String!
  descripcion: String!
  codigo: String!
  foto: String!
  precio: Int!
  stock: Int!
}

type Query {
  getById(id: ID!): Producto
  getAll: [Producto]
  getProducts(id: Int!): Cart
  getAllCarts: [Cart]
}

type Mutation {
  save(datos: ProductoInput): Producto
  updateById(id: ID!, datos: ProductoInput): Producto
  deleteById(id: ID!): Producto
  createCart: Cart
  addProductToCart(id: Int!, idProducto: Int!): Cart
  deleteProductFromCart(id: Int!, productId: Int!): Cart
  deleteCart(id: Int!): Cart
}
`)

module.exports = schema
