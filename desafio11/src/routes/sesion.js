const express = require('express');
const { Router } = express
const { loggerError } = require('../utils/logger');
const passport = require('passport');

const authMiddleware = require('../middlewares/auth')

const routerSesions = Router()


// Ruta principal
routerSesions.get('/', authMiddleware, async (req, res) => {
    req.session.nameAccess = req.user.email
    res.redirect('/pages/products.html')
})

// Ruta de login
routerSesions.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/pages/login-error.html',
    passReqToCallback: true
})
)

// Ruta de registro
routerSesions.post('/register', passport.authenticate('singup', {
    successRedirect: '/',
    failureRedirect: '/pages/register-error.html',
    passReqToCallback: true
})
)

// Deslogueo
routerSesions.get('/logout', (req, res, next) => {

    req.logout(function (err) {

        if (err) {
            loggerError.error(err)
            return next(err)
        };

        req.session.destroy()
        res.redirect("/");
    });
})

// Obtener el nombre

routerSesions.get('/get-name', async (req, res) => {

    res.send({ nameAccess: req.session.nameAccess })
})

module.exports = routerSesions