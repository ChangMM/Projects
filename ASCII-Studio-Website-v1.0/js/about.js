$(function(){

 $("#ymenu").click(function(){
  if($("#ymenu").hasClass("show")){
    $("#ymenu").animate({left: "-180px"});
    $("#ymenu").removeClass("show");
 }else{
  $("#ymenu").animate({left: "0px"});
   $("#ymenu").addClass("show");
}
 });

  $("#side_left_menu .side_list li").click(function(){
    $obj=$("#side_left_menu .side_list li.selected");
   if(!$(this).hasClass("selected")){
      $obj.removeClass("selected");
      $(this).addClass("selected");
  }
  });
 /* $("#about_title").click(function(){
    $obj=$(".selected");
   if($(this).hasClass("selected")){
      $(".selected").next().slideUp(); 
      $(this).removeClass("selected");
   }
    else{
      $(".selected").next().slideUp();
      $obj.removeClass("selected");
      $(this).addClass("selected");
      $(".selected").next().slideDown();
  }
  });*/
if($("body").height()>screen.height-250){/*确保copyright一直在底部*/
   $("#copyright").removeClass("copyright");
}

});