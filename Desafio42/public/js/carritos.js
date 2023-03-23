const cartContainer = document.getElementById('cart-container')
const createCartBtn = document.getElementById('create-cart-btn')
const deleteCartForm = document.getElementById('delete-cart-form')
const getProductsForm = document.getElementById('get-products-form')
const addProductForm = document.getElementById('add-product-form')
const deleteProductForm = document.getElementById('delete-product-form')
const deleteAllCartId = document.getElementById('deleteAllCartId')

let currentCart

getProductsForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  getProducts(e.target.cartId.value)
})

async function getProducts(cartId) {
  let res = await fetch(`/api/carrito/${cartId}/productos`)

  let data = await res.json()

  if (data.hasOwnProperty('message'))
    return Swal.fire({
      icon: 'warning',
      title: 'Atención!',
      text: data.message,
      showConfirmButton: false,
      timer: 1500,
    })

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  currentCart = data

  const getProductsContainer = document.getElementById('get-products-container')

  getProductsContainer.innerHTML = ''

  data.forEach((product) => {
    const productCard = document.createElement('tr')
    productCard.innerHTML = `
            <td>${product._id || product.id}</td>
            <td>${product.nombre}</td>
            <td>${product.codigo}</td>
            <td>${product.precio}</td>
            <td>${product.stock}</td>
            <td><img src="${product.foto}" alt="${
      product.nombre
    }" width="100px"></td>
            <td>${product.timestamp}</td>
            <td>${product.descripcion}</td>
        `
    getProductsContainer.appendChild(productCard)
  })

  getProductsForm.reset()
}

async function getCarts() {
  try {
    const response = await fetch('/api/carrito/')
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

function renderCarts(carts) {
  carts.forEach((cart) => {
    const cartCard = document.createElement('tr')
    cartCard.innerHTML = `
            <td>${cart.id || cart._id}</td>
            <td>${cart.timestamp}</td>
            <td>${cart.productos.length}</td>
        `

    cartContainer.appendChild(cartCard)
  })
}

async function init() {
  try {
    const carts = await getCarts()
    renderCarts(carts)
  } catch (error) {
    console.log(error)
  }
}

init()