const { join } = require('path');
/**
 *
 * @param page {import('puppeteer-core').Page}
 * @param selectors {import('../../selectors.json')}
 */
module.exports = async (page, selectors) => {
    const trs = await page.$$(selectors.listagem_nire.trs)
    const nires = []
    for (const [index, tr] of Object.entries(trs)) {
        if (index == 0) continue;
        const nire = await tr.$eval('td > a', element => element.textContent.trim())
        nires.push(nire)
    }

    return nires
}
