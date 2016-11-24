(function(){
	function loginAregister(){
		function showmask(mask,window){/**mask与window均为jquery对象*/
			mask.fadeIn(400, function() {
			});
		}
		function hidemask(mask,window){
			mask.fadeOut(400, function() {
			});
		}
		$("#loginwindow").on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
		});
		$("#registerwindow").on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
		});
		$("#forgrtpasswindow").on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
		});
		$("#editwindow").on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
		});
		/**注册登陆**/
		$(".nav  #login").on("click",function(){
			showmask($("#loginmask"),$("#loginwindow"));
		});
		$(".nav  #register").on("click",function(){
			showmask($("#registermask"),$("#registerwindow"));
		});
		/**忘记密码**/
		$("#forgetpass").on("click",function(){
			$("#loginmask").fadeOut();
			showmask($("#forgetpassmask"),$("#forgetpasswindow"));
		});
		$(".startedit").on("click",function(){
			showmask($("#editmask"),$("#editwindow"));
		});


		$("i.loginclose").on("click",function(){
			hidemask($("#loginmask"),$("#loginwindow"));
		});
		$("i.registerclose").on("click",function(){
			hidemask($("#registermask"),$("#registerwindow"));
		});
		$("i.forgetpassclose").on("click",function(){
			hidemask($("#forgetpassmask"),$("#forgetpasswindow"));
		});
		$("i.editclose").on("click",function(){
			hidemask($("#editmask"),$("#editwindow"));
		});

		$("#loginmask").on("click",function(){
			hidemask($("#loginmask"),$("#loginwindow"));
		});
		$("#registermask").on("click",function(){
			hidemask($("#registermask"),$("#registerwindow"));
		});
		$("#forgetpassmask").on("click",function(){
			hidemask($("#forgetpassmask"),$("#forgetpasswindow"));
		});
		$("#editmask").on("click",function(){
			hidemask($("#editmask"),$("#editwindow"));
		}); 

		$("#hashao").on("click",function(){
			$("#registermask").fadeOut();
			showmask($("#loginmask"),$("#loginwindow"));
		});
		$("#quickreg").on("click",function(){
			$("#loginmask").fadeOut();
			showmask($("#registermask"),$("#registerwindow"));
		});
	}
	loginAregister();
	/**********************/
	/**去掉首尾的空格**/
	function trim(str){
		if(str==" "){
			return "";
		}
    	return str.replace(/^\s+|\s+$/g,"");
	}
	function checkEmail(email){
		var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!myreg.test(email.val())){
            return false;
        }
        return true;
	}
	function checkName(name){//参数为jquery对象
		if(trim(name.val())==""){
			return false;
		}
		return true;
	}
	function checkPass(pass1,pass2){
		if(trim(pass1.val())!=trim(pass2.val())){
			return false;
		}
		return true;
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
	$(".login-button").on("click",function(){
		if(!checkName($("#login-username"))){
			showError("用户名不能为空哦。。。");
			return ;
		}
		if(!checkNull($("#login-password"))){
			showError("密码好像忘了。。。");
			return ;
		}	
	});
	$(".register-button").on("click",function(){
		if(!checkName($("#register-username"))){
			showError("用户名不能为空哦。。。");
			return ;
		}
		if(!checkEmail($("#email"))){
			showError("还是在检查一下邮箱格式吧。。")
		}
		if(!checkNull($("#register-password"))){
			showError("密码好像忘了。。。");
			return ;
		}
		if(!checkPass($("#register-password"),$("#s-register-password"))){
			showError("我没看错的话，两次密码好像不一样吧。。。");
			return ;
		}
	});

	/**************评论框的变化************/
	var isSlide=false;
	$("body").on("click",".comment",function(event){
		event.stopPropagation();
		if(!isSlide){
			isSlide=true;
			$(this).animate({"height":"80px"},300,function(){
				isSlide=false;
			});
		}else{
			return ;
		}
	});
	$("body").on("focus",".comment",function(event){
		event.stopPropagation();
		if(!isSlide){
			isSlide=true;
			$(this).animate({"height":"80px"},300,function(){
				isSlide=false;
			});
		}else{
			return ;
		}
	});
	$("body").on("click",function(event){
		event.stopPropagation();
		if(!isSlide){
			isSlide=true;
			$(".comment").animate({"height":"30px"},300,function(){
				isSlide=false;
			});
		}else{
			return ;
		}
	});
	/******************评论框的变化*****************/

	/***************选择发帖的类型***********/
	var card={};
	card.typevalue="1";
	var leftword="";
	$(".type").on("click",function(){
		$(".type").removeClass('active');
		$(this).addClass('active');
		card.typevalue=$(this).attr('type-value');
	})
	/***************选择发帖的类型***********/
	/**********发帖的字数限制***********/
	$("#edit").on("keyup",function(){
		var word=100-$(this).val().length;
		if(word>20){
			leftword="剩"+word+"字";
		}
		if((word>0)&&(word<=20)){
			leftword="只剩"+word+"字";
		}
		if(word==0){
			leftword="无法输入";
		}
		$("#word").text(leftword);
	});
	$("#edit").on("keydown",function(){
		var word=100-$(this).val().length;
		if(word>20){
			leftword="剩"+word+"字";
		}
		if((word>0)&&(word<=20)){
			leftword="只剩"+word+"字";
		}
		if(word==0){
			leftword="无法输入";
		}
		$("#word").text(leftword);
	});
	$("#edit").on("change",function(){
		var word=100-$(this).val().length;
		if(word>20){
			leftword="剩"+word+"字";
		}
		if((word>0)&&(word<=20)){
			leftword="只剩"+word+"字";
		}
		if(word==0){
			leftword="无法输入";
		}
		$("#word").text(leftword);
	});
	/**********发帖的字数限制***********/

	/***点赞，战队，收藏，举报的效果***/
	$(".main-left").on("click",".card-line",function(){
		var target=$(this).parent().parent().next().next().find($("#comment"));
		target.focus();
	});
	


})();