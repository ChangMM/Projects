function addact(){

    var ajax;
    if (window.XMLHttpRequest)
    {
        ajax=new XMLHttpRequest();
    }
    else
    {
        ajax=new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open("post","php/addact.php",false);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send("title="+document.getElementById("title").value+"&text="+document.getElementById("editor").value);
    if(ajax.responseText)
    {
        alert("发布成功");
        window.location.href="act_list.php";
    }
    else alert("由于莫名的原因未能发布成功");
}