/**
 * @fileoverview Youtube 적용 스크립트
 * @author dstyle0210
 * @version 1.00
 * @since 2019.03.21
 * @type {object}
 * @class youtube
 * @require jquery.js , base.js
 * @param {String} videoId
 * @param {Object} [option] 실행 옵션 설정
 * @param {boolean}     [option.autoplay]       - 페이지 로딩 후 비디오가 시작 가능 일경우 즉시시작
 * @param {Function}    [option.canplay]        - 비디오가 시작가능 상태일때 이벤트
 * @param {Function}    [option.timeupdate]     - 비디오가 시작 후 프레임단위로 실행
 *
 * @returns {Object}
 * @Modification Information
 *
 var ytPlayer = new youtube("플레이어아이디",{ // 플레이어 아이디는 "#"을 제외한 아이디.
        width:935, // 영상 가로사이즈
        height:532, // 영상 세로사이즈
        videoId:"", // 영상 비디오 아이디
        onPlayerReady:function(e){}, // 유튜브 영상이 준비가 되었을때
        onPlayerStateChange:function(e){} // 유튜브영상의 재생상태가 변경되었을때
    });
 ytPlayer.start();
 ytPlayer.stop();

 *
 * 수정일 : 수정자 : 수정내용
 * ------------------------
 * 2019.03.21 : Dstyle : 최초생성
 */

var isYouTubeIframeAPIReady = false;
function onYouTubeIframeAPIReady() {
    $("html").addClass("YouTubeIframeAPIReady");
    isYouTubeIframeAPIReady = true;
};
var youtube = function(playerId,option){
    var me = this;
    me.player = null;
    me.ie8 = false;
    me.isPlaying = false;
    var opt = $.extend({
        width:935,
        height:532,
        videoId:"",
        onPlayerReady:function(e){},
        onPlayerStateChange:function(e){}
    },option);

    if( $("html").hasClass("ie8") ){
        me.ie8 = true;
        me.stop = function(){};
        return false;
    };



    me.setPlayer = function(){
        if(isYouTubeIframeAPIReady){
            me.player = new YT.Player(playerId, {
                width: opt.width,
                height: opt.height,
                videoId:opt.videoId,
                playerVars: {             // <iframe> 태그 지정시 필요없음
                    "playsinline":1,
                    "controls":0,
                    "showinfo":0,
                    "rel":0,
                    "fs":1,
                    "modestbranding":1
                },
                events: {
                    'onReady': function(event) {
                        // 혹시 선처리 되어야 할 부분이 있을지도 모르니, call 방식으로 적용.
                        opt.onPlayerReady.call(null,event);
                    },
                    'onStateChange' : function(event){
                        // 혹시 선처리 되어야 할 부분이 있을지도 모르니, call 방식으로 적용.
                        opt.onPlayerStateChange.call(null,event);
                    }
                }
            });
        }else{
            setTimeout(function(){
                me.setPlayer();
            },500);
        };
    };

    if(!isYouTubeIframeAPIReady){
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        me.setPlayer();
    }else{
        me.setPlayer();
    }

    me.start = function(){
        if(me.player && me.player.getPlayerState){
            if(me.player.getPlayerState() == 0 || me.player.getPlayerState() == 5 || me.player.getPlayerState() == 2){
                me.player.playVideo();
            }else{
                setTimeout(function(){
                    me.start();
                },500);
            }
        }else{
            setTimeout(function(){
                me.start();
            },500);
        }
    };

    me.stop = function(){
        me.player.stopVideo();
    };

    me.pause = function(){
        me.player.pauseVideo();
    };

    me.setYtId = function(ytid){
        if(me.player && me.player.loadVideoById){
            me.player.clearVideo();
            me.player.loadVideoById({
                "videoId":ytid,
                "startSeconds":0
            });
            me.player.stopVideo();
        }else{
            setTimeout(function(){
                me.setYtId(ytid);
            },500);
        };
    };

    me.getPlayer = function(){
        return me.player;
    };
    return me;
};