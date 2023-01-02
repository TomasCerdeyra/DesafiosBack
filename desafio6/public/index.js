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


socket.on('message', data => {
    const html = data.map( msj => {
        return `
        <tr>
            <td>${msj.mail}</td>
            <td>${msj.hora}</td>
            <td>${msj.mensaje}</td>
        </tr>
        `
    })

    document.getElementById("table").innerHTML = html
})

