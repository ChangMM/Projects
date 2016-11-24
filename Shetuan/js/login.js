function login(){
    var ajax;
    if (window.XMLHttpRequest)
    {
        ajax=new XMLHttpRequest();
    }
    else
    {
        ajax=new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open("post","php/login.php",false);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send("username="+document.getElementById("username").value+"&password="+document.getElementById("password").value);
    if(ajax.responseText=="1")
    {
        window.location.href="news_list.php";
    }
    else alert("密码不对");
}

function checkUser(obj){
    var userName=document.getElementById("username").value;
    var $obj=$(obj);
    if(userName==""){
        $obj.next().addClass("focus");
    }else{
        $obj.next().removeClass("focus");
    }
}
function checkPass(obj){
    var passWord=document.getElementById("password").value;
    var $obj=$(obj);
    if(passWord==""){
        $obj.next().addClass("focus");
    }else{
        $obj.next().removeClass("focus");
    }
}