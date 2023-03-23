const cartContainer = document.getElementById('cart-container')
const getProductsForm = document.getElementById('get-products-form')
const deleteCartForm = document.getElementById('delete-cart-form')

let currentCart

getProductsForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  getProducts(e.target.cartId.value)
})

deleteCartForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const cartId = e.target.deleteId.value

  const query = `
    mutation {
      deleteCart(id: ${cartId}) {
        message
        error
        id
      }
    }
  `

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const res = await response.json()

  const { deleteCart: data } = res.data

  renderCarts(await getCarts())

  if (data.message)
    return Swal.fire({
      icon: 'success',
      title: 'Éxito!',
      text: data.message,
      showConfirmButton: false,
      timer: 1500,
    })

  if (data.error)
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })
})

async function getProducts(cartId) {
  const query = `
    query {
      getProducts(id: ${cartId}) {
        error
        message
        id
        productos {
          id
          nombre
          descripcion
          codigo
          foto
          precio
          stock
          timestamp
        }
      }
    }
  `

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const res = await response.json()

  const { getProducts: data } = res.data

  if (data.message)
    return Swal.fire({
      icon: 'warning',
      title: 'Atención!',
      text: data.message,
      showConfirmButton: false,
      timer: 1500,
    })

  if (data.error)
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  currentCart = data.productos

  const getProductsContainer = document.getElementById('get-products-container')

  getProductsContainer.innerHTML = ''

  data.productos.forEach((product) => {
    const productCard = document.createElement('tr')
    productCard.innerHTML = `
            <td>${product.id}</td>
            <td>${product.nombre}</td>
            <td>${product.codigo}</td>
            <td>${product.precio}</td>
            <td>${product.stock}</td>
            <td><img src="${product.foto}" alt="${product.nombre}" width="100px"></td>
            <td>${product.timestamp}</td>
            <td>${product.descripcion}</td>
        `
    getProductsContainer.appendChild(productCard)
  })

  getProductsForm.reset()
}

async function getCarts() {
  try {
    const query = `
      query {
        getAllCarts {
          id
          timestamp
          productos {
            id
          }
        }
      }
    `

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const res = await response.json()

    return res.data.getAllCarts
  } catch (error) {
    console.log(error)
  }
}

function renderCarts(carts) {
  cartContainer.innerHTML = ''

  carts.forEach((cart) => {
    cartContainer.innerHTML += `
          <tr>
            <td>${cart.id}</td>
            <td>${cart.timestamp}</td>
            <td>${cart.productos.length}</td>
          </tr>
        `
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
