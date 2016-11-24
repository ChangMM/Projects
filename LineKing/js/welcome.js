;(function(){
	var main=$("#main");
	var pagePosY = 0,
		pageMaxY = 6;
	window.canScroll = true;
	/*********compatile scroll code**********/
	function scrollCallBack(){}
	function pageScroll(direction,callback){
		if(canScroll){
			var tempArr = new Array(arguments[1]);

			if(typeof direction == "string"){
				if(direction=="y"){
					canScroll = false;
					main.animate({top:-pagePosY*100+"%"
					},{
						easing:"easeInOutCirc",
						duration:600,
						complete:function(){
							canScroll = true;
							callbackCheck();
						}
					});
				}
			}
			else{
				switch(direction){
					case 0:
						if(checkPos(0)){
							pagePosY++;
							startScroll(main,"y");
						}
						break;
					case 2:
						if(checkPos(2)){
							pagePosY--;
							startScroll(main,"y");
						}
						break;		
				}
			} 
	}

	function checkPos(dir){
		switch(dir){
			case 0:
				if(pagePosY<pageMaxY-1){
					return true;
				}else{
					return false;
				}
				break;
			case 2:
				if (pagePosY>0) {
					return true;
				}else{
					return false;
				}
				break;
		}
	}
	function startScroll(dom,dir){
		canScroll = false;
		dom.animate({
			top:-pagePosY*100+"%"},
			{easing:"easeInOutCirc",
		     duration: 700,
			 complete:function(){
						canScroll = true;
						callbackCheck();
					}
		});
	}

	function callbackCheck() {
			if (typeof tempArr[0] != "undefined") {
				callback();
			}
	}
}
	var pagePosChange = function(event){
		if(!canScroll){
			return;
		}
		if(event.wheelDelta && event.wheelDelta !=0){
			event.delta=(-event.wheelDelta)>0?1:-1;
		}
		else if(event.detail&& event.detail != 0){
			event.delta=(-event.detail)>0?1:-1;
		}
	
		event.delta = event.delta>0 ? 0 : 2;
		pageScroll(event.delta,scrollCallBack);
	}
	/*****************func1添加的函数，func2删除的函数*****************/
		function addWheelScrollListener(func1,func2){
		if(typeof arguments[1] !="undefined"){
			if (window.removeEventListener) {
				window.removeEventListener("DOMMouseScroll", func2, false);
				window.removeEventListener("mousewheel", func2, false);
			}
			else if (window.detachEvent){
				window.detachEvent("onmousewheel", func2);
			}
			else {
				window.onmousewheel = null;
			}
		}

		if (window.addEventListener) {
			window.addEventListener("DOMMouseScroll", func1, false);
			window.addEventListener("mousewheel", func1, false);
		}
		else if (window.attachEvent) {
			window.attachEvent("onmousewheel", func1);	
		}
		else {
			window.onmousewheel = func1;
		}
	}	
	addWheelScrollListener(pagePosChange);
})();