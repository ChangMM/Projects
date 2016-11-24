function addmsg(){

    var ajax;
    if (window.XMLHttpRequest)
    {
        ajax=new XMLHttpRequest();
    }
    else
    {
        ajax=new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open("post","php/addmsg.php",false);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send("text="+document.getElementById("editor").value);
    if(ajax.responseText=="1")
    {
        alert("发布成功");
        window.location.href="news_list.php";
    }
    else alert("由于莫名的原因未能发布成功");
}