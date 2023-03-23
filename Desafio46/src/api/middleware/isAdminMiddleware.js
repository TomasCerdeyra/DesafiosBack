import { loggerWarn } from '../../utils/logger.js'

const isAdminMiddleware = async (ctx, next) => {
  if (ctx.headers.role === 'admin') {
    await next()
  } else {
    loggerWarn.warn(
      `Un usuario sin los permisos suficientes intentó hacer una transacción en la ruta '${ctx.path}' método '${ctx.method}'`
    )
    ctx.status = 403
    ctx.body = {
      error: -1,
      descripcion: `ruta '${ctx.path}' método '${ctx.method}' no autorizada`,
    }
  }
}

export default isAdminMiddleware
