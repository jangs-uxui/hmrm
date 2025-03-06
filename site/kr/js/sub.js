$('#shareUrl').val(window.location.href);
$('#shareUr2').val(window.location.href);

function copyToClipboard(text) {
	var inputc = document.body.appendChild(document.createElement('input'));
	inputc.value = window.location.href;
	inputc.focus();
	inputc.select();
	document.execCommand('copy');
	inputc.parentNode.removeChild(inputc);
	alert('클립보드에 복사되었습니다.');
}

(function ($) {
	'use strict';

	var $window = $(window),
		$document = $(document),
		$html = $('html'),
		$head = $('head'),
		$screen = $.screen,
		$inArray = $.inArray;

	$(function () {

		//사이드
		var $container = $('#container'),
			$side = $container.find('.side'),
			$sideDepthItem = $side.find('.depth_item'),
			$sideSpy = $side.find('.spy:last');

		$sideDepthItem.on('click.menu', function (event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target,
				IsActive = $this.is('.active');

			if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if ($this.hasClass('depth1_item')) {
					if ($this.hasClass('active')) {
						$html.removeClass('side_open');
					} else {
						$html.addClass('side_open');
					}
				}

				if ($this.children('.depth').length) {
					var $Depth = $this.children('.depth'),
						DepthDisplay = $Depth.css('display');
					if (DepthDisplay !== 'none') {//하위메뉴가 display:none이 아니면 실행
						if (!IsActive) {
							$this.removeClass('active_prev active_next');
							$this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
							$this.prev('.depth_item').addClass('active_prev');
							$this.next('.depth_item').addClass('active_next');
						} else {
							$this.removeClass('active');
							$this.siblings('.depth_item').removeClass('active_prev active_next');
						}
						event.preventDefault();
					}
				}
			}

			event.stopPropagation();
		}).each(function (index, element) {
			var $element = $(element);

			if ($element.children('.depth').length) {
				$element.addClass('has');
			} else {
				$element.addClass('solo');
			}
		});

		if ($sideSpy.length) {
			$html.addClass('side_open');
			$sideSpy.parents('.depth_item').addClass('active');
			$sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
			$sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
		}

		//여기서부터 코드 작성해주세요
		//side 메뉴 active 코드
		$(function(){
			var $PathItemList = $('#container .sub_head .path_box .path_item_list'),
				$PathItem = $PathItemList.find('.path_item'),
				$EtcWrap = $PathItemList.find('.etc_wrap');

			//side 메뉴
			$PathItem.each(function(){
				var $this = $(this),
					$PathBtn = $this.find('button.path_btn');
				$PathBtn.on('click', function(){
					var $thisBtn = $(this),
						ItemIndex = $thisBtn.parent().index(),
						$ThisPathItem = $thisBtn.parent('.path_item'),
						IsActive = $ThisPathItem.is('.active'),
						$PathListThis = $thisBtn.siblings('.path_menu_list');
			
					if (ItemIndex == 0) {
						if ($PathItemList.hasClass('first_item')) {
							$PathItemList.removeClass('first_item');
						} else {
							$PathItemList.addClass('first_item');
						}
					} else {
						$PathItemList.removeClass('first_item');
					}							
						
					if(!IsActive){
						//제거
						$PathItem.removeClass('active');
						$PathItem.find('.path_menu_list').slideUp('200','swing');
						$PathItem.find('button.path_btn').attr('title','메뉴 리스트 열기');
						$PathItem.removeClass('prev_item');
						//추가
						$ThisPathItem.addClass('active');
						$thisBtn.attr('title','메뉴 리스트 닫기');
						$PathListThis.slideDown('200','swing');
						$ThisPathItem.prev().addClass('prev_item');
					}else{
						$ThisPathItem.removeClass('active');
						$thisBtn.attr('title','메뉴 리스트 열기');
						$PathListThis.slideUp('200','swing');
						$ThisPathItem.prev().removeClass('prev_item');
					}
				});	
			});

			//공유하기
			var $EtcList = $EtcWrap.find('.etc_list'),
				$EtcItem = $EtcList.find('.etc_item'),
				$EtcBtnShare = $EtcList.find('.etc_item.share .etc_btn'),
				$EtcCloseBtn = $EtcItem.find('.share_list .share_item .etc_close_btn');
			
			$EtcBtnShare.on('click', function(){
				var $EtcThis = $(this),
					IsShareOpen = $EtcThis.parent().is('.share_open');
				if(!IsShareOpen){
					$EtcItem.removeClass('share_open');
					$EtcThis.attr('title','공유 리스트 닫기').parent().addClass('share_open');
				}
			});
			//공유하기 닫기버튼
			$EtcCloseBtn.on('click',function(){
				var $thisClose = $(this),
					IsShareClose = $thisClose.parent().parent().is('.share_open');
				if(!IsShareClose){
					$thisClose.attr('title','공유 리스트 닫기');
					$EtcBtnShare.attr('title','공유 리스트 열기');
					$EtcItem.removeClass('share_open');
				}
			});
			
			//모바일 공유하기(전용)
			var $EtcBox = $('.visual_title .m_etc_box'),
				$EtcBtn = $EtcBox.find('.m_etc_btn');

			$EtcBtn.on('click',function(){
				var $thisEtcBtn = $(this),
					IsMobileShareOpen = $thisEtcBtn.parent().is('.m_share_open');

				if(!IsMobileShareOpen){
					$EtcBox.removeClass('.m_share_open');
					$thisEtcBtn.attr('title','공유 리스트 열기').parent().addClass('m_share_open');
				}
			});

			//모바일 공유하기(전용) 닫기버튼
			var $MobileCloseBtn = $EtcBox.find('.m_share_item.close button.m_share_link');

			$MobileCloseBtn.on('click',function(){
				var $MobileThisClose = $(this),
					MobileIsShareClose = $MobileThisClose.parent().parent().is('.m_share_open');
				if(!MobileIsShareClose){
					$MobileThisClose.attr('title','공유 리스트 닫기');
					$EtcBox.removeClass('m_share_open');
				}
			});
		});
	});
})(jQuery);