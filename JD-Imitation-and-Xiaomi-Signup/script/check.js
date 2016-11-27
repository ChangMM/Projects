jQuery(document).ready(function($) {
	var $spin=$("#spin");
	var $phone=$("#phone");
	var $password1=$("#password1");
	var $password2=$("#password2");
	var $spinButton=$("#spinButton");

	$phone.keyup(function() {
		var reg= /^[1][358]\d{9}$/;
		if(reg.test($(this).val())){
			$("#spinButton").removeAttr("disabled");
		}else{
			$("#spinButton").attr("disabled","disabled");
		}
	}).click(function(){
		var reg= /^[1][358]\d{9}$/;
		if(reg.test($(this).val())){
			$("#spinButton").removeAttr("disabled");
		}else{
			$("#spinButton").attr("disabled","disabled");
		}
	});
	$spin.blur(
		function(){	
			if($(this).val()==""){
				$(this).addClass('error')
				$(this).next().removeClass('hideError');
			}
		}).focus(
		function(){
			$(this).removeClass('error')
			$(this).next().addClass('hideError');
		});
	$password1.blur(
		function(){	
			var reg=/(?=.*d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}/;//匹配的只是数字和字母

			if(!reg.test($(this).val())){
				$(this).addClass('error')
				$(this).next().removeClass('hideError');
				$(".fa-check-circle").addClass('hideRight1');
			}else{
				$(".fa-check-circle").removeClass('hideRight1');
			}
		}).focus(
		function(){
			$(this).removeClass('error')
			$(this).next().addClass('hideError');
		});
	$password2.blur(
		function(){	
			if($(this).val()==""||($(this).val()!=$password1.val())){
				$(this).addClass('error')
				$(this).next().removeClass('hideError');
				$(".fa-check-circle").addClass('hideRight2');
			}else{
				$(".fa-check-circle").removeClass('hideRight2');
			}
		}).focus(
		function(){
			$(this).removeClass('error')
			$(this).next().addClass('hideError');
		});


});