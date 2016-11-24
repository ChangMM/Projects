function contactus()
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
    ajax.open("post","php/contact.php",false);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send("name="+document.getElementById("cname").value+"&way="+document.getElementById("cway").value+"&content="+document.getElementById("ccontent").value);
    if(ajax.responseText=="1")
    alert("发送成功");
    else alert("没能成功发送，出了问题");
}