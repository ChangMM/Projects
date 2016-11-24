function choose(obj1,obj2){
	if(obj1.checked){
		for (var i = obj2.length - 1; i > 0; i--) {
			obj2[i].checked=true;
		};
	}else{
		for (var i = obj2.length - 1; i > 0; i--) {
			obj2[i].checked=false;
		};
	}
}
function move(value){
	obj=document.getElementsByTagName("input");
		for (var i = obj.length - 1; i > 0; i--)
		 {
			if(obj[i].checked)
			{
				var ajax;
 	   if (window.XMLHttpRequest)
    	{
        ajax=new XMLHttpRequest();
    	}
    	else
    	{
        	ajax=new ActiveXObject("Microsoft.XMLHTTP");
    	}
    	ajax.open("post","php/movemenber.php",false);
    	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    	ajax.send("id="+obj[i].value+"&team="+value);
    }
    window.location.href=("menber_setting.php");
		}
}

function alter(obj){
	var $obj=$(obj);
	var $alter_content=$obj.parent().prev().children();
	if(obj.text=="修改"){
		obj.text="确定";
		$alter_content.removeAttr("readonly").addClass("alter").focus();	
	}else{
		ajax($alter_content.attr("name"),$alter_content.val());
		$alter_content.attr("readonly","true").removeClass("alter");
		obj.text="修改";
	}

}

function ajax(name,value){
    var ajax;
    if (window.XMLHttpRequest)
    {
        ajax=new XMLHttpRequest();
    }
    else
    {
        ajax=new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open("post","php/alterinfo.php",false);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send(name+"="+value);
}

function numOnly(obj){
	var sMobile =obj.value;
	var $obj=$(obj);
    if(!(/^[1][358]\d{9}$/.test(sMobile))){
        if(!($obj.next().hasClass("focus")))
    		$obj.next().addClass("focus");
    }else{
    	$obj.next().removeClass("focus");
    }
}

function lengthOnly(obj){
	var $obj=$(obj);
	var content=obj.value;
	if(content.length>12){
		$obj.next().addClass("focus");
	}else{
		$obj.next().removeClass("focus");
	}
}

function addFocus(obj){
	var $obj=$(obj);
	var $alter_content=$obj.parent().next().children();	
	$obj.next().removeClass("focus");
}