/**
 * 只能输入退格键(Backspace)和删除键(delete)
 */
function getInputBackspaceAndDel(event){
	//46是delete，8是退格符←
    var k = event.keyCode;   
    if (k == 46 || k== 8){
     return true;
    } else {
     return false;
    }
}

/**
 * 屏蔽非英文字母,非删除和非退格键
 * @returns {Boolean}
 */
function getInputEnglishLetter(event){
	//65-90是英文字母
    var k = event.keyCode;   
    if ((k >= 65 && k <= 90) || getInputBackspaceAndDel(event)){
     return true;
    } else {
     return false;
    }
}

/**
 * 屏蔽非数字,非删除和非退格键
 * @returns {Boolean}
 */
function getInputNumber(event){
	//48-57是大键盘的数字键，96-105是小键盘的数字键
    var k = event.keyCode;   
    if ((k <= 57 && k >= 48) || (k <= 105 && k >= 96) || getInputBackspaceAndDel(event)){
     return true;
    } else {
     return false;
    }
}


/**
 * 屏蔽非减号(-)
 * @returns {Boolean}
 */
function getInputMinusSign(event){
	//减号(-)是109
    var k = event.keyCode;   
    if (k == 109){
     return true;
    } else {
     return false;
    }
} 


/**
 * 屏蔽非点号(.)
 * @returns {Boolean}
 */
function getInputDot(event){
	//号(.)是110
    var k = event.keyCode;   
    if (k == 110){
     return true;
    } else {
     return false;
    }
} 


/**
 * 只能输入小数,即点号(.)加数字
 * @param event		事件
 * @param maxLength		保留小数位数，默认保留两位
 * @returns {Boolean}
 */
function getInputDecimal(event, maxLength){	
  var textValue = isIE()?event.srcElement.value:event.target.value; // 兼容IE
  maxLength = maxLength?maxLength : 2
	
	if(getInputNumber(event) || getInputDot(event)){
		//第一位不能输入点号(.)
		if((textValue == null || textValue == "") && getInputDot(event)){
			return false;
		}
		
		if(textValue != null || textValue != ""){
			var textValueArray = textValue.split(".");			
			
			//只能输入一次点号(.)
			if(textValueArray.length == 2 && getInputDot(event)){
				return false;
      }
      // 保留几位数
      if(textValueArray.length == 2 && textValueArray[1].length === maxLength && !getInputBackspaceAndDel(event)){
				return false;
			}
		}

		return true;
	}else{
		return false;
	}
} 


/**
 * 只能输入减号(-)加数字
 * @returns {Boolean}
 */
function getInputMinusSignAndNum(){
	if(getInputNumber() || getInputMinusSign()){
		return true;
	}else{
		return false;
	}
}

/**
 * 只能输入英文字母加数字
 * @returns {Boolean}
 */
function getInputEnglishAndNum(){
	if(getInputNumber() || getInputEnglishLetter()){
		return true;
	}else{
		return false;
	}
}
function isIE() {
  if (!!window.ActiveXObject || "ActiveXObject" in window)
    return true;
  else
    return false;
}