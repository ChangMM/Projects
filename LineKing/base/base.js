/*
   author:By CMM
   date:  2014.7.8
   version:1.0.0
   desc:  this is a base.js
   e-mail:1769111903@qq.com
*/

var  GLOBAL={};
/*
用于生成命名空间
*/
GLOBAL.namespace=function(str){
	var arr=str.split(".");
	var o=GLOBAL;
	for(i=(arr[0]==GLOBAL)?1:0;i<arr.length;i++){
		o[arr[i]]=o[arr[i]]||{};
		o=o[arr[i]];
	}
}

/*
获取id为node值的dom节点的下一个兄弟节点
*/
function getNextNode(node){
	node=typeof node=="string"?document.getElementById(node):node;
	var nextNode=node.nextSibling;
	if(!nextNode){return null;}
	if(!document.all){//此句可以区分ie与Firefox
		while(true){
			if(nextNode.nodeType==1){
				break;
			}else{
				if(nodeNode.nextSibling){
					nextNode=nodeNode.nextSibling;
				}else{
					break;
				}
			}
		}
	}
	return nextNode;
}

/*
获取id为node值的dom节点的上一个兄弟节点
*/
function getPreNode(node){
	node=typeof node=="string"?document.getElementById(node):node;
	var nextNode=node.previousSibling;
	if(!nextNode){return null;}
	if(!document.all){//此句可以区分ie与Firefox
		while(true){
			if(nextNode.nodeType==1){
				break;
			}else{
				if(nodeNode.previousSibling){
					nextNode=nodeNode.previousSibling;
				}else{
					break;
				}
			}
		}
	}
	return nextNode;
}

/*
阻止事件冒泡的函数
*/
function stopPropagation(e){
	e=window.event||e;
	if(document.all){
		e.cancelBubble=true;
	}else{
		e.stopPropagation();
	}
}

/*
封装id为node节点的事件监听函数
*/

function on(node,eventType,handler){
	node=typeof node =="string"?document.getElementById(node):node;
	if(document.all){
		node.attachEvent("on"+eventType,handler);
	}else{
		node.addEventListener(eventType,handler,false);
	}
}



/*
拓展javascript语言的底层接口
*/


/*
去掉首尾的空格
*/
function trim(str){
    return str.replace(/^\s+|\s+$/g,"");
}

/*
通过class名来获取节点,其中str为class名，root为父容器，缺省为body，tag为标签名
*/

function getElementsByClassName(str,root,tag){
	if(root){
		root=typeof root=="string"?document.getElementById(root):root;
	}else{
		root=document.body;
	}
	tag=tag||*;
	var els=root.getElementsByTagName(tag);
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

