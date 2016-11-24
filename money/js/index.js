/**
 * Created by cmm on 16/3/30.
 */

//全局禁止滚动
//function preventDefault(ev) {
//    ev.preventDefault()
//}
//document.addEventListener('touchmove', preventDefault, false);
//
//
//function isScroller(el) {
//    return el.classList.contains('panel-content');
//}
//
//document.body.addEventListener('touchmove', function (ev) {
//    var target = ev.target;
//    if (isScroller(target)) {
//        console.log(2);
//        ev.stopPropagation()
//    }
//}, false);

var Obj={
    left_main :$("#left-main"),
    side_menu :$("#js-item-1")
};


var Index1={
  bindEvent:function() {
      //绑定左边的点击事件
    Obj.left_main.on("tap", ".button", function () {
        var self = $(this),
            parent = $(this).parent();
        if (parent.hasClass("active")) {
            parent.removeClass("active");
            if (self.hasClass("button-1")) {
                console.log("button-1");
                $(".base-info-panel").removeClass("active");
            } else {
                console.log("button-2");
            }
        } else {
            parent.addClass("active");
            if (self.hasClass("button-1")) {
                $(".base-info-panel").addClass("active");
                console.log("button-1");
            } else {
                console.log("button-2");
            }
        }
    });

      //绑定右边的点击事件
      Obj.side_menu.on("tap",".side-menu-item",function(){
          var self = $(this);
          if(self.hasClass("active")){
              self.removeClass("active");
          }else{
              Obj.side_menu.find(".side-menu-item").removeClass("active");
              self.addClass("active");
          }
      })
  },
  init:function(){
      Index1.bindEvent();
  }
};

Index1.init();








