const { loggerWarn } = require('../../utils/logger');

const isAdminMiddleware = (req, res, next) => {
    if (req.headers.role === 'admin') {
        next();
    } else {
        loggerWarn.warn(`Un usuario sin los permisos suficientes intentó hacer una transacción en la ruta '${req.path}' método '${req.method}'`);
        res.send({ error: -1, descripcion: `ruta '${req.path}' método '${req.method}' no autorizada` });
    }
}

module.exports = isAdminMiddleware;