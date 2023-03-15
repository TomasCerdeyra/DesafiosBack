import pino from 'pino'

const logger = pino('errors.log', {
    Option: {
        ignore: 'hostname'
    }
})

export default logger