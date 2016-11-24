/*导航栏的动画效果*/
$(function() {
   /* $("#menu2 li a").wrapInner('<span class="out"></span>');*/

   /* $("#menu2 li a").each(function() {
        $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
    });*/
    $("#menu2 li a span").addClass("out");
    $("#menu2 li a span").hover(function() { /*实际上stop加不加无所谓*/
       /* setTimeout(function(){*/$(this).addClass("over");/*},300);*/
      /* $(this).parent().parent().addClass("selected");*/
        $(".out", this).animate({
            'top': '80px'
        }, 1000); // 向下滑动 - 隐藏
        $(".over", this).animate({
            'top': '0px'
        }, 1000); // 向下滑动 - 显示

    }, function() {
        $(".out", this).animate({
            'top': '0px'
        }, 200); // 向上滑动 - 显示
        $(".over", this).animate({
            'top': '-80px'
        }, 200); // 向上滑动 - 隐藏
        $(this).removeClass("over");
       /* $(this).parent().parent().removeClass("selected");*/
    });

$("#menu2 li a span").click(function(){
    $obj=$("#menu2 li a span.selected");
   if(!$(this).hasClass("selected")){
      $(this).addClass("selected");
      $obj.removeClass("selected")
  }
  });

$("#menu2 ul li").click(function(){
    $obj=$("#menu2 ul li.selected");
   if(!$(this).hasClass("selected")){
      $(this).addClass("selected");
      $obj.removeClass("selected")
  }
  });

});