/**
 * 메인 > 컴포넌트 > 비디오(유튜브) 뷰모델
 */
var cpntMainYoutubePlayPlayer = null;
Vue.component('cpnt-main-video', {
    render (h) { // <-- h must be in scope
        var item = this.item;
        var playerID = "player"+item.id;
        var videoCaseId = "playerCase"+item.id;
        // var className = "cpnt-mainViewModelVideo "+item.layout+"-article";
        return(
            <div class="cpnt-mainViewModelVideo" id={videoCaseId}>
                <div id={playerID}></div>
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

            return item
        }
    },
    updated:function(){
        var playerID = "player"+this.item.id;
        var videoCaseId = "playerCase"+this.item.id;
        $("#"+videoCaseId).append("<div id='"+playerID+"'></div>");
        this.setYtPlayer();
    },
    mounted:function(){
        this.setYtPlayer();
    },
    methods:{
        tagfilter:function(){
            cardItemsLayout.filter( this.item.tag ); // 태그목록 필터( cardItemsLayout.js )
        },
        setYtPlayer:function(){
            var id = "player"+this.item.id; // 유튜브 들어갈 엘리먼트 아이디
            var ytId = (this.item.href).match(/[0-9a-zA-Z\-\_]{11}/)[0]; // 유튜브 아이디 구하기

            new gyHomepage._youtube(id,{
                width:580,
                height:340,
                videoId:ytId,
                onPlayerReady:function(event){
                    // console.log('main cb ready');
                    // console.log( event.data ) // ytPlayer 오브젝트
                },
                onPlayerStateChange:function(event){
                    if(cpntMainYoutubePlayPlayer){
                        cpntMainYoutubePlayPlayer.stopVideo();
                        cpntMainYoutubePlayPlayer = null;
                    };
                    if (event.data == YT.PlayerState.PLAYING) {
                        cpntMainYoutubePlayPlayer = event.target;
                    };
                }
            })
        }
    }
});

