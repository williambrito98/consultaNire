const makeBrowser = require('./factories/makeBrowser')
const { WrongUserKey, ZeroBalance } = require('./errors/captcha')
const makePage = require('./factories/makePage')
const DownloadTimeoutError = require('./errors/browser/DownloadTimeoutError')
const pesquisa = require('./pages/pesquisa')
const captcha = require('./pages/captcha')
const listagemNire = require('./pages/listagemNire')
const { appendFileSync } = require('fs')
const { join } = require('path');
/**
 *
 * @param {{values : Array, __root_dir : string}} data
 * @param {import('../selectors.json')} selectors
 * @param {Function(string)} log
 */
module.exports = async (data, selectors, log) => {
    try {
        let browser, page, lastIndex
        ({ browser } = await makeBrowser())
        try {
            ({ page } = await makePage(browser))
            await page.goto(selectors.site_url, { waitUntil: 'networkidle0' })
            for (const [index, cliente] of Object.entries(data.values)) {
                lastIndex = index
                await pesquisa(page, cliente.CNPJ, selectors)
                await captcha(page, selectors)
                const nires = await listagemNire(page, selectors)
                appendFileSync(join(global.pathSaida, 'nires.csv'), `${cliente.CNPJ};${nires.join('-')}\n`)
            }
            return {
                status: true
            }
        } catch (error) {
            log(error.message)
            if (error instanceof WrongUserKey) {
                return {
                    status: false,
                    continue: false,
                    error: error.message
                }
            }
            if (error instanceof ZeroBalance) {
                return {
                    status: false,
                    continue: false,
                    error: error.message
                }
            }

            if (error instanceof DownloadTimeoutError) {
                return {
                    status: false,
                    continue: true,
                    error: error.message,
                    repeat: true,
                    lastIndex
                }
            }

            return {
                status: false,
                continue: true,
                repeat: true,
                lastIndex,
                error: error?.message
            }
        }
    } catch (error) {
        log('Erro ao inicializar robo')
        return {
            status: false,
            continue: false,
            error: error?.message
        }
    }
}
