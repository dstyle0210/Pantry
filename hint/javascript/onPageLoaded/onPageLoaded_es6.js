/**
 * @fileoverview 윈도우 로드완료 표시용 함수 ES6
 * @author dstyle0210
 * @version 1.0
 * @since 2020.06.11
 * @return [DOMTokenList]
 */
// 윈도우 로드완료 표시
var _windowOnPageLoaded = () => {
    var el = document.getElementsByTagName("html")[0];
    el.classList.add("onPageLoaded");
    return el.classList; // <html> 엘리먼트가 가진 클래스명 전체 콜렉션 (DOMTokenList) 리턴
};
window.onload = _windowOnPageLoaded;