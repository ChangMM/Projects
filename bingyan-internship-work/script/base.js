/*通过class名来获取节点,其中str为class名，tag为标签名,两个参数均是必须的*/
function getElementsByClass(str,tag){
	var els=document.getElementsByTagName(tag);
	var arr=[];

	for(var i=0,n=els.length;i<n;i++){
		for(var j=0,k=els[i].className.split(" "),l=k.length;j<l;j++){
			if(k[j] == str){
				arr.push(els[i]);
				break;
			}
		}
	}
return arr;
}

/* 获取样式函数getStyle() */
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

/**添加事件监听**/
function addEvent(target,type,handler){
	if(target.addEventListener){
		target.addEventListener(type,handler,false);
	}else{
		target.attachEvent("on"+type,handler);
	}
}
/***去除字符串首尾的空格**/
function trim(str){
    return str.replace(/^\s+|\s+$/g,"");
}

/**添加类名**/
var red=document.getElementById("red");
function addClass(node,classString){
	if(node.className.indexOf(classString)==-1)
		node.className=trim(node.className+" "+classString);
	return node;
}

/**去除类名**/
function removeClass(node,classString){
	var k=node.className;
	k=trim(k.replace(classString,""));
	node.className=k;
	return node;
}

/**动态切换类名**/
function toggelClass(node,classString){
	if(!node.className.indexOf(classString)) addClass(node,classString);
	else removeClass(node,classString);
}