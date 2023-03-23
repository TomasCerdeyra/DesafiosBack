/* Testeo de mi API por cliente HTTP */

const API_URL = 'http://localhost:8080'

/* Productos */

//Obtener todos los productos
axios.get(`${API_URL}/api/productos`).then((res) => console.log(res.data))

//Obtener un producto por id
axios
  .get(`${API_URL}/api/productos/63c5d52b167dce8a9b0ff9b4`)
  .then((res) => console.log(res.data))

//Crear un producto, en el header se envia el 'role' para que el middleware lo valide
const body = {
  nombre: 'Producto creado desde cliente HTTP',
  descripcion: 'Descripcion del producto creado desde cliente HTTP',
  codigo: 7654443,
  foto: 'https://picsum.photos/200/300',
  precio: 400,
  stock: 23,
}

axios
  .post(`${API_URL}/api/productos`, body, {
    headers: {
      role: 'admin',
    },
  })
  .then((res) => console.log(res.data))

//Actualizar un producto, en el header se envia el 'role' para que el middleware lo valide
const bodyActualizado = {
  nombre: 'Producto actualizado desde cliente HTTP',
  descripcion: 'Una descripcion actualizada',
  codigo: 22333,
  foto: 'https://picsum.photos/201/301',
  precio: 6000,
  stock: 1,
}

axios
  .put(`${API_URL}/api/productos/63e1605734f26f7f38eae9b6`, bodyActualizado, {
    headers: {
      role: 'admin',
    },
  })
  .then((res) => console.log(res.data))

//Eliminar un producto, en el header se envia el 'role' para que el middleware lo valide
axios
  .delete(`${API_URL}/api/productos/63e15d0ab52b4332c75b937e`, {
    headers: {
      role: 'admin',
    },
  })
  .then((res) => console.log(res.data))
