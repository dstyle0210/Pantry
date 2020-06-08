var fs = require('fs');
var unitTestTool = require("../../tool/unitTestTool")
/**
 *
 * @param driver
 * @param path 산출물이 저장 될 경로
 */
module.exports = function(driver,path,domain){
    try{ fs.mkdirSync(path); }catch(e){ if ( e.code != 'EEXIST' ) throw e; }; // 폴더생성
    var UT = new unitTestTool(driver,path,domain); // 유닛테스트 툴

    driver.then(function(){
        /*    // EC > 전시 > 검색
    var displaySearchTest = require("./display/search");
    displaySearchTest(UT);*/

        // EC > 전시 > 메인
        var displayMainTest= require("./display/main");
        displayMainTest(UT);

        // EC > 전시 > 카테고리
        var displayCategoryTest= require("./display/category");
        displayCategoryTest(UT);
        /*

        // EC > 전시 > TV쇼핑
        var displayTVshoppingTest= require("./display/tvshopping");
        displayTVshoppingTest(UT);

        // EC > 전시 > 공영딜
        var displayImdealTest= require("./display/imdeal");
        displayImdealTest(UT);

        // EC > 전시 > 테마샵 > 인덱스
        var displayThemeshopIndexTest= require("./display/themeshop_index");
        displayThemeshopIndexTest(UT);

        // EC > 전시 > 테마샵 > 쇼톡
        var displayThemeshopShowtalkTest= require("./display/themeshop_showtalk");
        displayThemeshopShowtalkTest(UT);

        // EC > 전시 > 테마샵 > 지역특화
        var displayThemeshopLocalTest= require("./display/themeshop_local");
        displayThemeshopLocalTest(UT);

        // EC > 전시 > 테마샵 > 국내생산
        var displayThemeshopDomesticTest= require("./display/themeshop_domestic");
        displayThemeshopDomesticTest(UT);

        // EC > 전시 > 테마샵 > 아임마트
        var displayThemeshopImmartTest= require("./display/themeshop_immart");
        displayThemeshopImmartTest(UT);

        // EC > 전시 > 테마샵 > 국내농수산
        var displayThemeshopExpressTest= require("./display/themeshop_express");
        displayThemeshopExpressTest(UT);

        // EC > 전시 > 테마샵 > e쿠폰
        var displayThemeshopEcouponTest= require("./display/themeshop_ecoupon");
        displayThemeshopEcouponTest(UT);

        // EC > 전시 > 베스트
        var displayBestTest= require("./display/best");
        displayBestTest(UT);

        // EC > 전시 > 기획전
        var displayExhibitionTest= require("./display/exhibition");
        displayExhibitionTest(UT);

        // EC > 전시 > 이벤트
        var displayEventTest = require("./display/event");
        displayEventTest(UT);

        // EC > 전시 > 상품상세
        var displayDetailTest = require("./display/detail");
        displayDetailTest(UT);

        // EC > 전시 > 고객센터
        var displayCustomerCenterTest = require("./display/customercenter");
        displayCustomerCenterTest(UT);

        // EC > 전시 > 입점안내
        var displayInstoreTest = require("./display/instore");
        displayInstoreTest(UT);

        // EC > 전시 > 풋터팝업
        var displayFooterTest = require("./display/footer");
        displayFooterTest(UT);

        // EC > 전시 > 검색
        var displaySearchTest = require("./display/search");
        displaySearchTest(UT);
        */
    }).then(function(){
        UT.exportTimeStamp("ec_display_timeStamp");
    });
};






























