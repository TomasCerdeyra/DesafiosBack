const express = require('express');
const { Router } = express
const compression = require('compression')

const { logger } = require('../utils/logger')

const args = require('yargs/yargs')(process.argv.slice(2)).argv

const routerInfo = Router()

routerInfo.get('/info', compression(), (req, res) => {

    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`)

    res.send({
        argumentos: args,
        sistemaOperativo: process.platform,
        numeroDeProcesadores: require('os').cpus().length,
        versionNode: process.version,
        usoDeMemoria: process.memoryUsage().rss,
        pathDeEjecucion: process.execPath,
        processId: process.pid,
        carpetaDelProyecto: process.cwd()
    })
})

module.exports = routerInfo