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

var stock = require("./report2.js");
console.log(stock.data);


var stocks = "058610";
var datas = [];


(async function(){
    datas = stock.data;
    var updateData = await getNum(stocks);
    datas.push( updateData );
    datas = _.sortBy(datas,"type");
    var stockDataJs = "export default {data:"+JSON.stringify(datas)+"}";
    fs.writeFileSync("./report.js",stockDataJs);
    // console.log(datas);
    driver.quit();
})();

async function getNum(sNo){
    var url = `https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=${sNo}&target=finsum_more`;
    await driver.get(url);
    var data = await driver.executeScript(function(){
        var res = {};
        res.name = $("span.name").text();
        res.owner = $( "th:contains('자본총계(지배)')" ).parent().find("td:last-child").prev().text().replace(/,/gi,"")*1; // 지배주주자본
        res.type = $(".td0101 dt:eq(2)").text() + ","+$(".td0101 dt:eq(3)").text(); // 기업정보
        res.cStocks = $( "tr.p_sJJ30" ).find("td:eq(1)").text().replace(/,/gi,"")*1; // 자사주
        res.stocks = ($( "th:contains('발행주식수(보통주)')" ).parent().find("td:last-child").prev().text()).replace(/,/gi,"")*1; // 총 발행수
        res.dividend = ($( "th:contains('현금DPS(원)')" ).parent().find("td:eq(2)").text()).replace(/,/gi,"")*1; // 배당금(평균)
        res.consensus = 0;
        res.quarter = 0;
        var $cons = $( "th:contains('당기순이익(지배)')" ).parent().find("td:last-child");
        if($cons.text()==""){
            res.quarter = 0;
            res.consensus = $cons.prev().prev().prev().prev().text().replace(/,/gi,"")*1;
            if(res.consensus==0){
                res.consensus = $cons.prev().prev().prev().prev().prev().text().replace(/,/gi,"")*1;
            };
        }else{
            res.quarter = ($cons.text().replace(/,/gi,"")*1);
            res.consensus = ( ($cons.text().replace(/,/gi,"")*1) + ($cons.prev().text().replace(/,/gi,"")*1) +($cons.prev().prev().text().replace(/,/gi,"")*1) +($cons.prev().prev().prev().text().replace(/,/gi,"")*1) );
        };
        return res;
    });

    var naverUrl = `https://finance.naver.com/item/main.nhn?code=${sNo}`;
    await driver.get(naverUrl);
    data.stockPrice = await driver.executeScript(function(){
        return (document.querySelector(".no_today em").innerText).match(/[0-9]+/gi).join("") * 1;
    });

    data.sNo = sNo;
    data.cap = data.stocks * data.stockPrice; // 시가총액
    data.rStocks = data.stocks - data.cStocks; // 유통주식수
    data.dividendAll = data.dividend * data.rStocks; // 배당총액
    data.myconsensus = (data.consensus*100000000) - data.dividendAll;
    data.myROE = ((data.myconsensus / (data.owner*100000000))*100).toFixed(2); // ROE 구하기
    data.RIM = ((data.myROE - 7.53)/7.53).toFixed(2); // RIM 구하기
    data.myCap = ( data.owner + (data.owner * data.RIM) )*100000000; // RIM 방식의 적정시가총액
    data.myStockPrice = data.myCap / data.rStocks ; // RIM 방식의 적정주가
    data.myStockBuyPrice = (data.myStockPrice * 0.9).toFixed(0) * 1; // 매수예정가
    data.mySafeMargin = ((data.myStockBuyPrice - data.stockPrice)/data.stockPrice)*100; // 안전마진 비율

    // if(0 < data.mySafeMargin){ // 안전마진이 0보다 아래면 정리
    if(data.stockPrice < data.myStockPrice){ // 적정가격 보다 아래면 정리.
        datas.push(data);
    }
    return data;
};
// $( "th:contains('당기순이익(지배)')" ).parent().find("td:last-child").text()