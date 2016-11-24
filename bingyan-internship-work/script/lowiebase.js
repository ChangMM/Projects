/**添加事件监听**/
function addEvent(target,type,handler){
	if(target.addEventListener){
		target.addEventListener(type,handler,false);
	}else{
		target.attachEvent("on"+type,handler);
	}
}
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