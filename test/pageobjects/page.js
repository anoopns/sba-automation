
module.exports = class Page {

    async open (path) {
        return await browser.url(path);
    }
}
