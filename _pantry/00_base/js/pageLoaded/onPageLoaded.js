/**
 * @fileoverview 윈도우 로드완료 표시
 * @author dstyle0210
 * @version 0.1 (alpha)
 * @since 2020.12.02
 * @returns {Object}
 * @example
 * window.onload = __windowOnPageLoaded; // return string
 *
 * @Modification Information
 *
 * 수정일 : 수정자 : 버전 : 수정내용
 * ------------------------------------------------
 * 2020.12.02 : Dstyle : 0.1 : 최초생성
 */
// 윈도우 로드완료 표시
var __windowOnPageLoaded = function(){
    var el = document.getElementsByTagName("html")[0];
    var classNameList = (el.className).split(" ");
    if( classNameList.indexOf("onPageLoaded") == -1 ){
        el.className = el.className+" onPageLoaded";
    };
    return el.className.split(" "); // <html> 엘리먼트가 가진 클래스명 전체 콜렉션 (Array) 리턴
};
/*
윈도우 온로드 window.onload 는 하나만 실행 됨.
그러면 나중에 중복되는 코드 있으면 해당 함수 날라감.
interval 로 onpageload 체크해서 없으면 확인?
 */