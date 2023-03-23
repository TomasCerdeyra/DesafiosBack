const express = require('express')
const { Router } = express
const {
  mainRoute,
  loginRoute,
  registerRoute,
  logoutRoute,
  getNameRoute,
} = require('../controllers/session')

const redirectMiddleware = require('../middlewares/redirectMiddleware')
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware')

const routerSesions = Router()

// Ruta principal
routerSesions.get('/', redirectMiddleware, mainRoute)

// Login
routerSesions.post('/login', loginRoute)

// Registro
routerSesions.post('/register', registerRoute)

// Deslogueo
routerSesions.get('/logout', logoutRoute)

// Obtener el nombre
routerSesions.get('/get-data', isLoggedMiddleware, getNameRoute)

module.exports = routerSesions
