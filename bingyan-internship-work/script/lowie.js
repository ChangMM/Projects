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
},50);
	
}

/********slider1的动画开始与消失的测试********/

function slider1in(){
	slider1.style.display="block";
	addClass(main,"Transition1");
}
function slider2in(){
	slider2.style.display="block";
	addClass(main,"Transition2");
}
function slider3in(){
	slider3.style.display="block";
	addClass(main,"Transition3");
}
function slider1out(){
	slider1.style.display="none";
	removeClass(main,"Transition1");
}
function slider2out(){
	slider2.style.display="none";
	removeClass(main,"Transition2"); 
}
function slider3out(){
	slider3.style.display="none";
	removeClass(main,"Transition3");
}
var slider1=document.getElementById("slider1");
var slider2=document.getElementById("slider2");
var slider3=document.getElementById("slider3");

/********/
var flag=1;
var pflag=3;

var next=getElementsByClass("next","img")[0];
var pre=getElementsByClass("pre","img")[0];

var sliderUl=getElementsByClass("sliderUl","ul")[0];
var slideli=sliderUl.getElementsByTagName("li");

var main=getElementsByClass("slider","div")[0];
addEvent(main,"mouseenter",function(){show();});
addEvent(main,"mouseleave",function(){hidden();});
addEvent(pre,"click",function(){clearInterval(timer); preScene();timer=setInterval(nextScene,5000);});
addEvent(next,"click",function(){clearInterval(timer);nextScene();timer=setInterval(nextScene,5000);});

addEvent(slideli[0],"click",function(){
	if(flag==1) return;
	else{
		clearInterval(timer);
		pflag=flag;flag=1;
		showLiCurrent(flag);
		showScene(pflag,flag);
		timer=setInterval(nextScene,5000);
	}
});
addEvent(slideli[1],"click",function(){
	if(flag==2) return;
	else{
		clearInterval(timer);
		pflag=flag;flag=2;
		showLiCurrent(flag);
		showScene(pflag,flag);
		timer=setInterval(nextScene,5000);
	}
});
addEvent(slideli[2],"click",function(){
	if(flag==3) return;
	else{
		clearInterval(timer);
		pflag=flag;flag=3;
		showLiCurrent(flag);
		showScene(pflag,flag);
		timer=setInterval(nextScene,5000);
	}
});

setTimeout(slider1in,200);
var timer=setInterval(nextScene,5000);//自动显示