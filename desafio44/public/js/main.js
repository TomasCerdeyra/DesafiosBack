const productsContainer = document.getElementById('products-container')

let cartId = localStorage.getItem('cartId')
let btnArr = document.querySelectorAll('.add-cart-btn') || []

function renderProducts(products) {
  productsContainer.innerHTML = ''

  products.forEach((product) => {
    const { nombre, precio, descripcion, foto, stock, id } = product

    productsContainer.innerHTML += `
        <div class="card">
        <div class="card__body">
          <div class="half">
            <div class="featured_text">
              <h3>${nombre}</h3>
              <p class="price">$${precio}</p>
            </div>
            <div class="image">
              <img src="${foto}" alt="">
            </div>
          </div>
          <div class="half">
            <div class="description">
              <p>${descripcion}</p>
            </div>
            <span class="stock"><i class="fa fa-pen"></i> In stock - ${stock} u.</span>
          </div>
        </div>
        <div class="card__footer">
          <div class="action">
          <button type="button" id="${id}" class="add-cart-btn">Agregar a carrito</button>
          </div>
        </div>
      </div>
        `
  })
}

async function addProductToCart(productId) {
  const query = `
    mutation {
      addProductToCart(id: ${cartId}, idProducto: ${productId}) {
        message
        error
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

  const { addProductToCart: data } = res.data

  if (data.error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      text: data.message,
      showConfirmButton: false,
      timer: 1500,
    })
  }
}

async function init() {
  if (!cartId) {
    const query = `
      mutation {
        createCart {
          message
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

    const { createCart: data } = res.data

    cartId = data.id
    localStorage.setItem('cartId', cartId)
  } else {
    const query = `
      query {
        getProducts(id: ${cartId}) {
          error
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

    if (data.error) {
      localStorage.removeItem('cartId')
      cartId = null
      init()
    }
  }

  const query = `
    query {
      getAll {
        id
        descripcion
        nombre
        foto
        precio
        stock
      }
    }
  `

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

  const result = await response.json()

  const { getAll: products } = result.data

  renderProducts(products)

  btnArr = document.querySelectorAll('.add-cart-btn')

  btnArr.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.id
      addProductToCart(productId)
    })
  })
}

init()
