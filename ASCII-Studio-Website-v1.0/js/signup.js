function signup()
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
    var sex;
    var obj = document.getElementsByName("sex");
    for(var i = 0;i < obj.length; i ++){
        if(obj[i].checked){
            sex = obj[i].value;
        }
    }
    var group;
    var obj = document.getElementsByName("group");
    for(var i = 0;i < obj.length; i ++){
        if(obj[i].checked){
            group = obj[i].value;
        }
    }
    var howknowus="";
    var obj = document.getElementsByName("way");
    for(var i = 0;i < obj.length; i ++){
        if(obj[i].checked){
            howknowus = howknowus + obj[i].value + ",";
        }
    }
    ajax.open("post","php/signup.php",false);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send("name="+document.getElementById("name").value+"&sex="+sex+"&grade="+document.getElementById("major").value+
    "&phone="+document.getElementById("phone").value+"&phone2="+document.getElementById("standby_phone").value+
    "&group="+group+"&intro="+document.getElementById("box1").value+"&advan="+document.getElementById("box2").value+"&howknowus="+howknowus);
    if(ajax.responseText=="1")
    alert("发送成功");
    else alert("没能成功发送，出了问题");
}