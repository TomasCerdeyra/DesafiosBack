import express from 'express'
import { body } from 'express-validator'
import { login, loginEnter, logoutSession, register, registerAdd } from '../controllers/loginController.js'

const routeLogin = express.Router()
//REGISTER
routeLogin.get('/register', register)

routeLogin.post('/register',
    [
        body("userName", "Ingrese un nombre valido").trim().notEmpty().escape(),
        body("email", "Ingrese un email valiodo").trim().isEmail().normalizeEmail(),
        body("password", "Contraseña minimo de 6 caracteres").trim().isLength({ min: 6 }).escape(),
    ],
    registerAdd
)
//LOGIN
routeLogin.get('/login', login)

routeLogin.post('/login',
    [
        body("email", "Ingrese un email valido").trim().isEmail().normalizeEmail(),
        body("password", "Contraseña de minimo 6 caracteres").trim().isLength({ min: 6 }).escape()
    ],
    loginEnter
)

/* //CONFIRM
routeLogin.get('/confirm/:token', confirmUser)

routeLogin.post('/confirm/:token', confirmToken) */

routeLogin.get('/logout', logoutSession)
export default routeLogin