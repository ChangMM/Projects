<!doctype html>
<html lang="en">
<?php 
    include "php/mysql.php";
	session_start();
	if(!$_SESSION[soc_user])
		header("location:index.html");
?>
<head>
	<meta charset="UTF-8">
	<title>社团控--推送通知</title>
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/6.css">
	<link rel="stylesheet" type="text/css" href="css/fontawesome.css" />
	<link rel="stylesheet" type="text/css" href="css/simditor.css" />
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/top.js"></script>
	<script type="text/javascript" src="js/simditor.all.min.js"></script>
	<script type="text/javascript" src="js/addmsg.js"></script>
</head>
<script>
	$(function(){
		jump("fabu");
	});
</script>
<body>
<?php	
	include "navMenu.php"
?>

	<div id="sub-top">
		<a href="add_news.php"><p class="list ">发布动态</p></a>
		<a href="add_act.php"><p class="react">发布活动</p></a>
		<a href="add_msg.php"><p class="selected">推送通知</p></a>
	</div>
	<div id="main">
		<div class="head">
			<p>推送通知</p>
		</div>
		<div class="intro">
			<p>推送通知是为社团通知活动、重要事件、以及会议等重要信息而设计的模块。</p>
			<p>请尽量控制推送的数量以及把握好推送内容的质量。</p>
		</div>
		<div class="content">
				<div class="select">
					推送对象:<select name="" id="">
						<option value="1">全部用户</option>
						<option value="2">感兴趣</option>
						<option value="3">参与人员</option>
					</select> 
					推送时间：<select name="" id="">
						<option value="1">即时</option>
						<option value="2">1小时后</option>
					</select></div>
				<textarea id="editor" placeholder="这里输入内容" ></textarea>
				<button onclick="addmsg()">发布</button>
		</div>

	</div>
	
</body>
<script>
	var editor = new Simditor({
textarea: $('#editor'),
placeholder:'请输入活动内容'
});
</script>
</html>