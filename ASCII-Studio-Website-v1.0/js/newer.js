$(document).ready(function() {
	
	$('#nav').onePageNav();

	var p=$(".person-head p");
	var div=$(".same-style")
	p.each(function(index){
		$(this).click(function(){
			$selected=$(".person .selected");
			if(!div.eq(index).hasClass("selected")){
				$selected.animate({top:-350},500,'','');
				div.eq(index).animate({top:62},500,'',function(){/**四个参数*/
					$selected.css("top","-350px");
					div.eq(index).addClass("selected");
					$selected.removeClass("selected");	
				})
			}
		});
		
	});

/********时间树********/

	$(".main .year .list").each(function (e, target) {
	    var $target=  $(target),
	        $ul = $target.find("ul");
	    $target.height($ul.outerHeight()), $ul.css("position", "absolute");
	}); 
	$(".main .year>h2>a").click(function (e) {
	    e.preventDefault();
	    $(this).parents(".year").toggleClass("close");
	});

});