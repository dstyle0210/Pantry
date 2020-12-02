/**
 * @fileoverview URL 안에 파라매터 가져오기
 * @author dstyle0210
 * @version 0.1 (alpha)
 * @since 2020.12.02
 * @returns {Object}
 * @example
 * __getRequest(); // return {object}
 *
 * @Modification Information
 *
 * 수정일 : 수정자 : 버전 : 수정내용
 * ------------------------------------------------
 * 2020.12.02 : Dstyle : 0.1 : 최초생성
 */
function __getRequest(){
    var search = location.search.substring(1);
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"')
        .replace(/&/g, '","').replace(/=/g,'":"') + '"}');
};