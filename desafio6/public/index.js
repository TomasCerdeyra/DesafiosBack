const socket = io()

function addProduct(){
    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        url: document.getElementById("url").value
    }

    socket.emit('new-productos', producto)
}


socket.on('productos', data => {
    alert(data)
    socket.emit('noti', 'mi mensaje llego')
}) 

const date = new Date()

function addMessage(){
    const mensaje = {
        mail: document.getElementById("mail").value,
        hora: date.toLocaleString() ,
        mensaje: document.getElementById("mensaje").value
    }

    socket.emit('new-message', mensaje)
}
