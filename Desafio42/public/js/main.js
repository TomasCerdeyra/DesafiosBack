const productsContainer = document.getElementById('products-container')

let cartId = localStorage.getItem('cartId')
let btnArr = document.querySelectorAll('.add-cart-btn') || []

function renderProducts(products) {
  products.forEach((product) => {
    const { nombre, precio, descripcion, foto, stock } = product

    const id = product._id || product.id

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
  let res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
    method: 'POST',
  })

  const data = await res.json()

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: data.message,
    showConfirmButton: false,
    timer: 1500,
  })
}

async function init() {
  if (!cartId) {
    let res = await fetch('/api/carrito', {
      method: 'POST',
    })

    let data = await res.json()

    cartId = data.id
    localStorage.setItem('cartId', cartId)
  }

  const response = await fetch('/api/productos/')
  const products = await response.json()

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
