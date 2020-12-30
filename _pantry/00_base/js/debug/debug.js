/**
 * @fileoverview 함수를 만들때 등록하는 디버거 , URL에 ?debug=true 형식으로 선언
 * @author dstyle0210
 * @version 0.1 (alpha)
 * @since 2020.12.08
 * @returns {Object}
 * @require getRequest.js
 * @example
 * __fnLog("함수명",arguments); // return null
 *
 * @Modification Information
 *
 * 수정일 : 수정자 : 버전 : 수정내용
 * ------------------------------------------------
 * 2020.12.08 : Dstyle : 0.1 : 최초생성
 */
function __fnLog(name , arg){
    var isDebug = __getRequest().debug; // 디버그 모드인지 확인
    if(isDebug){ console.log("[fnDebug] "+name , arg); }
};