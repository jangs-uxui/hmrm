// 오른쪽 공백 제거
function Rtrim( str ) {
	var src = new String(str);
	var tmp = new String();
	var i,lastnum, len = src.length;
	for(i = len;i >= 0;i--) {
		tmp = src.substring(i,i-1);
		if (tmp != ' ' ) {
			lastnum = i;
			break;
		}
	}
	tmp = src.substring(0,lastnum);
	return tmp;
}

// 왼쪽 공백 제거
function  Ltrim( str ) {
	var src = new String( str );
	var tmp = new String();
	var i,firstnum, len = src.length;
	for(i = 0;i < len ;i++) {
		tmp = src.substring(i,i+1);
		if (tmp != ' ' ) {
			firstnum = i;
			break;
		}
	}
	tmp = src.substring(firstnum);
	return tmp;
}

// 양쪽 공백 제거
function Trim( str ) {
	var src = new String(str);
	var tmp = new String();
	tmp = Ltrim(Rtrim(str));
	return tmp;
}

// 날짜 체크
function isYYYYMMDD(y, m, d) { 
	switch (m) { 
	case 2: 
		if (d > 29) return false; 
		if (d == 29)
			if ((y % 4 != 0) || (y % 100 == 0) && (y % 400 != 0)) return false; 
		break; 
	case 4: 
	case 6: 
	case 9: 
	case 11: 
		if (d == 31) return false; 
	} 
	return true; 
} 

// 숫자유무
function isNumeric(s) { 
	for (i=0; i<s.length; i++) { 
		c = s.substr(i, 1); 
		if (c < "0" || c > "9") return false; 
	} 
	return true; 
}

function fn_isRadioChecked( frm, fieldNm) {
	var flag = false;
	for( var LoopI=0; LoopI<frm[fieldNm].length; LoopI++ ) {
		if( frm[fieldNm][LoopI].checked == true ) {
			flag = true;
			break;
		}
	}
	return flag;
}

function fn_setFocus( frm, fieldNm ) {
	frm[fieldNm].focus();
}

function fn_getMessage( fieldType, label ) {
	var msg = "";
	if( fieldType == "SELECT" ) {
		msg = label + "(을)를 선택 해주세요.";
	} else if( fieldType == "INPUT" ) {
		msg = label + "(을)를 입력 해주세요.";
	}
	return msg;
}

function fn_isEmpty( frm, fieldNm ) {
	return ( !Trim(frm[fieldNm].value) ) ? true : false;
}

/* 숫자만 입력 가능하도록 제어 함수 */
function fn_numChk( obj ) {
	if ( /[^0-9]/gi.test(obj.value) ) {
		alert('숫자만 입력 가능합니다.');
		obj.value = '';
		obj.focus();
		return false;
	}
}

/* 확장자 체크 함수
* obj = 파일 아이디
* ext = 확장자. 쉼표로 구분
* */
function checkFileExt(objId, ext) {
	let check = false;
	const extName = $(objId).val().substring($(objId).val().lastIndexOf(".")+1).toLowerCase();
	const str = ext.split(",");
	for (let i=0; i<str.length; i++) {
		if ( extName == $.trim(str[i]) ) {
			check = true; break;
		} else check = false;
	}

	if(!check){ alert("현재 파일 확장자는 " + extName + "입니다.\n" + ext + " 파일만 업로드 가능합니다.\n다시 확인 후 첨부해주세요."); }
	return check;
}

/* 파일 용량 체크 함수
* fileSize = 파일 사이즈
* maxSize = 최대 용량 사이즈 Mbyte 기준
*/
function checkFileSize ( fileSize, maxSize ) {
	let check = false;
	const maxSizeByte = maxSize * 1024 * 1024;
	const fileSizeMbyte = Math.floor(fileSize / 1024 / 1024);

	if ( fileSize < maxSizeByte ) {
		check = true;
	} else check = false;

	if(!check){ alert("현재 파일의 크기는 " + fileSizeMbyte + "M 입니다.\n파일은 최대 " + maxSize + "M 까지만 업로드 가능합니다.\n다시 확인 후 첨부해주세요."); }
	return check;
}

/* 숫자에 콤마 찍기 */
function num2comma( num ) {
	let numb = Trim(num);
	if (numb == 'undefined' || numb == '' || !isNumeric(numb)) return '0';

	return numb.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
