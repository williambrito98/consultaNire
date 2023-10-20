const { solution, submit } = require('./normal')
const { join } = require('path')
/**
 *
 * @param page {import('puppeteer-core').Page}
 * @returns
 */
async function resolve(page, imgSelector) {
    const pathImgCaptcha = join(global.pathTemp, 'captcha.png')
    const imageCaptcha = await page.$(imgSelector)
    await imageCaptcha.screenshot({
        path: pathImgCaptcha,
        type: 'png'
    })
    const submitResponse = await submit(pathImgCaptcha)
    const solutionResponse = await solution(submitResponse.request)
    return solutionResponse.request
}

module.exports = resolve
