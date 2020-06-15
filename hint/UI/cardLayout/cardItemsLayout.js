/**
 *
 * @param marsornyVueId
 * @param option
 * @returns {_cardItemsLayoutClass}
 * @private
 */
// 상수(const) : 대문자 명사 , 언더스코어
// 전역변수(let) : 소문자 명사 , 카멜케이스
// 임시변수(let) : _ + 소문자 명사 , 카멜케이스
// 내부함수 : fn 으로 시작 , 카멜케이스
// 외부노출 변수 : 대문자 시작 , 파스칼
// 외부노출 함수 : Fn으로 시작 , 파스칼
function _cardItemsLayoutClass(marsornyVueId,option){
    const ME = this;
    const OPT = $.extend({
        items:[],
        viewItems:0, // 한번에 보여줄 아이템의 갯수
        itemSelector:".card-item", // 반응형 대상 아이템 클래스명
        initMaxItems:function(){}, // 마지막까지 더보기 했을경우 실행
        updateItems:function(){}, // 아이템이 변경될경우 실행
        rollingItems:5, // 롤링 게시물 갯수
        pageIdx:1, //현재 페이지
        textTag:"" //태그명
    },option);
    const ORIGIN_ITEMS = OPT.items; // 전달 받은 오리지널 데이터

    // type A : cardItemMM
    // type B : cardItemSM
    // type C : cardItemSL
    // type A' : cardItemSS
    const HASH_LAYOUT_INIT = {
        mqlg:["cardItemSM","cardItemSS","cardItemSS"], // 4UP
        mqmd:["cardItemSS","cardItemSS"],// 3UP
        mqsm:["cardItemSS","cardItemSS"],// 2UP
        mqmo:["cardItemMM","cardItemMM"] // 1UP :: 순서를 위해 2UP과 동일한 배치를 사용함 -> 단 형태를 위해 "cardItemMM" 사용
    };
    const HASH_LAYOUT = { // 반복 영역
        mqlg:[ // 4UP
            "cardItemMM","cardItemSS","cardItemSM","cardItemSL","cardItemSM","cardItemSM","cardItemSM", // Set 1
            // "cardItemSL","cardItemSM","cardItemSS","cardItemSS","cardItemMM","cardItemSM","cardItemSS","cardItemSS","cardItemSS", // Set 2
            "cardItemMM","cardItemSS","cardItemSM","cardItemSS", // Set 4
            "cardItemSL","cardItemMM","cardItemSM","cardItemSS","cardItemSS","cardItemSS" // Set 3
        ],
        mqmd:[ // 3UP
            "cardItemMM","cardItemSS","cardItemSL","cardItemSM","cardItemSM", // Set 1
            "cardItemSL","cardItemMM","cardItemSS","cardItemSS", // Set 2
            "cardItemSS","cardItemSS","cardItemSM","cardItemMM","cardItemSM","cardItemSS","cardItemSS" // Set 3
        ],
        mqsm:[ // 2UP
            "cardItemMM","cardItemSS","cardItemSS", // Set 1
            "cardItemMM","cardItemSL","cardItemSM","cardItemSM","cardItemSS", // Set 2
            "cardItemMM","cardItemSS","cardItemSM","cardItemSS", // Set 3
            "cardItemMM","cardItemSM","cardItemSL","cardItemSS" // Set 4
        ],
        mqmo:[ // 1UP :: 순서를 위해 2UP과 동일한 배치를 사용함 -> setCardLayout 동작후 "cardItemMM" 으로 일괄 변경됨.
            "cardItemMM","cardItemSS","cardItemSS", // Set 1
            "cardItemMM","cardItemSL","cardItemSM","cardItemSM","cardItemSS", // Set 2
            "cardItemMM","cardItemSS","cardItemSM","cardItemSS", // Set 3
            "cardItemMM","cardItemSM","cardItemSL","cardItemSS" // Set 4
        ]
    };


    let $marsornyVueWrap = $(marsornyVueId); // VUE와 Masonry가 적용되는 엘리먼트
    let VueObject = null; // Vuejs 오브젝트 => fnSetVue() 에서 overwrite => ME.vue 로 노출
    let Masonry = null; // masonry 오브젝트 => fnSetMasonry() 에서 overwrite => ME.$masonry 로 노출
    let CardItems = []; // 재배치 완료된 모든 데이터 => Vue에 적용되는 데이터 => ME.cardItems 로 노출

    let rollingItems = []; // 롤링 데이터
    let normalItems = []; // 일반 데이터
    let noticeItems = []; // 공지 데이터
    let youtubeItems = []; // 유튜브(동영상) 데이터
    let vueItems = []; // 카드아이템 전체 담은 배열(반응형레이아웃 용 , 롤링을 제외한 전체)
    let filterText = OPT.textTag; // 필터용 텍스트("" 일경우 전체)


    /*
    함수 실행순서
    1. initItems(callback) => 제공된 데이터 정제, 콘덴츠타입 따라 별도저장
    2. setCardLayout() => 가져온 데이터에 현재 미디어쿼리에 맞는 레이아웃 정보 삽입.
    3. setVue(type) => Vuejs 을 실행(start) 하거나, 데이터바인딩(update) 처리
    4. setMasonry(type) => Vue로 그려진 화면에 위치값 적용
    5. lazyImageByObserve() => 위치값이 적용된 화면에 이미지 레이지로딩 적용. => 기능삭제(주석)
     */

    const initItems = (callback) => {

        // 데이터 정제
        $(ORIGIN_ITEMS).each(function(idx,item){
            // type 설정
            switch (item.type) {
                case "10" :
                    item.type = "normal";
                    normalItems.push(item);
                    break;
                case "20" :
                    item.type = "rolling";
                    rollingItems.push(item);
                    break;
                case "30" :
                    item.type = "notice";
                    noticeItems.push(item);
                    break;
                case "40" :
                    item.type = "video";
                    youtubeItems.push(item);
                    break;
            };

            // 이미지경로 설정
            item.src = gyHomepage.imgSrc+item.src; // gyHomepage.imgSrc => gyHomepage._cdn.js 에서 설정됨(CDN경로)
        });

        rollingItems = rollingItems.splice(0,OPT.rollingItems); // 롤링 아이템의 갯수
        noticeItems = noticeItems.splice(0,3); // 공지 아이템의 갯수

        // 분리된 데이터 저장
        ME.normalItems = normalItems;
        ME.rollingItems = rollingItems;
        ME.noticeItems = noticeItems;
        ME.youtubeItems = youtubeItems;
        callback.call(null);
    };

    // 적용된 태그(필터)가 있다면 걸러낸다.
    var filterItemsByTag = (items) => {
        if(filterText==""){
            return items;
        }else{
            return items.filter(function(item){
                return item.tag==filterText;
            });
        };
    };

    var setCardLayout = function(){
        var mq = gyHomepage.mediaquery;
        // 레이아웃 설정용 임시배열 생성
        var _noticeItems = filterItemsByTag( gyHomepage._util.deepCopyData(noticeItems) ); // 공지 복사
        var _normalItems = filterItemsByTag( gyHomepage._util.deepCopyData(normalItems) ); // 일반 복사
        var _youtubeItems = filterItemsByTag( gyHomepage._util.deepCopyData(youtubeItems) ); // 유튜브 복사

        // 공지에 일반을 합친후, 고정영역 갯수만큼 빼낸다.(mqlg는 3개 , 나머진 2개)
        var _noticeNormalItems = _noticeItems.concat(_normalItems); // 공지+일반 합치기
        var _fixedItems = _noticeNormalItems.splice(0,HASH_LAYOUT_INIT[mq].length); // 고정영역 레이아웃 갯수만큼 빼내기(_fixedItems 가 고정영역, _noticeNormalItems에는 그외 나머지)

        // 고정영역 레이아웃( HASH_LAYOUT_INIT )
        $(_fixedItems).each(function(idx,item){
            item.layout = HASH_LAYOUT_INIT[mq][idx];
        });

        // 반복영역 레이아웃( HASH_LAYOUT )
        // 임시아이템들(_noticeNormalItems) 에서 반복영역 레이아웃 형식대로 유튜브(동영상)을 원하는 위치(cardItemMM)을 지정하여 Vue용 아이템들에 넣는다.
        var max = _noticeNormalItems.length + _youtubeItems.length; // ((공지+일반) - 고정) + 유튜브
        var youtubeIdx = 0; // 유튜브 아이템 인덱스
        var tempIdx = 0;
        var _vueItems = []; // 최종(CardItems)으로 담기위한 전체 배열
        for(var i=0;i<max;i++){
            let idx = i%HASH_LAYOUT[mq].length; // 레이아웃 형식의 배열 인덱스
            let _isYoutubeItem = (HASH_LAYOUT[mq][idx]=="cardItemMM" && _youtubeItems[youtubeIdx]); // 현재 레이아웃이 "cardItemMM" 이고, 해당 자리에 들어갈 유튜브아이템이 있으면 true
            let _isNonNormalItem = (youtubeItems[youtubeIdx] && !_noticeNormalItems[tempIdx]); // 유튜브 아이템은 있는데, 일반+공지 아이템이 부족해서(없으면) => 유튜브 아이템만 들어갈수 있으니 true
            if( _isYoutubeItem || _isNonNormalItem ){ // 유튜브 아이템 넣는 조건
                _youtubeItems[youtubeIdx].layout = "cardItemMM"; // "cardItemMM"
                _vueItems.push(_youtubeItems[youtubeIdx]);
                youtubeIdx++;
            }else{ // 일반,공지 들어가는 조건(유튜브 조건에만 아니면 일반)
                _noticeNormalItems[tempIdx].layout = HASH_LAYOUT[mq][idx]; // 위 조건 아니면 모두 일반으로 삽입.
                _vueItems.push(_noticeNormalItems[tempIdx]);
                tempIdx++;
            };
        };

        // 최종목록 작성(고정영역 + 반복영역)
        vueItems = (_fixedItems.concat(_vueItems)).filter(function(item){return item.layout}); // layout이 없는경우(버그?)가 있어서 한번 필터링

        // 만약 모바일 뷰일경우, 일괄 화면 변경
        if(mq=="mqmo"){
            $(vueItems).each(function(idx,item){
                item.layout = "cardItemMM";
            });
        };
    };

    var pageIdx = OPT.pageIdx; // 현재 로드된 페이지 번호
    var viewItems = (!OPT.viewItems) ? HASH_LAYOUT.mqlg.length : OPT.viewItems; // 처음에 보여질 갯수(4up 기준 3판 == 17개)
    let masonryLayoutInstant = true; // 마소니 레이아웃 변경시, 적용방법 true : 바로적용(애니메이션 없음) , false : 애니메이션 적용
    var setVue = function(type,masonryType){

        // [#26738] 회사소개 홈페이지 '더보기' 버튼 기본값 확대요청 에 따라 로직 변경
        // => 첫페이지에서는 뷰페이지 갯수의 3배수를 적용
        // 변경로직 : 보여질 아이템의 갯수 계산((반복아이템수 * 3) + (반복아이템수 * (현재페이지-1)) + 고정갯수) => (viewItems * 3) + (viewItems * (pageIdx-1)) + HASH_LAYOUT_INIT[ gyHomepage.mediaquery ].length;
        var viewLength = (viewItems * 3) + (viewItems * (pageIdx-1)) + HASH_LAYOUT_INIT[ gyHomepage.mediaquery ].length;
        if(vueItems.length < viewLength){
            viewLength = vueItems.length;
            OPT.initMaxItems.call(null);
        };

        CardItems = vueItems.splice(0,viewLength); // Vue 용 최종 배열
        cpntMainYoutubePlayPlayer = null; // gyHomepage._youtube.js 내 재생중인 유튜브 플레이어 삭제
        $marsornyVueWrap.find("iframe").remove(); // ifrmae 로드목록 삭제처리 -> jsx render시 재 embed 됨.
        ME.carditems = CardItems; // 마소니 되는 아이템목록

        if(type=="start"){
            // Vuejs 적용
            VueObject = new Vue({
                el: marsornyVueId,
                data: {
                    updateTime:new Date(), // 적용시간(updated hooking 용)
                    carditems: CardItems, // 일반,공지,유튜브 게시물
                    rollings:rollingItems // 롤링 게시물
                },
                mounted: function () {
                    setMasonry("start"); // Masonry 실행
                },
                updated:function(){
                    setMasonry("update"); // Masonry 업데이트
                }
            });
        };
        if(type=="update"){
            masonryLayoutInstant = masonryType; // 업데이트 일경우의 마소니 애니메이션 방법 적용, resize로 update이면 자연스럽게 이동(false값) , more로 update이면 바로적용(true)
            VueObject.updateTime = new Date(); // update Hooking
            VueObject.carditems = CardItems; // Vue에 데이터만 바인딩 => Masonry 업데이트
            VueObject.rollings = rollingItems; // Vue에 데이터만 바인딩
        };
    };

    const masonryStampClassName = ".fixed"; // 마소니 에서 고정영역으로 사용되는 클래스명
    var setMasonry = function(type){
        if(type=="start"){
            // Masonry 적용
            Masonry = $(marsornyVueId).masonry({
                gutter:20,
                itemSelector:OPT.itemSelector, // 반응형 대상 아이템 클래스명
                columnWidth: 280,
                isLayoutInstant:masonryLayoutInstant
            });
            var $stamp = Masonry.find(masonryStampClassName);
            Masonry.masonry( 'stamp', $stamp ); // 스탬프(고정) 찍음
            /* 기능삭제 : Vue로 rendering 되면 기존 정보는 사라짐 => 어짜피 로딩되었다 라는 정보가 사라짐 => 필요 없는걸로 판단함.
            Masonry.on("layoutComplete",function(event,items){
                lazyImageByObserve();
            });
            */
            Masonry.masonry({isLayoutInstant:masonryLayoutInstant});
        };
        if(type=="update"){
            Masonry.masonry("reloadItems");
            Masonry.masonry({isLayoutInstant:masonryLayoutInstant});
        };
    };


    /* 기능삭제 : Vue로 rendering 되면 기존 정보는 사라짐 => 어짜피 로딩되었다 라는 정보가 사라짐 => 필요 없는걸로 판단함.
    // 이미지 레이지 기능추가
    var lazyImageByObserve = function(){
        $(masonryStampClassName+" img[init!='true']").each(function(idx,cardItem){
            gyHomepage._observer(cardItem,function(item){
                var $img = $(item.target);
                $img.one("load",function(){
                    $img.attr("init","true");
                });
                $img.attr("src",$img.attr("data-src"));
                cardItem.observer.unobserve(cardItem); // 옵저버 해제
            });
        });
    };
    */

    // 업데이트 될때(리사이징, 필터 , 더보기) 할때의 코어함수
    var updateFn = function(masonryUpdateType){
        setCardLayout(); // 데이터에 레이아웃 정보 삽입
        OPT.updateItems.call(null);
        setVue("update",masonryUpdateType); // Vue Datas 업데이트
    };

    var startFn = function(){
        initItems(function(){
            setCardLayout(); // 데이터에 레이아웃 정보 삽입
            setVue("start"); // Vue js 시작

            // 리사이즈 기능
            var caller;
            var mq = gyHomepage.mediaquery;
            gyHomepage.win.on("resize",function(){
                clearTimeout(caller);
                caller = setTimeout(function(){
                    if(mq!=gyHomepage.mediaquery){
                        updateFn(false);
                        mq = gyHomepage.mediaquery;
                    };
                },200);
            });

            // 리턴 프로퍼티 설정
            ME.vue = VueObject; // Vue 오브젝트
            ME.$masonry = Masonry; // 마소니
        });
    };

    // 필터(태그) 기능
    var filterFn = function(txt){
        filterText = (!txt || filterText==txt) ? "" : txt;
        if(filterText==""){ // 전체보기
            ME.$masonry.removeClass("is-filtering"); // 필터링 여부 삭제
        }else{
            ME.$masonry.addClass("is-filtering"); // 필터링 됨
        };
        updateFn(true);
    };

    // 더보기 버튼
    var moreFn = function(){
        // pageIdx++; //더보기 main.jsp에서 처리
        updateFn(true);
    };

    //페이지 인덱스 업데이트 main 히스토리백 구현
    var updatePageIdxFn = function updatePageIdxFn(page){
        // console.log("card",page);
        pageIdx = page;
    };
    
    // 리턴 메소드 설정
    ME.start = startFn;
    ME.update = updateFn;
    ME.filter = filterFn;
    ME.more = moreFn;
    ME.updatePageIdxFn = updatePageIdxFn;
    return ME;
};