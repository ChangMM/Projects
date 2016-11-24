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
	<title>社团控--发布活动</title>
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/5.css">
	<link rel="stylesheet" type="text/css" href="css/fontawesome.css" />
	<link rel="stylesheet" type="text/css" href="css/simditor.css" />
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/top.js"></script>
	<script type="text/javascript" src="js/simditor.all.min.js"></script>
	<script type="text/javascript" src="js/addact.js"></script>
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
		<a href="add_act.php"><p class="react selected">发布活动</p></a>
		<a href="add_msg.php"><p>推送通知</p></a>
	</div>
	<div id="main">
		<div class="head">
			<p>活动发布</p>
		</div>
		<div class="intro">
			活动发布是提供给社团组织并且推广活动的重要板块，方便了社团对于活动的日程安排与规模安排，并且提供了一个面向学生的发布平台。活动的发布应该包含明确的活动内容、时间、地点等信息，并且确保活动发布的真实性。
		</div>
		<div class="content">
				<input type="text" name="" id="title" placeholder="标题" autofocus>
				<div class="select">
					推送对象:<select name="" id="">
						<option value="1">全部用户</option>
						<option value="2">感兴趣</option>
						<option value="3">参与人员</option>
					</select> 
					推送内容：<input type="text"></div>
				<textarea id="editor" placeholder="这里输入内容" ></textarea>
				<button onclick="addact()">发布</button>
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