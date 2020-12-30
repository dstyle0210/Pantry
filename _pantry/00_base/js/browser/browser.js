/**
 * @fileoverview 사용자의 브라우저 정보수집
 * @author dstyle0210
 * @version 0.1 (alpha)
 * @since 2020.12.02
 * @returns {Object}
 * @example
 * __getbrowser(window); // return {object}
 *
 * @Modification Information
 *
 * 수정일 : 수정자 : 버전 : 수정내용
 * ------------------------------------------------
 * 2020.12.02 : Dstyle : 0.1 : 최초생성
 */
function __getbrowser(global){
    var browserBase = {device:"mobile"};
    var userAgent = global.navigator.userAgent;
    var flatForm = global.navigator.platform.toLowerCase();
    var root = global.document.documentElement;
    var osFilter = "win16|win32|win64|mac";
    switch (true) {
        case/Android/.test(userAgent):
            browserBase.os = "android";
            break;
        case/iPhone|iPad|iPod/i.test(userAgent):
            browserBase.os = "ios";
            break;
        case/MacOSX/.test(userAgent): 
            browserBase.os = "mac";
            break;
        case/X11/.test(userAgent):
            browserBase.os = "unix";
            break;
        case/Linux/.test(userAgent):
            browserBase.os = "linux";
            break;
        case/Windows NT 6.4|Windows NT 10.0/i.test(userAgent):
            browserBase.os = "win10";
            break;
        case/Windows NT 6.3|Windows NT 6.2/i.test(userAgent):
            browserBase.os = "win8";
            break;
        case/Windows NT 6.1/.test(userAgent):
            browserBase.os = "win";
            break;
        default:
            browserBase.os = /win/.test(flatForm) ? "win" : flatForm
    }
    switch (true) {
        case/iPhone|iPad|iPod/i.test(userAgent):
            browserBase.device = browserBase.device == "mobile" && /iPad/i.test(userAgent) ? "tablet" : browserBase.device;
            break;
        case/Android/.test(userAgent):
            browserBase.device = browserBase.device == "mobile" && !/Mobile/i.test(userAgent) ? "tablet" : browserBase.device;
            break;
        default:
            browserBase.device = "pc"
    }

    if (browserBase.device != "pc" && osFilter.indexOf(flatForm) > 0) {
        browserBase.device = "pc-" + browserBase.device
    }
    switch (true) {
        case/MSIE/.test(userAgent):
            browserBase.browserName = /Touch/.test(userAgent) ? "ie-touch" : "ie";
            browserBase.browserVersion = userAgent.match(/MSIE ([\d]+)/)[1];
            break;
        case/Trident/.test(userAgent):
            browserBase.browserName = /Touch/.test(userAgent) ? "ie-touch" : "ie";
            browserBase.browserVersion = 4 + parseInt(userAgent.match(/Trident\/([\d]+)/)[1]);
            break;
        case/Edge/.test(userAgent):
            browserBase.browserName = "edge";
            browserBase.browserVersion = userAgent.match(/Edge\/([\d\.]+)/)[1];
            break;
        case/Chrome/.test(userAgent):
            browserBase.browserName = "chrome";
            browserBase.browserVersion = userAgent.match(/Chrome\/([\d\.]+)/)[1];
            break;
        case/Safari/.test(userAgent):
            browserBase.browserName = "safari";
            browserBase.browserVersion = userAgent.match(/Safari\/([\d\.]+)/)[1];
            break;
        case/Firefox/.test(userAgent):
            browserBase.browserName = "firefox";
            browserBase.browserVersion = userAgent.match(/Firefox\/([\d\.]+)/)[1];
            break;
        case/Opera/.test(userAgent):
            browserBase.browserName = "opera";
            browserBase.browserVersion = userAgent.match(/Opera\/([\d\.]+)/)[1];
            break;
        default:
            browserBase.browserName = "unknown";
            browserBase.browserVersion = "unknown";
    }
    browserBase.mobileBrowser = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    browserBase.isXp = userAgent.indexOf("Windows NT 5.1") > 0;

    // 제조사 브랜드 구하기
    var ua = userAgent.toLowerCase();
    if( (/samsung/).test(ua) || (/(shv-)/).test(ua) || (/(sm-)/).test(ua)){
        browserBase.brand = "samsung";
    }else if( (/(lg-)/).test(ua) || (/(lgms)/).test(ua) ){
        browserBase.brand = "lg";
    }else if( (/iphone/).test(ua) || (/ipad/).test(ua) || (/ipod/).test(ua) ){
        browserBase.brand = "apple";
    }else{
        browserBase.brand = "other";
    };
    return browserBase;
}