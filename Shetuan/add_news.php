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
	<title>社团控--发布动态</title>
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/4.css">
	<link rel="stylesheet" type="text/css" href="css/fontawesome.css" />
	<link rel="stylesheet" type="text/css" href="css/simditor.css" />
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/simditor.all.min.js"></script>
	<script type="text/javascript" src="js/top.js"></script>
	<script type="text/javascript" src="js/addnews.js"></script>
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
		<a href="add_news.php"><p class="list selected">发布动态</p></a>
		<a href="add_act.php"><p class="react">发布活动</p></a>
		<a href="add_msg.php"><p>推送通知</p></a>
	</div>
	<div id="main">
		<div class="head">
			<p>动态发布</p>
		</div>
		<div class="content">
				<input type="text" name="" id="title" placeholder="标题" autofocus>
				<textarea id="editor" placeholder="这里输入内容" ></textarea>
				<button onclick="addnews()">发布</button>
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