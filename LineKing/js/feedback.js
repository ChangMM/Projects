(function(){
	/**去掉首尾的空格**/
	function trim(str){
		if(str==" "){
			return "";
		}
    	return str.replace(/^\s+|\s+$/g,"");
	}
	function checkNull(obj){
		if(trim(obj.val())==""){
			return false;
		}
		return true;
	}
	/******************/
	var isAnimated=false;
	function showError(msg){
		if(!isAnimated){
			isAnimated=true;
			$("p.errormsg").text(msg);
			$(".errorTip").animate({
				top: 0},
				400, function() {
				setTimeout(function(){
					$(".errorTip").animate({top:-100},
						400,function(){
							isAnimated=false;
						});
				}, 1500);
			});
		}
	}
	$("#xiance").on("click",function(){
		if(!checkNull($(".feed-name"))){
			showError("抱歉，我们不接受无名英雄");
			return ;
		}
		if(!checkNull($(".feed-way"))){
			showError("联系不到你的话，还能不能约了")
		}
		if(!checkNull($(".feed-content"))){
			showError("什么都没填，难道你是来砸场子的。。。");
			return ;
		}
	});

})();