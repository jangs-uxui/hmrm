var videoRunningTime = 0;
function Loading(videoRunningTime){
    var runningTime = videoRunningTime*1000;
    Nowprogress = 0;
    var count = $('#count');
    myTextAnim = $({ Counter: 0 }).animate({ Counter: 100 }, {
        duration: runningTime,
        easing: 'linear',
        step: function () {
            count.text(Math.ceil(this.Counter)+ "%");
        }
    });
    var s = Snap('#animated');
    var progress = s.select('#progress');
    progress.attr({strokeDasharray: '0, 251.2'});
    myAnim = Snap.animate(0,251.2, function( value ) {
        progress.attr({ 'stroke-dasharray':value+',251.2'});
    }, runningTime);
}

function Loadingpause(){
    myAnim.pause();
    myTextAnim.stop(true,false);
    $('#count').text(myTextAnim[0].Counter+'%');
    Nowprogress = myTextAnim[0].Counter;
    // console.log(myTextAnim[0].Counter);
}

function Loadingresume(videoRunningTime){
    var Nowduration = (videoRunningTime*10)*(100-Nowprogress);
    var count = $('#count');
    myTextAnim = $({ Counter: Nowprogress }).animate({ Counter: 100 }, {
        duration: Nowduration,
        easing: 'linear',
        step: function () {
            count.text(Math.ceil(this.Counter)+ "%");
        }
    });
    var s = Snap('#animated');
    var progress = s.select('#progress');
    var NowDegree = (251.2/100)*Nowprogress;
    progress.attr({strokeDasharray: NowDegree+', 251.2'});
    myAnim = Snap.animate(NowDegree,251.2, function( value ) {
        progress.attr({ 'stroke-dasharray':value+',251.2'});
    }, Nowduration, function(){

    });
}



