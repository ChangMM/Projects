function preScene(){/*******点击向前翻页图片的效果*********/
	if(flag==1) {
		pflag=1;
		flag=3;
	}else{
		pflag=flag;
		flag=flag-1;
	} 
	showScene(pflag,flag);
}
function nextScene(){/*******点击向后翻页图片的效果*********/
	if(flag==3){
		pflag=3;
		flag=1;
	}else{
		pflag=flag;
		flag=flag+1;
	}
	showScene(pflag,flag);
}

/**鼠标hover之后相关图片显示***/
function show(){
	next.style.visibility="visible";
	pre.style.visibility="visible";
	sliderUl.style.visibility="visible";
}
function hidden(){
	next.style.visibility="hidden";
	pre.style.visibility="hidden";
	sliderUl.style.visibility="hidden";
}

/********li.current的背景色的显示******/
function showLiCurrent(flag){
	for(var i=0,j=slideli.length;i<j;i++){
		removeClass(slideli[i],"current");
	};
	addClass(slideli[flag-1],"current");
}

/**************显示某一场景的效果*****************/
function showScene(pflag,flag){
	showLiCurrent(flag);
	switch (pflag){
		case 1:slider1out();break;
		case 2:slider2out();break;
		case 3:slider3out();break;
	};
	setTimeout(function(){
		switch (flag){
		case 1:slider1in();break;
		case 2:slider2in();break;
		case 3:slider3in();break;
	};
},2000);
	
}

/********slider1的动画开始与消失的测试********/

function slider1in(){
	for (var i = preTransition1.length - 1; i >= 0; i--) {
		 removeClass(preTransition1[i],"preTransition1"); 
	};
	addClass(main,"Transition1");
}
function slider2in(){
	for (var i = preTransition2.length - 1; i >= 0; i--) {
		 removeClass(preTransition2[i],"preTransition2"); 
	};
	addClass(main,"Transition2");
}
function slider3in(){
	for (var i = preTransition3.length - 1; i >= 0; i--) {
		 removeClass(preTransition3[i],"preTransition3"); 
	};
	addClass(main,"Transition3");
}
function slider1out(){
	for (var i = preTransition1.length - 1; i >= 0; i--) {
		 addClass(preTransition1[i],"preTransition1"); 
	};
	setTimeout(function(){removeClass(main,"Transition1");},2000); 
}
function slider2out(){
	for (var i = preTransition2.length - 1; i >= 0; i--) {
		 addClass(preTransition2[i],"preTransition2"); 
	};
	setTimeout(function(){removeClass(main,"Transition2");},2000); 
}
function slider3out(){
	for (var i = preTransition3.length - 1; i >= 0; i--) {
		 addClass(preTransition3[i],"preTransition3"); 
	};
	setTimeout(function(){removeClass(main,"Transition3");},2000); 
}


var preTransition1=getElementsByClass("preTransition1","*");
var preTransition2=getElementsByClass("preTransition2","*");
var preTransition3=getElementsByClass("preTransition3","*");

/********/
var flag=1;
var pflag=3;

var next=getElementsByClass("next","img")[0];
var pre=getElementsByClass("pre","img")[0];

var sliderUl=getElementsByClass("sliderUl","ul")[0];
var slideli=sliderUl.getElementsByTagName("li");

var main=getElementsByClass("slider","section")[0];
addEvent(main,"mouseenter",function(){show();});
addEvent(main,"mouseleave",function(){hidden();});
addEvent(pre,"click",function(){clearInterval(timer); preScene();timer=setInterval(nextScene,10000);});
addEvent(next,"click",function(){clearInterval(timer);nextScene();timer=setInterval(nextScene,10000);});

addEvent(slideli[0],"click",function(){
	if(flag==1) return;
	else{
		clearInterval(timer);
		pflag=flag;flag=1;
		showLiCurrent(flag);
		showScene(pflag,flag);
		timer=setInterval(nextScene,10000);
	}
});
addEvent(slideli[1],"click",function(){
	if(flag==2) return;
	else{
		clearInterval(timer);
		pflag=flag;flag=2;
		showLiCurrent(flag);
		showScene(pflag,flag);
		timer=setInterval(nextScene,10000);
	}
});
addEvent(slideli[2],"click",function(){
	if(flag==3) return;
	else{
		clearInterval(timer);
		pflag=flag;flag=3;
		showLiCurrent(flag);
		showScene(pflag,flag);
		timer=setInterval(nextScene,10000);
	}
});

setTimeout(slider1in,500);
var timer=setInterval(nextScene,10000);//自动显示

touchfun(main);
/*******移动端滑动事件*******/
function touchfun(obj) {
    //滑动范围在5x5内则做点击处理，s是开始，e是结束
    var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};
    obj.addEventListener("touchstart",function(){
        init.sx = event.targetTouches[0].pageX;
        init.sy = event.targetTouches[0].pageY;
        init.ex = init.sx;
        init.ey = init.sy;
    }, false);
 
    obj.addEventListener("touchmove",function() {
        event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
        init.ex = event.targetTouches[0].pageX;
        init.ey = event.targetTouches[0].pageY;
    }, false);
 
    obj.addEventListener("touchend",function() {
        var changeX = init.sx - init.ex;
        var changeY = init.sy - init.ey;
        if((Math.abs(changeX)>init.x)&&(changeX>0)&&(Math.abs(changeX))>(Math.abs(changeY))) {
           clearInterval(timer); 
           preScene();
           timer=setInterval(nextScene,10000);   
        }
        if((Math.abs(changeX)>init.x)&&(changeX<0)&&(Math.abs(changeX))>(Math.abs(changeY))){
        	clearInterval(timer); 
            nextScene();
            timer=setInterval(nextScene,10000);
        }
    }, false);
};