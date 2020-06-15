/**
 * @fileoverview 윈도우 로드완료 표시용 함수 ES5
 * @author dstyle0210
 * @version 1.0
 * @since 2020.06.11
 * @return [Collection]
 */
// 윈도우 로드완료 표시
var _windowOnPageLoaded = function(){
    var el = document.getElementsByTagName("html")[0];
    var classNameList = (el.className).split(" ");
    if( classNameList.indexOf("onPageLoaded") == -1 ){
        el.className = el.className+" onPageLoaded";
    };
    return el.className.split(" "); // <html> 엘리먼트가 가진 클래스명 전체 콜렉션 (Array) 리턴
};
window.onload = _windowOnPageLoaded;