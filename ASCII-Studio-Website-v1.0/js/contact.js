$(function(){
	function move(){}


	$(".contact-now-left").click(function(){
		$(".mask").show(); //显示背景色
       $(".PopupLayer").animate({marginTop:"120px"});
	});

	$("#close_poppubg").click(function(){
	$(".PopupLayer").animate({marginTop:"-720px"});
     setTimeout(function(){$(".mask").hide();},400);
  });

   /**翻牌的动画效果*/
	/*var aLi = $('.detail');
	var aImg =  $('.detail img');
	var aSpan = $('.detail span');
		aLi.each(function(index){
					$(this).mouseover(function(){
						aSpan.eq(index).stop();
						aImg.eq(index).stop();
						aImg.eq(index).css({zIndex:1}).animate({
							marginTop:-50,
							height:0
						},50,'',function(){
							$(this).hide();
							aSpan.eq(index).show().css({zIndex:2}).animate({
								marginTop:0,
								height:100
							},50)
						})
					})
					$(this).mouseout(function(){
						aSpan.eq(index).stop();
						aImg.eq(index).stop();
						aSpan.eq(index).css({zIndex:1}).animate({
							margintop:-50,
							height:0
						},50,'',function(){
							$(this).hide();
							aImg.eq(index).show().css({zIndex:2}).animate({
								marginTop:0,
								height:100
							},50)
						})
					})
				})*/


})

