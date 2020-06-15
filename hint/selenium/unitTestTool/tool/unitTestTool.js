/*

CMD : npm 인스톨
npm i selenium-webdriver -D

불러오기

var webdriver = require('selenium-webdriver'), until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.By = webdriver.By;
driver.manage().window().setSize(1936, 1096);


 * var unitTestTool = require("unitTestTool");
 * var UT = new unitTestTool(driver,path[,domain]);
 * 
 */
var fs = require('fs');
module.exports = function(driver,path,domain){

    // 셋팅시간
    var now = new Date();
    var year = now.getFullYear();
    var month = (function(m){return (m<10) ? "0"+m : m;})(now.getMonth()+1);
    var date = (function(d){return (d<10) ? "0"+d : d;})(now.getDate());
    var hh = (function(d){return (d<10) ? "0"+d : d;})(now.getHours());
    var mm = (function(d){return (d<10) ? "0"+d : d;})(now.getMinutes());
    var ss = (function(d){return (d<10) ? "0"+d : d;})(now.getSeconds());

	
	var UT = {
        report:"", // 리포트결과물
        driver:driver, // selenium driver
        path:path, // 리포트 결과물이 저장될 경로
        browserName:"",
        browserVersion:"",
        browserUserAgent:"",
        date:year+"년"+month+"월"+date+"일 "+hh+"시"+mm+"분"+ss+"초",
        time:hh+""+mm+""+ss,
        count:0,
        mode:(domain) ? domain : "www",
        prdCode:"10063108",
        timeReport:"", // 시간대 리포트결과물
	};
	UT.domain = "https://"+UT.mode+".gongyoungshop.kr"; // URL 저장

    UT.driver.getCapabilities().then(function(browser){
        UT.browserName = browser.get("browserName");
        UT.browserVersion = browser.get("version");
    });

    // 리포트의 타이틀 삽입.
    UT.writeReportTitle = function(title){
        UT.timeStamp(title);
        if(UT.browserUserAgent==""){
            UT.driver.wait(function(){
                return UT.driver.executeScript(function(){
                    return navigator.userAgent;
                });
            }).then(function(ua){
                UT.browserUserAgent = ua;
            });
        };
        UT.report += "\n=="+title+"==\n";
        UT.driver.getCurrentUrl().then(function(url){
            UT.report += ("대상 URL : " +url+"\n");
        });
        return "-----"+title+"-----\n";
    };

    UT.writeReportText = function(text){
        UT.report += text+"\n";
        return text+"\n";
    };

    // 리포트 단위테스트 추가(성공예상)
    UT.writeReport = function(title,result,origin,takeShot){
        if(result==(origin+"")){
            UT.report += title +": 성공\n";
            return title +": 성공\n";
        }else{
            if(UT.driver && (takeShot==null || takeShot)){
                UT.takeScreenshot("실패_"+title);
            };
            UT.report += title +": 실패(기준 :"+result+" , 결과:"+origin+")\n";;
            return title +": 실패(기준 :"+result+" , 결과:"+origin+")\n";
        };
    };

    // 리포트 단위테스트 추가(실패예상)
    UT.writeReportForFail = function(title,result,origin,takeShot){
        if(result==(origin+"")){
            if(UT.driver && (takeShot==null || takeShot)){
                UT.takeScreenshot("실패_"+title);
            };
            UT.report += title +": 성공\n";
            return title +": 성공\n";
        }else{
            UT.report += title +": 실패\n";;
            return title +": 실패\n";
        };
    };

    // 리포트 결과물 생성 및 저장
    UT.exportTxt = function(fileName){
        var fileName = (!fileName) ? "unitTest" : fileName;
        var desc = "리포트 작성시간 : "+UT.date+"\n"+"대상 브라우저 : "+UT.browserName+"("+UT.browserVersion+")\n"+"에이전트 : "+UT.browserUserAgent+"\n";
        UT.report = desc+UT.report;
        fs.writeFileSync(UT.path+"/"+fileName+".txt",UT.report);
        UT.report = "";
    };

    // 스크린샷 찍기
    UT.takeScreenshot = function(name,executeScript,sleep){
        if(UT.driver){
            if(typeof executeScript=="function"){
                UT.$$(executeScript);
            }else if(typeof executeScript=="number"){
                var topFn = eval("(function(){$(window).scrollTop("+executeScript+");})");
                UT.$$(topFn);
            }else if(typeof executeScript =="string"){
                var fixedEl_h = (/m/).test(UT.mode) ? 80 : 0; // 모바일 일경우, 상단 80픽셀 만큼 offset().top 뺌.
                var topFnOfSelector = eval("(function(){$(window).scrollTop($('"+executeScript+"').offset().top-"+fixedEl_h+");})");
                UT.$$(topFnOfSelector);
            };
            if(sleep){
                UT.sleep(sleep);
            };
            UT.driver.takeScreenshot().then(function(data){
                UT.count = UT.count+1;
                var newname = UT.count+"_"+name;
                console.log(newname);
                var shot = data.replace(/^data:image\/png;base64,/,"");
                fs.writeFile(UT.path+"/"+newname+".png", shot, 'base64', function(err) {
                    if(err) console.log(err);
                });
            });
        }
    };

    UT.hdTextTest = function(name,selector){
        var korTest = "(function(){ $('"+selector+"').css({'outline':'1px dashed blue'}).text('가나다라마바사아자차카타파하123456789asdfghhjklqwertyyuipk가나다라마바사아자차카타파하123456789asdfghhjklqwertyyuipk가나다라마바사아자차카타파하123456789asdfghhjklqwertyyuipk');})";
        UT.$$( eval(korTest) );
        UT.takeScreenshot(name+"_긴글자");

        var engTest = "(function(){ $('"+selector+"').text('agagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagagag');})";
        UT.$$( eval(engTest) );
        UT.takeScreenshot(name+"_영문자");

        var clear = "(function(){ $('"+selector+"').css({'outline':'0'});})";
        var clearFn = eval(clear);
        UT.$$(clearFn);
    };

    // driver.executeScript 축약
    UT.$$ = function(func){
        return UT.driver.executeScript(func);
    };

    // driver.get 축약
    UT.get = function(url){
        return UT.driver.get(UT.domain + url);
    };

    // driver.sleep 축약
    UT.sleep = function(sec){
        return UT.driver.sleep(sec);
    };

    // driver.quit 축약
    UT.quit = function(){
        return UT.driver.quit();
    };

    // driver.wait 축약
    UT.wait = function(func){
        return UT.driver.wait(func);
    };

    // wendriver.By 의 축약
    UT.By = UT.driver.By;

    UT.timeStamp = function(url,pageName){
        var setTimeStamp = (new Date()).getTime();
        UT.timeReport += (pageName.replace(/(\s\>\s)/gi,"\t"))+"\t"+(setTimeStamp - UT.getTimeStamp)+"\n";
        UT.getTimeStamp = null;
    };

    UT.exportTimeStamp = function(fileName){
        var fileName = (!fileName) ? "timeStamp" : fileName;
        fs.writeFileSync(UT.path+"/"+fileName+".txt",UT.timeReport);
    };

    UT.then = function(func){
        return UT.driver.then(func);
    };

    UT.timeCheck = function(url,pageName,isLogin){
        UT.clearCache();
        UT.sleep(1000);
        if(isLogin){
            UT.get("/login/selectLogin.do").then(function(){
                if(UT.mode=="dm"){
                    UT.$$(function(){
                        $("#searchWebMemNo").val("caps92@naver.com");
                        $("#searchWebMemSecrtNo").val("1111");
                        $("#loginBtn").click();
                    });
                }else{
                    UT.$$(function(){
                        $("#searchWebMemNo").val("webstandard@naver.com");
                        $("#searchWebMemSecrtNo").val("!@qw12qw");
                        $("#loginBtn").click();
                    });
                };
            });
        };
        UT.then(function(){
            UT.getTimeStamp = (new Date()).getTime();
        });
        UT.get(url).then(function(){
            /*
            UT.$$(function(){
                window.addEventListener("load",function(){
                   $("html").addClass("windowLoaded");
                });
            });

            return jQuery.active==0 && $("html").hasClass("windowLoaded");


            */
            // UT.timeStamp(url,"dom load");
            UT.wait(function(){
                return UT.$$(function(){
                    return jQuery.active==0;
                });
            }).then(function(result){
                UT.timeStamp(url,pageName);
            });
        });
    };
    UT.clearCache = function(){
        UT.driver.get("chrome://settings/clearBrowserData");
        UT.sleep(1000);
        UT.driver.switchTo().activeElement().sendKeys(driver.Key.ENTER);
        UT.sleep(2000);
    };

    return UT;

};




