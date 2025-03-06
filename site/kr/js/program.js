(function ($) {
	'use strict';
    
	var $window = $(window),
		$document = $(document),
		$html = $('html'),
		$head = $('head'),
		$screen = $.screen,
		$inArray = $.inArray;
    
	$(function () {
		//나의 신청결과 조회 탭
		$(function(){
			var $ItemWarp = $('.result'),
				$FormTabItem = $ItemWarp.find('.form_tab_item'),
				$TabBtn = $FormTabItem.find('.form_tab_btn'),

				$TableItem = $ItemWarp.find('.tab_table_box .table_item');

			$TabBtn.on('click',function(){
				var $this = $(this),
					index = $TabBtn.index(this),
					$ThisTabItem = $this.parents('.form_tab_box .form_tab_item');

				$TabBtn.removeAttr('title');
				$FormTabItem.removeClass('active');
				$TableItem.removeClass('active');

				$this.attr('title','선택됨');
				$ThisTabItem.addClass('active');
				$TableItem.eq(index).addClass('active');
			});
		});

		//교육,체험,관람 상세정보 슬릭
		$(function(){
			var $ViewBox = $('.view_details .view_box'),
				$ImgList = $ViewBox.find('.img_list'),
				$ImgBtnBox = $ViewBox.find('.img_btn_box'),
				$SlickText = $ImgBtnBox.find('.slick_text'),
				$Count = $SlickText.find('.count'),
				$Total = $SlickText.find('.total');

			//페이지 넘버
			function updatePageCount(slick){
				var num = (slick.currentSlide || 0) + 1;
				var page = Math.ceil(num); //현재 페이지
				var totalPage = Math.ceil(slick.slideCount);//전체 페이지

				var ThisCount = $Count.text('0' + page);
				var ThisTotal = $Total.text('0' + totalPage);
				var CountLength = ThisCount.text().length;
				var TotalLength = ThisTotal.text().length;

				//강제로 2자리수로 구현
				if(CountLength === 3){
					$Count.text(page);
				}else{
					ThisCount;
				}
				if(TotalLength === 3){
					$Total.text(totalPage);
				}else{
					ThisTotal;
				}
			}

			updatePageCount($ImgList.slick('getSlick'));

			$ImgList.on('init reInit afterChange',function(event, slick){
				setTimeout(function(){
					updatePageCount(slick);
				},0);
			});

			$ImgList.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				prevArrow: $('.img_btn_box .prev'),
				nextArrow: $('.img_btn_box .next'),
				total: $('.img_btn_box .sum'),
				current: $('.img_btn_box .count'),
				draggable: false,
				variableWidth: false,
			});

			var $TabBoxWrap = $ViewBox.find('.tab_box_wrap'),
				$TabBtnBox = $TabBoxWrap.find('.tab_btn_box'),
				$TabBtnItem = $TabBtnBox.find('.tab_btn_item'),
				$TabBtn = $TabBtnItem.find('.tab_btn'),

				$TabTextBox = $TabBoxWrap.find('.tab_text_box'),
				$TabTextItem = $TabTextBox.find('.tab_text_item');

			$TabBtn.on('click',function(){
				var $this = $(this),
					Index = $TabBtn.index(this),
					$ThisBtnItem = $this.parents('.tab_btn_item');

				$TabBtn.removeAttr('title');
				$TabBtnItem.removeClass('active');
				$TabTextItem.removeClass('active');

				$this.attr('title','선택됨');
				$ThisBtnItem.addClass('active');
				$TabTextItem.eq(Index).addClass('active');
			});
		});
		//교육,체험,관람 상세정보(팝업)
		$(function(){
			var $TextBtn = $('.program_template .popup_btn'),
				$DistinctBox = $('.distinct_box'),
				$ChBtn = $DistinctBox.find('.temp_btn .btn'),
				$CloseBtn = $DistinctBox.find('.close_btn');

			$TextBtn.on('click',function(){
				var $this = $(this),
					$Distinct = $this.closest('.program_template').find('.distinct_box');

				$DistinctBox.removeClass('active');
				$Distinct.addClass('active');

				console.log($Distinct);
				console.log($DistinctBox);
			});
			$ChBtn.on('click',function(){
				$DistinctBox.removeClass('active');
			});
			$CloseBtn.on('click',function(){
				$DistinctBox.removeClass('active');
			});
		});

		//교육,체험,관람 신청(달력)
		$(function(){

			var $CalenderBox = $('.form_calender .calender_add_box'),
				$CalenderTable = $CalenderBox.find('.calender_table'),
				$TdIndex = $CalenderTable.find('tbody tr td'),
				//달력 월 버튼
				$PrevMonthBtn = $CalenderTable.find('.prev_month'),
				$NextMonthBtn = $CalenderTable.find('.next_month'),
				//달력 연도, 월 텍스트
				DayTears = $CalenderTable.find('.day_title .years').text(),
				DayMonth = $CalenderTable.find('.day_title .month').text(),

				//달력 일 버튼
				$Possible = $CalenderTable.find('.possible'),
				$DayBtn = $CalenderTable.find('.day_btn'),

				//시간선택
				$TimeSelectBox = $CalenderBox.find('.time_select_box'),
				$OpeningBox = $TimeSelectBox.find('.opening_box'),
				$ChoiceBox = $TimeSelectBox.find('.choice_box'),

				$DayValueData = $TimeSelectBox.find('.day_title_box .day_value'),
				$RoundData = $TimeSelectBox.find('.bold_text'),
				$TimeData = $TimeSelectBox.find('.time_data'),
				
				//선택정보
				$DataText = $TimeSelectBox.find('.data_text'),
				$DayData = $DataText.find('.day_text'),
				$RoundText = $DataText.find('.round'),
				$TimeText = $DataText.find('.time_text');

			var DayDataArr = ['일','월','화','수','목','금','토'];
			$OpeningBox.addClass('active');
			$DayBtn.on('click',function(){
				var $this = $(this),
					DayData = $this.find('em').text(),
					$ThisPossible = $this.parents('.possible');
					
				$Possible.removeClass('active');
				$ThisPossible.addClass('active');

				var tdIndex = $this.closest('td').index();
				//tdIndex에 맞춰 DayDataArr에서 값 추출
				//+ 배열의 길이가 넘어가지않게 순환시켜주기
				//예시 - tdIndex  = 0, index값 % arr개수 = DayDataArr[0]
				//예시2 - tdIndex  = 8, 8 % 7 = DayDataArr[1]
				var daytextItem = DayDataArr[tdIndex % DayDataArr.length];
				var AllData = (DayTears + '-' + DayMonth + '-' + DayData + '(' + daytextItem + ')' );

				/* //날짜데이터 적용
				$DayValueData.text(AllData);
				$DayData.text(AllData); */

				$OpeningBox.removeClass('active');
				$ChoiceBox.addClass('active');

			});

			//사용자 신청정보 입력
			$(document).ready(function() {
				$('.phone_form .temp_input').on('input', function() {
					// 숫자만 입력 가능하게 필터링
					$(this).val($(this).val().replace(/[^0-9]/g, ''));
				});
			});

			//신청자 정보 입력 체크시 테이블추가
			$(document).ready(function() {
				$('.program_template .name_check_box input[type="checkbox"]').on('change', function() {
					var $this = $(this),
						Checked = $this.is(':checked'),
						$ProgramTem = $this.closest('.program_template'), //현재 체크박스가 속한 program_template 박스 찾기
						$table = $ProgramTem.find('.check_item'),
						FirstTr = $table.find('tbody tr:first');
			
					if (!Checked) {
						$table.find('.check_tr').remove(); //해당 program_template 박스 내의 .check_tr만 삭제
					} else {
						FirstTr.after('<tr class="check_tr">' +
							'<th scope="row">' +
								'<span class="pilsu">이용자명</span>' +
							'</th>' +
							'<td class="form_padding">' +
								'<span class="temp_form">' +
									'<input type="text" title="이용자명 입력" class="temp_input">' +
								'</span>' +
							'</td>' +
							'<th scope="row">' +
								'<span class="pilsu">이용자연락처</span>' +
							'</th>' +
							'<td class="form_padding">' +
								'<div class="temp_select_form fake middle_form">' +
									'<button type="button" title="이용자 연락처 첫번호 세자리 선택" class="temp_select">' +
										'<span class="select_text">010</span>' +
									'</button>' +
									'<ul class="select_list">' +
										'<li class="select_item"><button type="button" class="select_btn">010</button></li>' +
										'<li class="select_item"><button type="button" class="select_btn">011</button></li>' +
									'</ul>' +
								'</div>' +
								'<em>-</em>' +
								'<span class="temp_form middle_form phone_form">' +
									'<input type="text" title="이용자 연락처 두번째 네자리 입력" class="temp_input" maxlength="4">' +
								'</span>' +
								'<em>-</em>' +
								'<span class="temp_form middle_form phone_form">' +
									'<input type="text" title="이용자 연락처 세번째 네자리 입력" class="temp_input" maxlength="4">' +
								'</span>' +
							'</td>' +
						'</tr>');
					}
				});
			});
			//개인정보 동의 알림
			$(document).ready(function() {
				var $SelectMsg = $('.select_message'),
					$Radio = $SelectMsg.find('.temp_form input[type="radio"]'),
					$RadioBtn = $SelectMsg.find('.ex_btn_box .radio_link');
				
				$RadioBtn.on('click',function(e){
					var CheckRadio = $Radio.is(':checked'); //체크 상태를 확인
					if(!CheckRadio){
						e.preventDefault();
						alert('개인정보 수집 및 이용에 동의하지 않으면 신청이 불가합니다');
					}
				});
			});

		});
	});
})(jQuery);