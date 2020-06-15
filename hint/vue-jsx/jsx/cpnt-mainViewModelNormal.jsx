/**
 * 메인 > 컴포넌트 > 일반 뷰모델
 */
Vue.component('cpnt-main-normal', {
    render (h) { // <-- h must be in scope
        var item = this.item;
        var className = "cpnt-mainViewModelNormal "+item.layout+"-article";
        return(
            <div class={className}>
                <div>
                    <a href={item.href} v-show={item.layout!="cardItemSS"} class="btnImgThumnail">
                        <div class="imgThumnail"><img src={item.src} alt={item.title + " 이미지"}/></div>
                    </a>
                    <a href={item.href} class="btnTextInfo">
                        <div class="textInfo">
                            <h1 class="textTitle">{item.title}</h1>
                            <p class="textSubTitle" v-show={item.layout!="cardItemMM"}>{item.content}</p>
                        </div>
                    </a>
                    <a href="javascript:;" v-show={item.tag!=""} class="btnTextTag"><span class="textTag">{item.tag}</span></a>
                </div>
            </div>
        );
    },
    props:{
        data:Object
    },
    computed:{
        item:function(){
            var vo = gyHomepage._util.deepCopyData(jsxVo.mainViewModel); // VO 깊은복사 : VO 종속제거
            var item = $.extend(vo,{layout:"cardItemMM"},this.data);

            // 제목이 33자 이상일 경우 점처리
            item.title = (33<item.title.length) ? ((item.title).substring(0,33))+"..." : item.title;

            return item;
        }
    },
    methods:{
        /*
        tagfilter:function(){
            // cardItemsLayout.filter( this.item.tag ); // 태그목록 필터( cardItemsLayout.js )
        }
        */
    }
});

