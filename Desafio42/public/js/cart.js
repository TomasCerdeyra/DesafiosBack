const dialog = document.getElementById('dialog')
const openDialogBtn = document.getElementById('openDialogBtn')
const closeDialogBtn = document.getElementById('closeDialogBtn')
const cartContainer = document.getElementById('cartContainer')
const buyBtn = document.querySelector('.buy-cart')

openDialogBtn.addEventListener('click', async () => {
  dialog.showModal()

  const products = await getProducts(cartId)

  if (products.length === 0)
    return (cartContainer.innerHTML = 'No hay productos')

  cartContainer.innerHTML = ''

  products.forEach((product) => {
    cartContainer.innerHTML += `
        <div data-id='${product._id || product.id}' class='cart-row'>
            <img src="${product.foto}" alt="${product.nombre}" width="50px">
            <h5>${product.nombre}</h5>
            <i class="fa-solid fa-trash">
        </div>`
  })

  const btnForDelete = document.querySelectorAll('.fa-trash')

  btnForDelete.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const productId = btn.parentElement.getAttribute('data-id')
      await deleteProductFromCart(productId)
      dialog.close()

      btn.parentElement.remove()

      if (cartContainer.children.length === 0)
        cartContainer.innerHTML = 'No hay productos'
    })
  })
})

buyBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const userData = JSON.parse(sessionStorage.getItem('personalData'))

  const { personName, email, phone } = userData

  let cartRes = await fetch(`/api/carrito/${cartId}/productos`)
  let cartData = await cartRes.json()

  const res = await fetch('/api/carrito/confirmar-compra', {
    method: 'POST',
    body: JSON.stringify({
      cart: cartData,
      email,
      personName,
      phone,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()

  dialog.close()

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
    title: 'Compra realizada',
    html: `${data.message} <br><br><br> Te llegará un SMS con el detalle de tu compra`,
    showConfirmButton: true,
    timer: 5500,
  })
})

closeDialogBtn.addEventListener('click', () => {
  dialog.close()
  cartContainer.innerHTML = ''
})

async function getProducts(cartId) {
  let res = await fetch(`/api/carrito/${cartId}/productos`)

  let data = await res.json()

  if (data.hasOwnProperty('message')) return []

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  return data
}

async function deleteProductFromCart(productId) {
  let res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
    method: 'DELETE',
  })

  dialog.close()

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
    title: 'Producto eliminado',
    text: data.message,
    showConfirmButton: false,
    timer: 1500,
  })
}
