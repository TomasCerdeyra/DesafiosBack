const productsContainer = document.getElementById('products-container')
const createProductForm = document.getElementById('create-product-form')
const updateProductForm = document.getElementById('update-product-form')
const deleteProductForm = document.getElementById('delete-product-form')
const deleteId = document.getElementById('deleteId')

createProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const query = `mutation ($data: ProductoInput!) {
    save(datos: $data) {
      id
      message
      error
    }
  }`

  const variables = {
    data: {
      nombre: e.target.prodName.value,
      descripcion: e.target.description.value,
      codigo: e.target.code.value,
      foto: e.target.photo.value,
      precio: parseInt(e.target.price.value),
      stock: parseInt(e.target.stock.value),
    },
  }

  let res = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const result = await res.json()

  const { save: confirm } = result.data

  if (confirm.error) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: confirm.error,
    })
  }

  Swal.fire({
    icon: 'success',
    title: 'Carga exitosa',
    text: confirm.message,
    showConfirmButton: false,
    timer: 1500,
  })

  createProductForm.reset()
  productsContainer.innerHTML = ''
  init()
})

updateProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const productId = e.target.id.value

  const variables = {
    id: productId,
    data: {
      nombre: e.target.updateName.value,
      descripcion: e.target.updateDescription.value,
      codigo: e.target.updateCode.value,
      foto: e.target.updatePhoto.value,
      precio: parseInt(e.target.updatePrice.value),
      stock: parseInt(e.target.updateStock.value),
    },
  }

  const query = `mutation ($id: ID!, $data: ProductoInput!) {
    updateById(id: $id, datos: $data) {
      id
      message
      error
    }
  }`

  let res = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const result = await res.json()

  const { updateById: confirm } = result.data

  if (confirm.error)
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: confirm.error,
      showConfirmButton: false,
      timer: 1500,
    })

  updateProductForm.reset()
  productsContainer.innerHTML = ''

  Swal.fire({
    icon: 'success',
    title: 'Actualización exitosa',
    text: confirm.message,
    showConfirmButton: false,
    timer: 1500,
  })

  init()
})

deleteProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const productID = e.target.deleteId.value

  const query = `
    mutation {
      deleteById(id: ${productID}) {
        message
        id
        error
      }
    }
  `

  const res = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const result = await res.json()

  const { deleteById: data } = result.data

  if (data.error)
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  deleteProductForm.reset()
  productsContainer.innerHTML = ''

  Swal.fire({
    icon: 'success',
    title: 'Eliminación exitosa',
    text: data.message,
    showConfirmButton: false,
    timer: 1500,
  })

  init()
})

deleteId.addEventListener('click', () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  Toast.fire({
    icon: 'warning',
    title: 'Cuidado, esto borrará el producto',
  })
})

async function init() {
  try {
    const products = await getProducts()
    renderProducts(products)
  } catch (error) {
    console.log(error)
  }
}

init()

async function getProducts() {
  try {
    const query = `
    query {
      getAll {
        id
        descripcion
        nombre
        codigo
        foto
        precio
        stock
        timestamp
      }
    }`

    const res = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    const result = await res.json()

    const { getAll: products } = result.data

    return products
  } catch (error) {
    console.log(error)
  }
}

function renderProducts(products) {
  products.forEach((product) => {
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
    productsContainer.appendChild(productCard)
  })
}
