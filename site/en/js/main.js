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
            pauseText: 'Pause',
            playText: 'Play',
            total: $('.main_visual .slide_control .total'),
            current: $('.main_visual .slide_control .current'),
            // responsive: [
            //     {
            //         breakpoint: 1001,
            //         settings: {
            //             swipe: true,
            //             draggable: true
            //         }
            //     }]
        });
        
        
        // 비주얼 타이틀 효과
        $('.main_visual .visual_box .title_box').addClass('active');
        
        
        // video control
        var $videoControlBtn = $('.main_visual .visual_box .control_box .video_control');
        $videoControlBtn.on('click', function(){
            var $this = $(this),
                $myVideo = $this.closest('.slide_item').find('video'),
                myVideoHandle = $myVideo.get(0),
                isPaused = myVideoHandle.paused,
                isPlay = myVideoHandle.play;
            if (isPaused) {
                myVideoHandle.play();
                $this.removeClass('play').addClass('pause').find('span').text('Pause Video');
            } else{
                myVideoHandle.pause();
                $this.removeClass('pause').addClass('play').find('span').text('Play Video');
            }
        });
        var $visualVideo = $('.main_visual .visual_box .visual_wrap video');
        $visualVideo.on('play', function () {
            $(this).closest('.slide_item').find('.video_control').removeClass('play').addClass('pause').find('span').text('Pause Video');
        });
        $visualVideo.on('pause', function () {
            $(this).closest('.slide_item').find('.video_control').removeClass('pause').addClass('play').find('span').text('Play Video');
        });
        
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
            pauseText: 'Pause',
            playText: 'Play',
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
        
        // exhibit tab
        const $exhibitTabBtn = $('.exhibit .exhibit_box .tab_box .tab_item button');
        $exhibitTabBtn.on('click', function () {
            var $this = $(this),
                $myItem = $this.closest('.tab_item'),
                isActive = $myItem.is('.active'),
                myIndex = $myItem.index(),
                $myConItem = $this.closest('.tab_box').siblings('.con_box').find('.con_item').eq(myIndex),
                $mySlide = $this.closest('.exhibit').find('.exhibit_slide').eq(myIndex),
                $myBg = $('.rowgroup2 .row2 .exhibit_bg').find('.bg_list').eq(myIndex);
            if (!isActive) {
                $this.attr('title', 'selected');
                $myItem.addClass('active').siblings('.tab_item').removeClass('active').find('button').removeAttr('title');
                $myConItem.addClass('active').siblings('.con_item').removeClass('active');
                $mySlide.addClass('active').siblings('.exhibit_slide').removeClass('active');
                $mySlide.find('.slide_list').slick('setPosition');
                $myBg.addClass('active').siblings('.bg_list').removeClass('active');
            }
        });
        
        // exhibit
        const $exhibitSlide = $('.exhibit .rightbox .exhibit_slide');
         // 슬라이드 넘어갈때 해당 room_item, bg_item 활성화
        $exhibitSlide.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            const $this = $(this),
                thisIndex = $this.index(),
                $thisConItem = $this.closest('.exhibit').find('.con_item').eq(thisIndex),
                $thisRoomItem = $thisConItem.find('.room_item').eq(nextSlide),
                $thisBgList = $('.rowgroup2 .row2 .exhibit_bg').find('.bg_list').eq(thisIndex),
                $thisBgItem = $thisBgList.find('.bg_item').eq(nextSlide);
            $thisRoomItem.addClass('active').find('button').attr('title','selected');
            $thisRoomItem.siblings('.room_item').removeClass('active').find('button').removeAttr('title');
            $thisBgItem.addClass('active').siblings('.bg_item').removeClass('active');
        });
         // room_item 선택시 슬라이드 이동
        const $roomBtn = $('.exhibit .con_item .room_item button');
        $roomBtn.on('click', function(){
            var $this = $(this),
                myFloorIndex = $this.closest('.con_item').index(),
                myRoomIndex = $this.closest('.room_item').index(),
                $mySlide = $this.closest('.exhibit').find('.exhibit_slide').eq(myFloorIndex).find('.slide_list');
            $mySlide.slick('slickGoTo',myRoomIndex);
        });
        /* exhibit slide */
        $exhibitSlide.each(function (index, element) {
            const $this = $(element),
                $slideList = $this.find('.slide_list'),
                $slideControl = $this.find('.slide_control');
            $slideList.slick({
                    autoplay: false,
                    speed: 500,
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    prevArrow: $slideControl.find('.prev'),
                    nextArrow: $slideControl.find('.next'),
                    pauseOnDotsHover: true,
                    swipe: true,
                    draggable: true,
                    // autoArrow: $('.banner .banner_slide .control_box .auto'),
                    isRunOnLowIE: false,
                    pauseOnArrowClick: true,
                    pauseOnDirectionKeyPush: true,
                    pauseOnSwipe: true,
                    pauseOnDotsClick: true,
                    // pauseText: 'Pause',
                    // playText: 'Play',
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true
                            }
                        }]
            });
        });

        
        
        
        
        
        
        
        $window.on('screen:wide screen:web', function(event) {
        
        });
        
        $window.on('screen:tablet screen:phone', function(event) {
        
        });
        
    });
})(window.jQuery);
