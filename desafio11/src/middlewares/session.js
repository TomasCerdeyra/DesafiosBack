const { loggerError } = require('../utils/logger');

const sessionMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        loggerError.error("Hubo un acceso no autorizado");
        res.status(401).send({ status: 404, message: 'No estas autorizado' })
    }
}

module.exports = sessionMiddleware