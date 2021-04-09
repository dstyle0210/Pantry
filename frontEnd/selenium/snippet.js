var webdriver = require("selenium-webdriver"),By = webdriver.By,until = webdriver.until;
var fs = require('fs')

// Input capabilities
var capabilities = {
    'browserName' : 'Chrome',
    'browser_version' : '66.0',
    'os' : 'Windows',
    'os_version' : '10',
    'resolution' : '1024x768',
    'browserstack.user' : 'abc',
    'browserstack.key' : '123'
}

var driver = new webdriver.Builder().forBrowser("chrome").build();


webdriver.WebDriver.prototype.saveScreenshot = filename => {
    return driver.takeScreenshot().then(data =>  {
        fs.writeFile(`${__dirname}/photo/${filename}`, data.replace(/^data:image\/png;base64,/,''), 'base64', err => {
            if(err) throw err
        })
    })
}

async function main(url,name) {
    var now = (Date.now()/1e3)|0
    await driver.get(url);
    var title = await driver.getTitle()

    var totalHeight = await driver.executeScript('return document.body.offsetHeight')
    var windowHeight = 600; // driver.executeScript('return window.outerHeight')

    for (var i = 0; i <= (totalHeight/windowHeight); i++) {
        console.log("idx::"+i);
        await driver.executeScript(`window.scrollTo(0, 600*${i})`)
        await driver.saveScreenshot(name+`-${i}-${now}.png`);
    }
    console.log('done')
    return true;
}

(async function(){
    await main('https://www.gongyoungshop.kr/main.do',"메인");
    await main('https://www.gongyoungshop.kr/tvshopping/selectTvShopping.do',"TV쇼핑");
    await driver.quit();
})();

