var fs = require('fs');
var unitTestTool = require("../tool/unitTestTool");

// 드라이버 설정
var webdriver = require('selenium-webdriver'), until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.By = webdriver.By;
driver.Key = webdriver.Key;
driver.manage().window().setSize(1936, 1096);

// 시작시간 구하기
var getTimeStamp = require("../tool/timeStamp");
var nowStamp = getTimeStamp();

// 스크린샷 용 폴더 생성
var folderPath = "./reports/"+nowStamp[0];
try{ fs.mkdirSync(folderPath); }catch(e){ if ( e.code != 'EEXIST' ) throw e; };


var UT;

driver.then(function(){

    var domain = "www";
    var time = nowStamp[1]; // 테스트 시작시간 (hhmmss)

    var UTPath = folderPath+"/"+time+"_"+domain;
    console.log(UTPath);
    try{ fs.mkdirSync(UTPath); }catch(e){ if ( e.code != 'EEXIST' ) throw e; }; // 폴더생성
    UT = new unitTestTool(driver,UTPath,domain); // 유닛테스트 툴

    // 단위테스트 테스트
    // [중요] 상세 단위테스트 모듈 가져온 후에 require 경로 앞에 "./" 을 "./tests/" 로 변경할것

    // EC > 전시
    UT.then(function(){
        for(i=0;i<10;i++){
            UT.timeCheck("/event/selectEventIngList.do?eventNumHeader=100000","EC > 이벤트");
        };
        for(i=0;i<10;i++){
            UT.timeCheck("/tvshopping/selectLive.do","EC > TV쇼핑 > 생방송");
        };
        for(i=0;i<10;i++){
            UT.timeCheck("/mypage/selectMyDeposit.do","EC > 마이페이지 > 쇼핑통장 > 나의예치금",true);
        };
        for(i=0;i<10;i++){
            UT.timeCheck("/mypage/selectMyQnaInfo.do","EC > 마이페이지 > 나의활동 > 상담내역",true);
        };
        for(i=0;i<10;i++){
            UT.timeCheck("/social/selectSocialConnection.do","EC > 마이페이지 > 나의정보 > SNS계정관리",true);
        };
        for(i=0;i<10;i++){
            UT.timeCheck("/mypage/selectLoginHistory.do","EC > 마이페이지 > 나의정보 > 로그인이력조회",true);
        };
        for(i=0;i<10;i++){
            UT.timeCheck("/mypage/selectPersonalInfo.do","EC > 마이페이지 > 개인정보이용내역",true);
        };
        /*
        UT.timeCheck("/main.do","EC > 메인 > 인덱스");
        UT.timeCheck("/display/selectBest100.do","EC > 베스트");
        UT.timeCheck("/exhibition/selectExhibitionMainList.do?dispCatNoHeader=90000","EC > 기획전");
        UT.timeCheck("/event/selectEventIngList.do?eventNumHeader=100000","EC > 이벤트");
        UT.timeCheck("/tvshopping/selectIndex.do","EC > TV쇼핑 > 인덱스");
        UT.timeCheck("/tvshopping/selectLive.do","EC > TV쇼핑 > 생방송");
        UT.timeCheck("/tvshopping/selectSchedule.do","EC > TV쇼핑 > 편성표");
        UT.timeCheck("/tvshopping/selectTvBest.do","EC > TV쇼핑 > TV쇼핑 베스트 상품");
        UT.timeCheck("/tvshopping/selectAlarmKeyword.do","EC > TV쇼핑 > 방송알림",true);
        UT.timeCheck("/imdeal/selectImdeal.do?dispCatNo=50000","EC > 공영딜");
        UT.timeCheck("/themeshop/seletThemeShopIndex.do","EC > 테마샵 > 인덱스");
        UT.timeCheck("/themeshop/selectShowtalk.do","EC > 테마샵 > 쇼톡");
        UT.timeCheck("/themeshop/seletThemeShopLocal.do","EC > 테마샵 > 지역특화");
        UT.timeCheck("/exhibition/selectDepth1.do?ebtNo=2178","EC > 테마샵 > 브랜드K");
        UT.timeCheck("/themeshop/selectImMart.do","EC > 테마샵 > 공영마트");
        UT.timeCheck("/themeshop/seletThemeShopExpress.do","EC > 테마샵 > 국내농수산");
        UT.timeCheck("/display/eCoupon.do","EC > 테마샵 > e쿠폰");

        UT.timeCheck("/display/selectDepth1List.do?dispCatNoHeader=100129&uprDispCatNoHeader=100040","EC > 전시 > 1depth");
        UT.timeCheck("/display/selectDepth2List.do?dispCatNo=100129&uprDispCatNoNum=100040&dispCatNoSo=110107","EC > 전시 > 2depth");
        UT.timeCheck("/goods/selectGoodsDetail.do?prdId=11416538","EC > 전시 > 상세");

        UT.timeCheck("/customercenter/selectTopTen.do","EC > 고객센터 > 자주묻는질문");
        UT.timeCheck("/customercenter/selectMyQnaWrite.do","EC > 고객센터 > 1:1문의",true);
        UT.timeCheck("/customercenter/selectNotice.do","EC > 고객센터 > 공지사항 > 목록");
        UT.timeCheck("/customercenter/selectNoticeDetail.do?ntcNoParam=503","EC > 고객센터 > 공지사항");

        UT.timeCheck("/instore/selectInstoreIndex.do","EC > 풋터 > 입점안내");
        UT.timeCheck("/instore/selectInstoreSearch.do","EC > 풋터 > 입점안내 > 입점신청결과 로그인");
        UT.timeCheck("/instore/customerCommission.do","EC > 풋터 > 입점안내 > 소비자상품평가기준");

        UT.timeCheck("/login/selectLogin.do","EC > 로그인");
        UT.timeCheck("/member/selectJoinAgreeWrite.do","EC > 회원가입");

        UT.timeCheck("/mypage/selectMyPageIndex.do","EC > 마이페이지 > 인덱스",true);
        UT.timeCheck("/mypage/selectOrder.do","EC > 마이페이지 > 쇼핑정보 > 주문배송조회",true);
        UT.timeCheck("/mypage/selectOrderChangeInfo.do","EC > 마이페이지 > 쇼핑정보 > 취소교환반품",true);
        UT.timeCheck("/mypage/selectRefund.do","EC > 마이페이지 > 쇼핑정보 > 환불계좌",true);
        UT.timeCheck("/mypage/selectTaxBill.do","EC > 마이페이지 > 쇼핑정보 > 세금계산서",true);
        UT.timeCheck("/mypage/selectMyCoupon.do","EC > 마이페이지 > 쇼핑통장 > 나의쿠폰",true);
        UT.timeCheck("/mypage/selectMyReserves.do","EC > 마이페이지 > 쇼핑통장 > 나의적립금",true);
        UT.timeCheck("/mypage/selectMyDeposit.do","EC > 마이페이지 > 쇼핑통장 > 나의예치금",true);
        UT.timeCheck("/mypage/selectZzimGoods.do","EC > 마이페이지 > 나의쇼핑 > 좋아요",true);
        UT.timeCheck("/mypage/selectBroadcastList.do","EC > 마이페이지 > 나의쇼핑 > 방송알림",true);
        UT.timeCheck("/mypage/selectActiveReviewWrite.do","EC > 마이페이지 > 나의활동 > 나의상품평",true);
        UT.timeCheck("/mypage/selectMyQnaInfo.do","EC > 마이페이지 > 나의활동 > 상담내역",true);
        UT.timeCheck("/mypage/selectPublicMallEvent.do","EC > 마이페이지 > 나의활동 > 이벤트응모내역",true);
        UT.timeCheck("/mypage/selectMyAsInfo.do","EC > 마이페이지 > 나의활동 > AS내역",true);
        UT.timeCheck("/mypage/selectMyMemberInfoChg.do","EC > 마이페이지 > 나의정보 > 개인정보수정 > 비밀번호확인",true);
        UT.timeCheck("/mypage/selectMyDeliveryAddress.do","EC > 마이페이지 > 나의정보 > 배송주소록",true);
        UT.timeCheck("/social/selectSocialConnection.do","EC > 마이페이지 > 나의정보 > SNS계정관리",true);
        UT.timeCheck("/mypage/selectLoginHistory.do","EC > 마이페이지 > 나의정보 > 로그인이력조회",true);
        UT.timeCheck("/mypage/selectMyWithdrawal.do","EC > 마이페이지 > 나의정보 > 회원탈퇴",true);
        UT.timeCheck("/mypage/selectPersonalInfo.do","EC > 마이페이지 > 개인정보이용내역",true);

        UT.timeCheck("/search/goodsSearch.do?kwd=김치&reSrchFlag=off&pageNum=1&kwdType=2","EC > 검색결과",true);
        */
    });


}).then(function(){
    UT.exportTimeStamp("ec_timeStamp_1번");
    driver.quit();
});
