// 배열 깊은복사(기존의 배열과의 연결고리 없이 완전한 clone 처리
var deepCopyData = function deepCopyData(array) {
    return JSON.parse(JSON.stringify(array));
}