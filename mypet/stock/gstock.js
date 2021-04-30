var webdriver = require("selenium-webdriver"),By = webdriver.By,until = webdriver.until;
var fs = require('fs');
var _ = require("lodash");
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
var stocks = [];
async function getStockNo(sNo){
    var url = `https://finance.naver.com/sise/entryJongmok.nhn?&page=${sNo}`;
    await driver.get(url);
    var datas = await driver.executeScript(function(){
        var datas = [];
        var ctgs = document.querySelectorAll(".ctg a");
        for(i=0;i<ctgs.length;i++){
            datas[i] = ctgs[i].href;
        }
        return datas;
    });
    return datas;
};

async function getStockNo2(){
    var url = `https://nextnormalone.tistory.com/77`;
    await driver.get(url);
    var datas = await driver.executeScript(function(){
        var datas = [];
        $("[data-ke-style=style15] tr").each(function(){
            datas.push( $(this).find("td:eq(2) p").text() );
        });
        datas.shift();
        return datas;
    });
    return datas;
};

let count = 0;
async function start(){
    console.log(count);
    if(count<21){
        count++;
        var stocksList = await getStockNo(count);
        stocks = stocks.concat(stocksList);
        start(); // 재귀
    }else{
        var kqData = await getStockNo2();
        console.log(kqData.length);
        stocks = stocks.concat(kqData);
        console.log(stocks.length);
        var stockNos = _.map(stocks,function(i,item){
            return i.replace("https://finance.naver.com/item/main.nhn?code=","");
        })
        // console.log(stockNos);
        var stockDataJs = "exports.data="+JSON.stringify(stockNos)+"";
        await fs.writeFileSync("./stocksData.js",stockDataJs);
        await driver.quit();
    };
};
start();
// https://finance.naver.com/sise/entryJongmok.nhn?&page=1



