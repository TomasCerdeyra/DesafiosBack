const spanName = document.getElementById('span-name')
const smallEmail = document.getElementById('small-email')
const logoAvatar = document.getElementById('logo-avatar')

let checkOutEmail = ''

async function getData() {
  try {
    const res = await fetch('/get-data')

    if (res.status === 401) return false

    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

async function logout() {
  sessionStorage.removeItem('personalData')

  Swal.fire({
    icon: 'success',
    title: `Te desloguaste correctamente ${checkOutEmail}`,
    showConfirmButton: false,
    timer: 2000,
  })

  setInterval(() => {
    window.location.href = '/logout'
  }, 2000)
}

;(async function start() {
  const dataIfLogged = await getData()

  if (!dataIfLogged) return (window.location.href = '/')

  sessionStorage.setItem('personalData', JSON.stringify(dataIfLogged))

  const { personName, email, avatar } = dataIfLogged

  spanName.innerText = personName
  smallEmail.innerText = email
  logoAvatar.src = avatar

  checkOutEmail = email
})()
