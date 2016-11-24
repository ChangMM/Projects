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
	<title>社团控--动态列表</title>
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/9.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/top.js"></script>
</head> 
<script>
	$(function(){
		jump("dongtai");
		$(".remark-detail p.fadeback").click(function(){
			var $reply=$(this).parent().parent().next();
			if($reply.hasClass("selected")){
				$reply.removeClass("selected");
			}else{
      		$reply.addClass("selected");			
      	}
		});
		});
</script>
<style>
div.remark div.remark-box{display:none;width:500px;margin-left:50px; margin-top:20px;margin-bottom:10px; }
div.remark div.remark-box textarea{height:80px; width:500px; font-size:15px;color:#777; resize:none;display:inline-block; }
div.remark div.remark-box input{width:80px; height:30px;float:right; border:none; background-color:#1aa3e7; }
div.remark div.remark-box input:hover{cursor:pointer; }
div.remark div.remark-box textarea:hover{background-color:#fffff2; }
div.remark div.remark-box.selected{display:inline-block;}
</style>
<body>
<?php	
	include "navMenu.php"
?>

	<div id="sub-top">
		<a href="news_list.php"><p class="list selected">动态列表</p></a>
		<a href="act_list.php"><p class="react">活动相应</p></a>
	</div>
	<div id="main">
		<div class="head">
			<p>活动</p>
			<p class="head-right"><a href="news_list.php">返回动态列表</a></p>
		</div>
		<div class="content">
			  	<?php
                	$result=mysql_query("select * from news_tab where id='$_GET[id]'");
                	if($result)$msg=mysql_fetch_assoc($result);
                	$res1=mysql_query("select * from good_tab where article_id=$msg[id]");
                	$num1=mysql_num_rows($res1);
                	$res2=mysql_query("select * from ncm_tab where article_id=$msg[id]");
                	$num2=mysql_num_rows($res2);
                ?>
			<div class="content-title">
				<div class="theme"><?php echo $msg[title]; ?></div>
				<div class="time"><?php echo $msg[time]; ?></div>
				<div class="interset"><img src="images/good.png" alt="">(<?php echo $num1; ?>)</div>
				<div class="content-title-remark"><img src="images/remark.png" alt="">(<?php echo $num2; ?>)</div>
			</div>
			<div class="content-detail">
				<p>
				<?php echo $msg[text]; ?>
				</p>
			</div>
			  	<?php
                	$result=mysql_query("select * from ncm_tab where article_id='$msg[id]'");
                	$num=mysql_num_rows($result);
                	for($i=0;$i<$num;$i++)
                	{
                	$msg=mysql_fetch_assoc($result);
                	?>
			<div class="remark">
				<div class="avtar">
					<img src="images/right.jpg" alt="">
				</div>
				<div class="remark-detail">
					<p class="remark-username"><a href="#"><?php echo $msg[user]; ?></a></p>
					<p class="remark-content"><?php echo $msg[text]; ?></p>
					<div class="remark-foot">
						<p class="time"><?php echo $msg[time]; ?></p>
						<p class="fadeback"><img src="images/reply.png" alt="">回复</p>
					</div>
				</div>
				<div class="remark-box">
					<form action="">
						<textarea name="" id="" cols="30" rows="10"></textarea>
						<input type="submit" value="提交">
					</form>
				</div>
			</div>



			<?php
				 }
			?>

		</div>
	</div>
	
</body>
</html>