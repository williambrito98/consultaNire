const { existsSync, rmSync, mkdirSync } = require('fs')
const { join } = require('path')

module.exports = (rootDir) => {
    const pathEntrada = join(rootDir, 'entrada')
    const pathTemp = join(rootDir, 'temp')
    const pathSaida = join(rootDir, 'saida')
    if (existsSync(pathEntrada)) {
        //rmSync(pathEntrada, { recursive: true, force: true })
        //mkdirSync(pathEntrada)
    } else {
        mkdirSync(pathEntrada)
    }

    if (existsSync(pathTemp)) {
        //rmSync(pathTemp, { recursive: true, force: true })
        //mkdirSync(pathTemp)
    } else {
        mkdirSync(pathTemp)
    }

    if (existsSync(pathSaida)) {
        //rmSync(pathTemp, { recursive: true, force: true })
        //mkdirSync(pathTemp)
    } else {
        mkdirSync(pathSaida)
    }

    global.pathEntrada = pathEntrada
    global.pathTemp = pathTemp
    global.pathSaida = pathSaida
}
