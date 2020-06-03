/**
 * @fileoverview HTML5 Video 간편적용 스크립트
 * @author dstyle0210
 * @version 1.00
 * @since 2019.03.21
 * @type {object}

 * @require jquery.js ,
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
// TODO .stop() 기능 추가 => pause에 타임라인 처음으로
// TODO .setSrc() 기능 추가
/*
 // 샘플
 var vodVideo = new video("#video",{
 isAutoplay:false, // true면 자동시작 (기본값 : false)
 onCanplay:function(vod){ // 비디오가 시작가능 상태일때 이벤트
 var mm = (vod.durationMinute<10) ? "0"+vod.durationMinute : vod.durationMinute;
 var ss = (vod.durationSeconds<10) ? "0"+vod.durationSeconds : vod.durationSeconds;
 console.log(mm+":"+ss);
 },
 onTimeupdate:function(vod){ // 비디오가 시작 후 프레임단위로 실행
 var mm = (vod.currentMinute<10) ? "0"+vod.currentMinute : vod.currentMinute;
 var ss = (vod.currentSeconds<10) ? "0"+vod.currentSeconds : vod.currentSeconds;
 console.log(mm+":"+ss);
 }
 });
 vodVideo.durationTime // {} 비디오의 총시간(초)
 vodVideo.durationMinute // 비디오의 총시간 표기중 분
 vodVideo.durationSeconds // 비디오의 총시간 표기중 초

 vodVideo.currentTime; // 비디오의 현재시간(초)
 vodVideo.currentMinute; // 비디오의 현재시간(분)
 vodVideo.currentSeconds; // 비디오의 현재시간(초)

 vodVideo.getVideo(); // 비디오 엘리먼트 반환
 vodVideo.play(); // 비디오 실행
 vodVideo.pause(); // 비디오 멈춤
 */
var video = function(videoId,option) {
    var me = this;

    // 옵션 합성
    me.opt = $.extend({
        video:null,
        canplay:false
    },{
        isAutoplay:false,
        onCanplay:function(){},
        onTimeupdate:function(){}
    },option);

    // 내부함수
    var fn = {
        getVideo:function(){
            return me.$video.get(0);
        },
        play:function(){
            me.opt.video.play();
        },
        pause:function(){
            me.opt.video.pause();
        },
        setSrc:function(src){
            me.opt.video.src = src;
        }
    };

    // jQuery Elements
    me.$video = $(videoId);

    // 메소드
    me.getVideo = function(){
        return fn.getVideo();
    };
    me.play = function(){
        fn.play();
    };
    me.pause = function(){
        fn.pause();
    };
    me.src = function(src){
        fn.setSrc(src);
    };

    // 콜백함수 합성 및 옵션 생성
    me.opt.video = fn.getVideo();
    me.opt.video.oncanplay = function(){
        me.opt.canplay = true;
        me.opt.width = me.$video.width();
        me.opt.height = me.$video.height();
        me.opt.durationTime = me.opt.video.duration;
        me.opt.durationMinute = Math.floor(me.opt.durationTime/60);
        me.opt.durationSeconds = Math.floor(me.opt.durationTime%60);
        me.opt.currentTime = me.opt.video.currentTime;
        me.opt.currentMinute = Math.floor(me.opt.currentTime/60);
        me.opt.currentSeconds = Math.floor(me.opt.currentTime%60);
        me.opt.onCanplay.call(null,me.opt);
    };
    me.opt.video.oncanplaythrough = function(){
        if(me.opt.isAutoplay){
            me.opt.video.play();
        };
    };
    me.opt.video.ontimeupdate = function(){
        me.opt.currentTime = me.opt.video.currentTime;
        me.opt.currentMinute = Math.floor(me.opt.currentTime/60);
        me.opt.currentSeconds = Math.floor(me.opt.currentTime%60);
        me.opt.onTimeupdate.call(null,me.opt);
    };

    return me;
};