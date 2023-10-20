const resolve = require('../utils/captcha/resolve')

/**
 *
 * @param page {import('puppeteer-core').Page}
 * @param selectors {import('../../selectors.json')}
 */
module.exports = async (page, selectors) => {
    const imgCaptcha = await page.$(selectors.img_captcha)
    if (!imgCaptcha) return true
    const captchaResolved = await resolve(page, selectors.img_captcha)
    await page.type(selectors.input_text_captcha, captchaResolved)
    await page.click(selectors.btn_continuar_captcha)
    await page.waitForNetworkIdle({ timeout: 10000 }).catch(e => '')
}
