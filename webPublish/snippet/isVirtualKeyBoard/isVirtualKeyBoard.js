// 모바일 가상키보드가 나와있는지 확인하는 함수
function isVirtualKeyBoard(){
    return !!(window.visualViewport.height < window.innerHeight); // 비주얼뷰포트가 브라우저 창 크기보다 작으면, 네이티브의 속성(가상키보드나 , 가상 셀렉트을 통해서)으로 인해 작아진것.
};