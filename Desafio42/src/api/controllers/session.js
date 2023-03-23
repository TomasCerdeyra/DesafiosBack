const { loggerError } = require('../../utils/logger')
const passport = require('passport')

const mainRoute = async (req, res) => {
  req.session.email = req.user.email
  req.session.avatar = req.user.avatar
  req.session.personName = req.user.personName
  req.session.phone = req.user.phone

  res.redirect('/pages/ecommerce.html')
}

const loginRoute = passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/pages/login-error.html',
  passReqToCallback: true,
})

const registerRoute = passport.authenticate('singup', {
  successRedirect: '/',
  failureRedirect: '/pages/register-error.html',
  passReqToCallback: true,
})

const logoutRoute = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      loggerError.error(err)
      return next(err)
    }

    req.session.destroy()
    res.redirect('/')
  })
}

const getNameRoute = async (req, res) => {
  res.send({
    email: req.session.email,
    avatar: req.session.avatar,
    personName: req.session.personName,
    phone: req.session.phone,
  })
}

module.exports = {
  mainRoute,
  loginRoute,
  registerRoute,
  logoutRoute,
  getNameRoute,
}
