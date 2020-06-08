var fs = require('fs');

// 드라이버 설정
var webdriver = require('selenium-webdriver'), until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.By = webdriver.By;
driver.manage().window().setSize(1936, 1096);

// 시작시간 구하기
var getTimeStamp = require("../tool/timeStamp");
var nowStamp = getTimeStamp();

// 스크린샷 용 폴더 생성
var folderPath = "./reports/"+nowStamp[0];
try{ fs.mkdirSync(folderPath); }catch(e){ if ( e.code != 'EEXIST' ) throw e; };

driver.then(function(){

    var domain = "www";
    var domainPath = folderPath+"/"+domain;
    try{ fs.mkdirSync(domainPath); }catch(e){ if ( e.code != 'EEXIST' ) throw e; };
    
    // EC > 전시
    /**/
    var displayTest = require("./tests/display_all");
    displayTest(driver,domainPath+"/display",domain);

    /*
        // EC > 주문
        var orderTest = require("./tests/order_all");
        orderTest(driver,domainPath+"/order",domain);


        // EC > 회원
        var memberTest = require("./tests/member_all");
        memberTest(driver,domainPath+"/member",domain);
        */


}).then(function(){
    driver.quit();
});
