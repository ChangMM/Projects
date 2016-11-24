$(function(){
	  $("#team_info .detail").click(function() { //注册删除按钮点击事件
    $(".mask").show(); //显示背景色
    $(".PopupLayer").animate({marginTop:"60px"});
});

  $("#close_poppubg").click(function(){
    $(".PopupLayer").animate({marginTop:"-660px"});
     setTimeout(function(){$(".mask").hide();},400);
  });
})