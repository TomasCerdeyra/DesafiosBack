const socket = io()


function addProduct(){

    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        url: document.getElementById("url").value
    }

    socket.emit('new-product', producto)
    return
}


socket.on('productos', data => {
    
}) 

