/**
 * Created by sanxing on 2014/12/7.
 */
var weiboInput=document.getElementById("weibo");
var data=["罗永浩","韩寒","韩dfgdfgdf寒","韩寒222","韩3","韩4","柴静","崔永元","撒贝宁","白岩松","陈虻"];

/****将姓名的数据转化为拼音****/
function changeNameToPy(obj){
    var newobj=[];
    for(var i=0;i<obj.length;i++){
        newobj.push(codefans_net_CC2PY(obj[i]).toLowerCase());
    }
    return newobj;
}
var pinyinData = changeNameToPy(data);//已将姓名数据转化为小写拼音


/*****获取光标位置***/
function getCursortPosition(domObj) {
    var position = 0;

    if (document.selection) {	//for IE
        domObj.focus();
        var sel = document.selection.createRange();
        sel.moveStart('character', -domObj.value.length);

        position = sel.text.length;
    } else if (domObj.selectionStart || domObj.selectionStart == '0') {
        position = domObj.selectionStart;
    }
    return position;
}

/*****往光标位置后添加内容***/
function insertText(obj,str) {
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
        obj.value += str;
    }
}

/*****将光标移动到末尾***/
function moveEnd(obj){
    obj.focus();
    var len = obj.value.length;
    if (document.selection) {
        var sel = obj.createTextRange();
        sel.moveStart('character',len);
        sel.collapse();
        sel.select();
    } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
        obj.selectionStart = obj.selectionEnd = len;
    }
}

/********反转字符串*****/
function reverseString(str){
    return str.split("").reverse().join("");
}

/****判断该往提示列表中加入那些姓名数据*****/
function judgeName(tar,obj1,obj2){
    var data=[];
    for(var i=0;i<obj1.length;i++){
        if(escape(tar).indexOf("%u")!=-1){
            if(obj1[i].indexOf(tar)!=-1){
                data.push(obj1[i]);
                continue;
            }
        }
        else if(obj2[i].indexOf(tar)!=-1){
            data.push(obj1[i]);
        }
    }
    return data;
}

/**上下键选择名字**/
var liPos = -1;
var isTip = -1;
function moveLi(dir){
    var numLi = $("#suggest li").length;
    if(liPos == -1){
        liPos = 0;
        $("#suggest li").eq(0).addClass("active");
        return ;
    }
    $("#suggest li").removeClass("active");
    if(dir==1){
        if(liPos==numLi-1){
            $("#suggest li").eq(0).addClass("active");
            liPos=0;
        }
        else{
            $("#suggest li").eq(liPos+1).addClass("active");
            liPos=liPos+1;
        }
    }
    if(dir==-1){
        if(liPos==0){
            $("#suggest li").eq(numLi-1).addClass("active");
            liPos=numLi-1;
        }else{
            $("#suggest li").eq(liPos-1).addClass("active");
            liPos=liPos-1;
        }
    }
}
function checkKBD() {
    if(!event){
        event=window.event;
    }
    var keynum;
    if(event){
        keynum=event.keyCode;
    }
        if (keynum==40) {
            event.returnValue=false;
            moveLi(1);
        }
        else if (keynum==38) {
            event.returnValue=false;
            moveLi(-1);
        }
        else if (keynum==13){
            var context=$("#weibo").val();
            $("#weibo").val(context.substring(0,context.length));
            insertText(weiboInput,$("#suggest li.active").text()+" ");
            moveEnd(weiboInput);
            $("#suggest").hide();
            $("#suggest ul li").remove();
            $("#suggest ul span").remove();
            liPos=-1;
            event.returnValue=false;
        }
}



/***提示条显示的主要代码**/
function mainTip(){
        var curPos=$(this).getpos();//当前光标位置
        var context=$(this).val().substring(0,curPos);
        var conlen=context.length;

        if(context.indexOf("@")!=-1){
            /**获取@后面的名字,并以此检测会出现在提示列表中的名字，存放如tipName数组中*/
            var tarName = context.substring(context.lastIndexOf("@")+1,conlen+1);

            var spaceTab=tarName.indexOf(" ");
            var enterTab=tarName.indexOf("\n");

            if((spaceTab==-1)&&(enterTab==-1)){
                var tipName=[];
                var tipName=judgeName(tarName,data,pinyinData);

                /**显示提示框**/
                context=context.replace(/\n/g,"<br />");
                $("#hidden").html(context);
                $("#cursor").remove();

                var suggestStr='';
                if(tipName.length==0){
                    suggestStr+="<span>轻敲空格完成输入</span>";
                }else{
                    suggestStr+="<span>选择昵称或轻敲空格完成输入</span>";
                    for(var i=0;i<tipName.length;i++){
                        suggestStr+="<li class='name'>"+tipName[i]+"</li>";
                    }
                }
                $("#suggest ul li").remove();
                $("#suggest ul span").remove();
                $("#suggest ul").append($(suggestStr));
                $("#hidden").append($("<span id='cursor'></span>"));
                $("#suggest").show().css({
                    /**注意下这些获取元素高宽的方法***/
                    top:$("#cursor").offset().top+20+'px',
                    left:$("#cursor").offset().left-20+"px"
                });
            }else{
                $("#suggest").hide();
                liPos=-1;
            }
        }else{
            $("#suggest").hide();
            liPos=-1;
        }
}

$(".weibo-container").on("keyup","#weibo",mainTip);
$(".weibo-container").on("click","#weibo",mainTip);
$(".weibo-container").on("keyup","#weibo",checkKBD);

$("#suggest").on("click","li.name",function(){
    insertText(weiboInput,$(this).text()+" ");
    moveEnd(weiboInput);
    $("#suggest").hide();
    $("#suggest ul li").remove();
    $("#suggest ul span").remove();
    liPos=-1;
});


