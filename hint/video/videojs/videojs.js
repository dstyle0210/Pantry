/**
 * @fileoverview EC Videojs 기반, 라이브스트리밍 플레이어
 * @author dstyle0210
 * @version 1.00
 * @since 2019.03.21
 * @type {object}
 * @class video
 * @require jquery.js ,  videojs-ie8.js , video.js , videojs-flash.js , videojs-contrib-hls.min.js , videojs-addLang-ko.js
 * @param {String} videoId
 * @param {Object} [option] 실행 옵션 설정
 * @param {boolean}     [option.autoplay]       - 페이지 로딩 후 비디오가 시작 가능 일경우 즉시시작
 * @param {Function}    [option.canplay]        - 비디오가 시작가능 상태일때 이벤트
 * @param {Function}    [option.timeupdate]     - 비디오가 시작 후 프레임단위로 실행
 *
 * @returns {Object}
 * @Modification Information
 *
 * 수정일 : 수정자 : 수정내용
 * ------------------------
 * 2019.03.21 : Dstyle : 최초생성
 */
// liveStreaming(videoId,option)
/* 속도 문제로 삭제(주석) 처리 됨 2019.05.03
liveStreaming = function(videoId,option){
    var player = {on:function(){}}; // 플레이어 로드가 느릴경우를 위해 미리 셋팅 // 추후 오버라이드 됨.
    // var isIE11 = ($.browser.msie || ($.browser.mozilla && $.browser.version=="11.0")); // IE11 확인
    var isIE11 = true; // IE11 확인
    var vjsSrc = "/com/vjs/"; // videojs 라이브러리 위치
    var vjsSwf = "/com/vjs/video-js.swf"; // RTMP 일때 사용될 vjs swf 파일위치
    // var rtmpUrl = ""; // RTMP 스트리밍
    var rtmpUrl = ""; // RTMP 스트리밍
    // var hlsUrl = 'http://livem.gsshop.com/gsshop_hd/_definst_/gsshop_hd.stream/playlist.m3u8'; // HLS 스트리밍
    var hlsUrl = '';

    if(typeof videojs == "undefined"){
        $.getScript(vjsSrc+"ie9-typedarray.js");
        $.getScript(vjsSrc+"videojs-ie8.js",function(){
            $.getScript(vjsSrc+"video.js",function(){
                $.when( $.getScript(vjsSrc+"videojs-flash.js") , $.getScript(vjsSrc+"videojs-contrib-hls.min.js") , $.getScript(vjsSrc+"videojs-addLang-ko.js") )
                    .done(function(){
                        player = vjsSetting();
                    });
            });
        });
    }else{
        player = vjsSetting();
    };
    function vjsSetting(){
        var playerOption = {
            "autoplay":true,
            "flash":{'swf':vjsSwf,'params':{ 'wmode':'opaque'} }
        };
        playerOption = $.extend(playerOption,option);

        if(isIE11){
            // IE , RTMP 방식
            playerOption.techOrder = ['flash'];
            playerOption.sources =   [{'type':'rtmp/mp4','src':rtmpUrl}];
        }else{
            // not IE , HLS 방식
            playerOption.techOrder = ['html5','flash'];
            playerOption.sources =   [{'type':'application/x-mpegurl','src':hlsUrl}];
        };
        return videojs(videoId, playerOption);
    };

    this.getPlayer = function(){
        player.isPlaying = false;
        player.start = function(){
            if(isIE11){
                player.load();
            };
            player.play();
        };
        player.on(["waiting","pause"],function(){
            player.isPlaying = false;
        });
        player.on("playing",function(){
            player.isPlaying = true;
        });
        player.on("timeupdate",function(){

        });
        return player;
    };
    return this;
};
*/