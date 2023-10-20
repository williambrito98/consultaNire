/**
 *
 * @param page {import('puppeteer-core').Page}
 * @param selectors {import('../../selectors.json')}
 * @param cnpj {string}
 */
module.exports = async (page, cnpj, selectors) => {
    await page.evaluate((selectorInputBusca) => {
        document.querySelector(selectorInputBusca).value = ''
    }, selectors.input_busca)
    await page.type(selectors.input_busca, cnpj)
    await page.click(selectors.btn_busca)
    await page.waitForNetworkIdle({ timeout: 10000 }).catch(e => '')
}
