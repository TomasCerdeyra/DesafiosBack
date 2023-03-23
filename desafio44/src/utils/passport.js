const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const SessionRepository = require('../dao/Sessions')

const { loggerError } = require('./logger')
const { isValidPassword } = require('./handlePass')

const handleSession = new SessionRepository()

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await handleSession.findUser(email)

        if (!user) return done(null, false)

        if (!isValidPassword(user, password)) return done(null, false)

        return done(null, user)
      } catch (err) {
        loggerError.error(err)
        return done(err)
      }
    }
  )
)

passport.use(
  'singup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { personName, adress, age, phone, avatar } = req.body

        const user = await handleSession.createUser({
          email,
          password,
          personName,
          adress,
          age,
          phone,
          avatar,
        })

        if (user.err) return done(null, false)

        return done(null, user)
      } catch (err) {
        loggerError.error(err)
        return done(err)
      }
    }
  )
)

// Serialize
passport.serializeUser((email, done) => {
  done(null, email)
})

// Deserialize
passport.deserializeUser((email, done) => {
  done(null, email)
})

module.exports = passport
