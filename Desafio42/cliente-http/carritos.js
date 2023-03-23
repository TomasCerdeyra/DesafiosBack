/* Carritos */

// Obtener todos los carritos
axios.get(`${API_URL}/api/carrito`).then((res) => console.log(res.data))

// Obtener un carrito por id
axios
  .get(`${API_URL}/api/carrito/63cf197d42714b7d59e1e4c3/productos`)
  .then((res) => console.log(res.data))

// Crear un nuevo carrito
axios.post(`${API_URL}/api/carrito`).then((res) => console.log(res.data))

// Agregar un producto al carrito
axios
  .post(
    `${API_URL}/api/carrito/63cf197d42714b7d59e1e4c3/productos/63e15d0ab52b4332c75b937e`
  )
  .then((res) => console.log(res.data))

// Eliminar un carrito entero
axios
  .delete(`${API_URL}/api/carrito/63cf197d42714b7d59e1e4c3`)
  .then((res) => console.log(res.data))

// Eliminar un producto del carrito
axios
  .delete(
    `${API_URL}/api/carrito/63cf197d42714b7d59e1e4c3/productos/63e15d0ab52b4332c75b937e`
  )
  .then((res) => console.log(res.data))
