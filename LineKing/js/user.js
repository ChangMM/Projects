(function(){
	function alterInfo(){
		function showmask(mask,window){/**mask与window均为jquery对象*/
			mask.fadeIn(400, function() {
				window.addClass('tada');
			});
		}
		function hidemask(mask,window){
			mask.fadeOut(400, function() {
			});
		}
		$("#passwordwindow").on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
		});
		$("#avatarwindow").on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
		});

		$("#alterpass").on("click",function(){
			showmask($("#passwordmask"),$("#passwordwindow"));
		});
		$("#alteravatar").on("click",function(){
			showmask($("#avatarmask"),$("#avatarwindow"));
		});
		$("i.passclose").on("click",function(){
			hidemask($("#passwordmask"),$("#passwordwindow"));
		});
		$("i.avatarclose").on("click",function(){
			hidemask($("#avatarmask"),$("#avatarwindow"));
		});
		$("#passwordmask").on("click",function(){
			hidemask($("#passwordmask"),$("#passwordwindow"));
		});
		$("#avatarmask").on("click",function(){
			hidemask($("#avatarmask"),$("#avatarwindow"));
		});
	}
	alterInfo();
	$("#altername").on("click",function(){
		if($(this).text()=="修改"){
			$(this).text("保存");
			$(this).parent().prev().find("input").addClass('active');
			$(this).parent().prev().find("input").focus();
			return ;
		}else{
			$(this).text("修改");
			$(this).parent().prev().find("input").removeClass('active');
		}
	});
	function checkInput(){
		for(var i=0,j=$("input.table").length;i<j;i++){

			if($("input.table").eq(i).val()==""){
				$("input.table").eq(i).addClass('active');
			}
		}
	}
	checkInput();
	/*************用户中心的动画*************/
	var z=2;
	var isSlide=false;
	$("#user-content").on('click', 'section', function(event) {/**点击事件的对象是section*/
		slideSelect($(this));
		event.preventDefault();
	});

	function slideOther(){
		$('#user-content section.noactive').each(function() {
			z++; 
			$(this).css({'z-index':z,"top":(z-3)*40+"px"},100,function(){

			}); 
		});
	}
	function slideSelect(obj){
		if(isSlide){
			return ;
		}
		if(obj.css("z-index")==6){
			return ;
		}
		isSlide=true;
		obj.animate({"top":"-"+obj.height()+"px"},
			400,
			function(){
				obj.css('z-index',7);
				obj.removeClass('noactive');
				setTimeout(slideOther,400);
				obj.animate({"top":"120px"},{
					easing:"easeOutBounce",
					duration:400,
					complete:function(){
						setTimeout(function(){
							obj.css("z-index",6);
							obj.addClass('noactive');
							z=2;
							isSlide=false;
						},400);
					}
				});
		});
	}
	/*************切换用户中心的现实样式***********/
	$("#ulsecond").on("click","li",function(){
		if($(this).hasClass('active')){
			return ;
		}else{
			$("#ulsecond li").removeClass("active");
			$(this).addClass("active");
			if($(this).index()==0){
				$("#user-content").removeClass("two").addClass('one');
			}else{
				$("#user-content").removeClass("one").addClass('two');
			}
		}
	});
})();        