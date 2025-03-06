(function ($) {
	'use strict';

	var $window = $(window),
		$document = $(document),
		$html = $('html'),
		$head = $('head'),
		$screen = $.screen,
		$inArray = $.inArray;

	$(function () {

		//여기서부터 코드 작성해주세요

		//반응형 테이블 시작
		$('table.table.responsive').not($('.prettyprint').children()).each(function () {
			var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
				TheadExist = $(this).find('thead').length;
			if ((RowSpanExist == false) && (TheadExist != 0)) {//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
				$(this).children('tbody').children('tr').find('th, td').each(function () {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
				$(this).children('tfoot').children('tr').find('th, td').each(function () {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
			}
		});
		
		//가짜 셀렉트 박스
		$(function(){
			var $FakeSelectBox = $('.temp_select_form.fake'),
				$FakeSelectBtn = $FakeSelectBox.find('.temp_select'),
				$FakeSelectList = $FakeSelectBox.find('.select_list'),
				$SelectItem = $FakeSelectList.find('.select_item'),
				$SelectBtn = $SelectItem.find('.select_btn');
			
			$FakeSelectBtn.on('click', function(){
				var $this = $(this),
					$FakeBox = $this.parents('.temp_select_form.fake'),
					$IsSelectList = $FakeBox.find('.select_list'),
					
					IsActive = $FakeBox.is('.active');
		
				if(!IsActive){
					$FakeSelectBox.removeClass('active');
					$FakeSelectList.slideUp(300, 'swing');
		
					$FakeBox.addClass('active');
					$this.attr('title', '목록닫기');
					$IsSelectList.slideDown(300, 'swing');
				} else {
					$FakeBox.removeClass('active');
					$this.attr('title', '목록열기');
					$IsSelectList.slideUp(300, 'swing');
				}
			});

			$SelectBtn.on('click',function(){
				var $ThisBtn = $(this),
					$ThisText = $ThisBtn.parents('.temp_select_form').find('.select_text'),
					BtnText = $ThisBtn.text(),
					$ThisITem = $ThisBtn.parent(),
					$AllItem = $ThisITem.siblings('.select_item'),
					$AllBtn = $ThisITem.find('.select_btn');


				$AllItem.removeClass('active');
				$AllBtn.removeAttr('title');
				$ThisText.text(BtnText);
				$ThisITem.addClass('active');
				$ThisBtn.attr('title','선택됨');
				
				$FakeSelectBox.removeClass('active');
				$FakeSelectList.slideUp(300, 'swing');
				$FakeSelectBtn.attr('title','목록열기');
			});
		});
		/* 스텝박스 높이 */
		$(function(){
			var $StepItemBox = $('.temp_step_box');
			
			$StepItemBox.each(function(){
				var $thisBox = $(this),
					StepType2 = $thisBox.is('.type2'),
					$StepItem = $thisBox.find('.temp_step_item'),
					$StepItemText = $StepItem.find('.desc_text');
				
				//아이템 비교 배열로 구성
				//높이값 비교
				if(!StepType2){

					var HeightArr = $StepItemText.map(function(){
						return $(this).height();
					}).get();
					//가장 높은 높이값 아이템에 부여
					var MaxHeight = Math.max.apply(Math, HeightArr);
					$StepItemText.css('min-height', MaxHeight);

				}else{
					//Step_box type2일경우
					var HeightArr2 = $StepItem.map(function(){
						return $(this).outerHeight();
					}).get();

					var MaxHeight2 = Math.max.apply(Math, HeightArr2);
					$StepItem.css('height', MaxHeight2);

				}
			});
		});
		
		
	});
})(jQuery);