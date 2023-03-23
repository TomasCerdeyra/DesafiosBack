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
        <div data-id='${product.id}' class='cart-row'>
            <img src="${product.foto}" alt="${product.nombre}" width="50px">
            <h5>${product.nombre}</h5>
            <i class="fa-solid fa-trash">
        </div>`
  })

  const deleteBtn = document.querySelectorAll('.fa-trash')

  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const productId = btn.parentElement.getAttribute('data-id')
      const res = await deleteProductFromCart(productId)

      dialog.close()
      if (res.error) return

      btn.parentElement.remove()

      if (cartContainer.children.length === 0)
        cartContainer.innerHTML = 'No hay productos'
    })
  })
})

buyBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  dialog.close()

  Swal.fire({
    icon: 'success',
    title: 'Compra realizada',
    html: 'Te llegará un Whatsapp con el detalle de tu compra',
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

  if (data.message) return []

  if (data.error) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return data
}

async function deleteProductFromCart(productId) {
  const res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
    method: 'DELETE',
  })

  dialog.close()

  const data = await res.json()

  if (data.error) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  Swal.fire({
    icon: 'success',
    title: 'Producto eliminado',
    text: data.message,
    showConfirmButton: false,
    timer: 1500,
  })

  return data
}
