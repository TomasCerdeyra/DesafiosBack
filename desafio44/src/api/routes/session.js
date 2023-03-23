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

const routerSessions = Router()

// Ruta principal
routerSessions.get('/', redirectMiddleware, mainRoute)

// Login
routerSessions.post('/login', loginRoute)

// Registro
routerSessions.post('/register', registerRoute)

// Deslogueo
routerSessions.get('/logout', logoutRoute)

// Obtener el nombre
routerSessions.get('/get-data', isLoggedMiddleware, getNameRoute)

module.exports = routerSessions