'use strict';

        (function($) {
            //태그객체
            var $window = $(window),
                $html = $('html');
            var fullPageCreated = false;
            $html.attr('data-fpenabled', false);
            
            /* fullpage */
            function createFullpage() {
                if (fullPageCreated === false) {
                    fullPageCreated = true;
                    $('#container').fullpage({
                        menu: '.fp_menu',
                        autoScrolling:true,
                        // scrollHorizontally: false,
                        keyboardScrolling: true,
                        animateAnchor: true,
                        recordHistory: true,
                        lazyLoading : true,
                        anchors : ['page1', 'page2', 'page3', 'page4'],
                        navigation: false,
                        verticalCentered : false,
                        scrollOverflow : false,
                        scrollingSpeed : 500,
                        css3 : false,
                        responsiveWidth : 1001,
                        afterResponsive: function(isResponsive){
                        },
                        //easing : 'easeInOutExpo',
                        //loopHorizontal : true,
                        // dragAndMove : false,
                        sectionSelector: $('#container [class^="rowgroup"], #footer')
                    });
                    //$.fn.fullpage.setAllowScrolling(false);
                    $html.attr('data-fpenabled', true);
                }
            }
            
            
            
            $(function() {

                //여기서부터 코드 작성해주세요
                var $body = $('body'),
                    $wrapper = $('#wrapper'),
                    $container = $('#container'),
                    $header = $('#header');
                
                /* 풀페이지 셋팅 */
                $window.on('screen:wide', function(event) {
                    var NowStatevertical = $.screen.settings.state[1];
                    if(NowStatevertical=='maxheight'){
                        createFullpage();
                    }
                });
                $window.on('screen:web screen:tablet screen:phone', function(event) {
                    if(fullPageCreated == true){
                        fullPageCreated = false;
                        $.fn.fullpage.destroy('all');
                        $html.attr('data-fpenabled', false);
                    }
                });
                $window.on('screen:maxheight', function(event) {
                    window.Hmode = 'MaxHeight';
                    $wrapper.attr('data-hsize', 'maxheight');
                    var NowStatehorizontal = $.screen.settings.state[0];
                    if(NowStatehorizontal=='wide'){
                        createFullpage();
                    }
                });
                $window.on('screen:minheight', function(event) {
                    window.Hmode = 'MinHeight';
                    $wrapper.attr('data-hsize', 'minheight');
                    if(fullPageCreated == true){
                        fullPageCreated = false;
                        $.fn.fullpage.destroy('all');
                        $html.attr('data-fpenabled', false);
                    }
                });
                setTimeout(function(){
                    var StartStatehorizontal = $.screen.settings.state[1];
                    if(StartStatehorizontal === 'minheight') {
                        $wrapper.attr('data-hsize', 'minheight');
                    } else if(StartStatehorizontal === 'maxheight'){
                        $wrapper.attr('data-hsize', 'maxheight');
                    }
                }, 1);
                
                
                // 비주얼 슬라이드
                const $visualSlide = $('.main_visual .visual_slide .slide_list');
                $visualSlide.slick({
                    autoplay: false,
                    autoplaySpeed: 5000,
                    fade: true,
                    speed: 1000,
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    prevArrow: $('.main_visual .slide_control .prev'),
                    nextArrow: $('.main_visual .slide_control .next'),
                    pauseOnHover: false,
                    pauseOnDotsHover: true,
                    swipe: false,
                    draggable: false,
                    autoArrow: $('.main_visual .slide_control .auto'),
                    isRunOnLowIE: false,
                    pauseOnArrowClick: true,
                    pauseOnDirectionKeyPush: true,
                    pauseOnSwipe: true,
                    pauseOnDotsClick: true,
                    pauseText: '정지',
                    playText: '재생',
                    total: $('.main_visual .slide_control .total'),
                    current: $('.main_visual .slide_control .current'),
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true
                            }
                        }]
                });
                
                

                let video1 = document.getElementById('video1');
                var videoRunTime = 0;
                video1.onloadeddata = function() {
                    var video_duration = document.getElementById('video1').duration;
                    // console.log(video_duration);
                    videoRunTime = video_duration;
                    Loading(video_duration);
                };

                /* video control */
                var $videoControlBtn = $('.main_visual .visual_box .control_box .video_control'),
                    // $video = $('.main_visual .visual_box .visual_wrap video'),
                    $myVideo = $videoControlBtn.closest('.slide_item').find('video'),
                    $videoHandle = $myVideo.get(0);
                $videoControlBtn.on('click', function () {
                    var $this = $(this),
                        isPaused = $videoHandle.paused,
                        isPause = $this.is('.pause'),
                        isended = $this.attr('data-ended');
                    if (isPause) {
                        $videoHandle.pause();
                        Loadingpause();
                        $this.attr('data-ended', 'N');
                    } else {
                        $videoHandle.play();
                        if (isended!='Y'){
                            Loadingresume(videoRunTime);
                            $this.addClass('resume');
                        } else {
                            Loading(videoRunTime);
                        }
                    }
                });
                
                video1.addEventListener('ended',endedevent,false);
                function endedevent(e){
                    $videoControlBtn.removeClass('resume').attr('data-ended', 'Y');
                };
                $myVideo.on('play', function () {
                    $videoControlBtn.text('동영상 정지').removeClass('play').addClass('pause');
                });
                $myVideo.on('pause', function () {
                    $videoControlBtn.text('동영상 재생').removeClass('pause').addClass('play');
                });

                
                // 비주얼 타이틀 효과
                // $window.on('load',function(){
                //     $('.main_visual .visual_box .title_box').addClass('active');
                // });
                $('.main_visual .visual_box .title_box').addClass('active');
                

                // 스크롤컨텐츠
                const $scrollContent = $('.scroll_content');
                $scrollContent.each(function () {
                    var $this = $(this),
                        scrollTop = $window.scrollTop(),
                        scrollBottom = scrollTop + $window.height(),
                        contentOffsetTop = $this.offset().top;
                    if(scrollBottom > contentOffsetTop) {
                        $scrollContent.addClass('active');
                    }
                });
                $window.on('scroll', function () {
                    $scrollContent.each(function () {
                        var $this = $(this),
                            scrollTop = $window.scrollTop(),
                            scrollBottom = scrollTop + $window.height(),
                            contentOffsetTop = $this.offset().top;
                        if(scrollBottom > contentOffsetTop) {
                            $this.addClass('active');
                        }/* else {
                            $this.removeClass('active');
                        }*/
                    });
                });


                /* 프로그램 탭 */
                const $tabbox = $('.program .leftbox .tabbox'),
                    $tabBtn = $('.program .leftbox .tabbox .tab_item .tab_btn');

                $tabBtn.on('click', function() {
                    const $this = $(this),
                        $thisItem = $this.closest('.tab_item'),
                        thisActive = $thisItem.is('.active'),
                        thisIndex = $thisItem.index(),
                        $btnbox = $('.program .leftbox .btnbox_item'),
                        $tabcon = $('.program .rightbox .tabcon');
                    if (!thisActive) {
                        $this.attr('title','선택됨');
                        $thisItem.addClass('active');
                        $thisItem.siblings('.tab_item').removeClass('active');
                        $thisItem.siblings('.tab_item').find('.tab_btn').removeAttr('title');
                        $btnbox.eq(thisIndex).addClass('active');
                        $btnbox.eq(thisIndex).siblings().removeClass('active');
                        $tabcon.eq(thisIndex).addClass('active');
                        $tabcon.eq(thisIndex).siblings().removeClass('active');
                    }
                });


                /* 프로그램 슬라이드*/
                const $tabcon = $('.program .rightbox .tabcon');
                $tabcon.each(function () {
                    const $this = $(this),
                        thisIndex = $this.index(),
                        $btnbox = $('.program .leftbox .btnbox_item'),
                        $prevBtn = $btnbox.eq(thisIndex).find('.prev'),
                        $nextBtn = $btnbox.eq(thisIndex).find('.next'),
                        $programSlide = $this.find('.program_slide .slide_list');
                    $programSlide.slick({
                        autoplay: false,
                        dots: false,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: false,
                        prevArrow: $prevBtn,
                        nextArrow: $nextBtn,
                        pauseOnDotsHover: true,
                        swipe: true,
                        draggable: true,
                        isRunOnLowIE: false,
                        pauseOnArrowClick: true,
                        pauseOnDirectionKeyPush: true,
                        pauseOnSwipe: true,
                        pauseOnDotsClick: true,
                        responsive: [
                            {
                                breakpoint: 1001,
                                settings: {
                                    slidesToShow: 2,
                                    variableWidth: true,
                                }
                            },{
                                breakpoint: 641,
                                settings: {
                                    slidesToShow: 1,
                                    variableWidth: true,
                                    centerMode: true,
                                }
                            }]
                    })
                })

                /* 배너 슬라이드 */
                const $bannerSlide = $('.banner .banner_slide .slide_list');
                $bannerSlide.slick({
                    autoplay: true,
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    prevArrow: $('.banner .banner_slide .control_box .prev'),
                    nextArrow: $('.banner .banner_slide .control_box .next'),
                    pauseOnDotsHover: true,
                    swipe: true,
                    draggable: true,
                    autoArrow: $('.banner .banner_slide .control_box .auto'),
                    isRunOnLowIE: false,
                    pauseOnArrowClick: true,
                    pauseOnDirectionKeyPush: true,
                    pauseOnSwipe: true,
                    pauseOnDotsClick: true,
                    pauseText: '정지',
                    playText: '재생',
                    total: $('.banner .banner_slide .control_box .total'),
                    current: $('.banner .banner_slide .control_box .current'),
                    customState: function (state) {
                        if (state.current < 10) {
                            state.current = '0' + state.current;
                        }
                        if (state.total < 10) {
                            state.total = '0' + state.total;
                        }
                        return state;
                    },
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true
                            }
                        }]
                });

                /* 본문 바로가기 */
                $('.accessibility a').click(function () {
                    $('.main_visual .visual_box .slide_control .auto').focus();
                    return false;
                })







                $window.on('screen:wide screen:web', function(event) {
                
                });

                $window.on('screen:tablet screen:phone', function(event) {

                });

            });
        })(window.jQuery);
