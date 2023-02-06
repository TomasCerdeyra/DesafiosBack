//Verifico si existe un usuarion activo en la session
const verificarUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

export default verificarUser