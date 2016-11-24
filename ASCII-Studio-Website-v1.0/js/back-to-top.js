$(function(){
	$("#back-to-top").hide();
	//当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
	$(function () {
		$(window).scroll(function(){
			if ($(window).scrollTop()>100){$("#back-to-top").fadeIn(300);}
				else{$("#back-to-top").fadeOut(300);}
			});
		$("#back-to-top").click(function(){ $('body,html').animate({scrollTop:0},200,'','');
			return false;});});
});