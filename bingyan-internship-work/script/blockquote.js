/**引用部分slide的函数**/
function move(i){
		var timer=null;
		//clearInterval(timer);
		timer=setInterval(function(){
			var target=-480*i;
			var attrValue=parseInt(getStyle(left_slider,'left')); 
			var dx=target-attrValue;
			var speed;
			if(dx<0)
				speed=-10;
			else
				speed=10;
			if(target==attrValue) clearInterval(timer); //如果到达目标点，关闭定时器
			else{
				left_slider.style.left=attrValue+speed+'px';
			}
		},5);
}


/**显示数字**/
function displayNum(node,obj,other){
	/**时间的控制有问题**/
	function display(){
		node.innerHTML=obj[0]+other;
		if(obj[0]<obj[1]){
			obj[0]++;
		}else{
			clearInterval(setInterval(display,Math.ceil(100/obj[1])));
		}
		
	}
	setInterval(display,Math.ceil(100/obj[1]));
}


/**统一显示数字滚动**/
function numChange(){
	/**获取四个数字变动的p对象**/
	var day=document.getElementById("day");
	var client=document.getElementById("client");
	var problem=document.getElementById("problem");
	var teammater=document.getElementById("teammater");
	/***获取承载p变动的div对象**/
	var num_change=getElementsByClass("num-change","section")[0];
	/**分别获取div对象top的值，滚轮的scrollTop的值，及页面高度**/
	var divOffsetTop=num_change.offsetTop;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
	//console.log("scrollTop:"+scrollTop+"pageHeight:"+pageHeight);
	if((pageHeight+scrollTop)>divOffsetTop+200){/**满足条件时，数字变化**/
		//alert("niihao");
		displayNum(day,global.day,"");
		displayNum(client,global.client,"+");
		displayNum(problem,global.problem,"");
		displayNum(teammater,global.teammater,"");
	}
}

/***导航栏的变化***/
function headerChange(){
	var header=getElementsByClass("header-nav","header")[0];
	var headli=header.getElementsByTagName("li");
	var headimg=header.getElementsByTagName("img")[0];
	var headerScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	if(headerScrollTop>30){
		header.style.position="fixed";
		header.style.top=0;
		for (var i = headli.length - 1; i >= 0; i--) {
			removeClass(headli[i],"ptb30");
			addClass(headli[i],"ptb20");
		};
		headimg.style.marginTop="18px";
	}else{
		header.style.position="static";
		for (var i = headli.length - 1; i >= 0; i--) {
			removeClass(headli[i],"ptb20");			
			addClass(headli[i],"ptb30");
		};
		headimg.style.marginTop="24px";
	}
}

/**动态改变作品处图片的宽度**/
function changeImgWidth(){
	var workimg=getElementsByClass("work-img","div")[0];
	var img=workimg.getElementsByTagName("img");
	var pageWidth=document.documentElement.clientWidth||document.body.clientWidth;
	for(var i=0,j=img.length;i<j;i++){
		img[i].width=pageWidth/4;
	}
}

changeImgWidth();
window.onresize=changeImgWidth;

addEvent(window,"scroll",function(){headerChange();})

/**关于数字变化的数据的初始化设置**/
var global={};
global={
	day:[0,365],
	teammater:[0,127],
	client:[0,176],
	problem:[0,2813]
};

window.onscroll=numChange;


var ulChange=getElementsByClass("change","ul");
var liChange=ulChange[0].getElementsByTagName("li");
var left_slider=getElementsByClass("left-slider","div")[0];
/**用for循环添加事件监听老是出错，只好先这样了，真是无语**/
/*不明白这样为啥不行
for (var i =0, j=liChange.length; i<j; i++) {
	addEvent(liChange[i],"click",function(event){
		event=event||window.event;
		alert(event.target);
		move(i);
		for(var k=0;k<3;k++){
			removeClass(liChange[k],"current");
		}
		addClass(event.target,"current");
	});
};*/


addEvent(liChange[0],"click",function(event){
	event=event||window.event;
	move(0);
	for(var i=0;i<3;i++){
		removeClass(liChange[i],"current");
	}
	addClass(event.target,"current");
});	
addEvent(liChange[1],"click",function(event){
	event=event||window.event;
	move(1);
		for(var i=0;i<3;i++){
		removeClass(liChange[i],"current");
	}
	addClass(event.target,"current");
});
addEvent(liChange[2],"click",function(event){
	event=event||window.event;
	move(2);
		for(var i=0;i<3;i++){
		removeClass(liChange[i],"current");
	}
	addClass(event.target,"current");
});





