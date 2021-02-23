var __layer = {
    isOpen:false,
    scrollTop:0,
    height:0,

    $wrapper:null,
    $wrapperContent:null,
    $layerContent:null,

    // 생성된 wrapperContent 에 실제 레이어 내용을 넣음.
    append:function(target,option){
        var me = this;
        var layerId = (typeof target == "object") ? $(target).attr("href") : target;
        var openKeyClassName = "layer-"+Math.floor(Math.random(10000) * 10000); // 레이어의 기존위치 저장용.

        me.$layerContent = $(layerId);
        me.$layerContent.attr("openKeyClassName",openKeyClassName);
        me.$layerContent.parent().addClass(openKeyClassName);
        me.$wrapperContent.empty().append(me.$layerContent);

        // 높이 자동적용
        setTimeout(function(){
            me.pack(option);
        },500);
    },

    // 레이어를 기존위치로 돌려놓기
    putBack:function(){
        var openKeyClassName = this.$layerContent.attr("openKeyClassName");
        var $parent = $("."+openKeyClassName);
        $parent.append(this.$layerContent);
    },

    // 레이어가 이미 떠 있는경우, 컨덴츠를 교체
    change:function(target,option){
        this.putBack(); // 기존 컨덴츠 돌려놓기
        this.append(target,option); // 새로운 레이어 삽입
    },

    // 레이어 띄우기
    open:function(target,option){
        var me = this;

        // 기존에 열려 있었으면, change로 전환
        if(me.isOpen){
            me.change(target,option);
            return;
        };

        // 랩퍼생성
        me.$wrapper = $("<div class='l-wrapper'><div class='l-wrapper__content'></div></div>");
        me.$wrapperContent = me.$wrapper.find(".l-wrapper__content");
        $("body").append(me.$wrapper);

        // 컨덴츠 삽입
        me.append(target,option);

        // 상태업데이트
        me.isOpen = true;
        me.freeze(); // 스크롤 기능 막기
    },

    // 레이어 닫기
    close:function(){
        var me = this;
        me.putBack(); // 기존 컨덴츠 돌려놓기
        me.$wrapper.remove(); // 랩퍼 삭제

        // 상태 업데이트
        me.isOpen = false;
        me.height = 0;
        me.unfreeze();
    },

    // 레이어 컨덴츠 사이즈 및 위치 조정
    pack:function(option){
        var me = this;
        var opt = $.extend({
            height:"auto"
        },option);

        // 랩퍼 사이즈 초기화
        var viewPort = window.visualViewport; // 실제 화면의 크기
        me.$wrapper.css({"height":viewPort.height,"top":viewPort.offsetTop});

        // 높이값 조절 시작
        me.$wrapperContent.removeAttr("style");
        if(opt.height=="auto"){
            // 자동적용
            var contentHeight = me.$layerContent.height(); // 컨덴츠의 높이값

            // 레이어의 내용이 너무 작으면 그냥 리턴
            if( contentHeight < (viewPort-200) ){
                return;
            };

            // 적용가능 최대높이 계산
            var maxHeight = viewPort.height; // 화면의 높이
            // 실제 레이어로 적용될 높이계산(최대높이 와 컨덴츠의 높이를 비교하여, 작은걸로 적용)
            me.height = contentHeight > maxHeight ? maxHeight : contentHeight;
            // 레이어 높이 적용
            me.$wrapperContent.height(me.height);
        }else{
            // 수동적용
            me.$wrapperContent.css({"height":opt.height});
            me.height = me.$wrapperContent.height(); // "%" 형식의 값이 들어올수 있기 때문에 선 적용후 후 가져옴.
        }
    },

    // 레이어가 뜰 경우, 스크롤 및 터치기능 삭제
    freeze:function(){
        $("body").addClass("-layerOpen");
        document.body.addEventListener("touchmove",this.freezeHandler,{capture:true});
        document.body.addEventListener("wheel",this.freezeHandler,{passive:false});
        this.scrollTop = $(window).scrollTop();
    },
    // 레이어가 닫힐때 스크롤 및 터치 기능 살림
    unfreeze:function(){
        $("body").removeClass("-layerOpen");
        document.body.removeEventListener("touchmove",this.freezeHandler,{capture:true});
        document.body.removeEventListener("wheel",this.freezeHandler,{passive:false});
        $(window).scrollTop(this.scrollTop);
    },
    // 레이어 전용 이벤트핸들러
    freezeHandler:function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}