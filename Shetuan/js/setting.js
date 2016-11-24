$(function(){
	$("a.avtar").click(function(){
		setTimeout(function(){$(".mask").fadeIn();},100);
 	});
 	$("a.mobile-avtar").click(function(){
		setTimeout(function(){$(".mask").fadeIn();},100);
 	});

	$("#close_poppubg").click(function(){
     setTimeout(function(){$(".mask").fadeOut();},100);
  }); 
});