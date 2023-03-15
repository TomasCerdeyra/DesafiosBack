import ModelUser from "../../components/models/userModel.js";
import { validationResult } from "express-validator";
import { nanoid } from 'nanoid'
import logger from "../../utils/logger.js";

//REGISTER
const register = (req, res) => {
    res.render('register')
}

const registerAdd = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("mensajes", errors.array())
        return res.redirect('/register')
    }

    const { userName, email, password } = req.body
    try {
        const user = await ModelUser.findOne({email: email})
        //Verifico que no existe el mail
        if(user) throw new Error('Ya existe el usuario')
        //..Proxima act: mandar token de confirmacion

        //
        const token = nanoid()
        await ModelUser.create({ userName, email, password, tokenConfirm: token })
        logger.info('Un usuario nuevo se registro /regsiter')
        res.redirect(`/login`)
    } catch (error) {
        logger.error('error al logear un usuario /register')
        req.flash("mensajes", [{msg: error.message}])
        res.redirect('/register')
    }
}

//LOGIN
const login = (req, res) => {
    res.render('login')
}

const loginEnter = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("mensajes", errors.array())
        return res.redirect('/login')
    }

    const {email, password} = req.body
    try {
        const user = await ModelUser.findOne({email: email})
        //verifico que el mail exista
        if (!user) throw new Error('El usuario con este mail no existe')
        //prox act: verificar si confirmo la cuenta

        //
        
        if (!(await user.comparePassword(password))) throw new Error('Contraseña incorrecta')
        req.login(user, function (error) {
            if (error) throw new Error('Error al crear la sesion')
            logger.info('Un usuario se logeo: /login')
            return res.redirect('/')
        })
    } catch (error) {
        logger.error('error al logear un usuario /login')
        req.flash("mensajes", [{msg: error.message}])
        res.redirect('/login')
    }
}

//CONFIRM COUNT

/* const confirmUser = async (req, res) => {
    const { token } = req.params
    try {
        res.render('confirm', {token: token})
    } catch (error) {

    }

}

const confirmToken = async (req, res) => {
    const token = req.body
    try {
        const user = await ModelUser.findOne(token)
        if (!user) throw new Error('No existe este usuario')

        user.tokenConfirm = null
        user.cuentaConfirmada = true

        await user.save()

        res.redirect(`/login`)
    } catch (error) {
        console.log({error: error.message});
    }
} */

//cerrar session
const logoutSession = (req, res) => {
    req.logout((err) => {
        if (err) return next(err)
    })
    logger.info('Un usuario se deslogeo /login')
    return res.redirect('/login')
}

export {
    register,
    registerAdd,
    login,
    loginEnter,
    logoutSession
    /* confirmUser,
    confirmToken */
}