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
	<title>社团控--活动响应</title>
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/2.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/top.js"></script>	
</head>
<script>
	$(function(){
		var member=document.getElementById("content-table");
		var pinglun=document.getElementById("content-table1");
		var $member=$(member);
		var $pinglun=$(pinglun);

		jump("fabu");
		/*评论列表与人员列表的切换*/
	$(".content  li").click(function(){
    $sub_top_obj=$(".content li.selected");
      if(!$(this).hasClass("selected")){
      	$sub_top_obj.removeClass("selected");
      	$(this).addClass("selected");
      }
      if($(this).hasClass("pinglun")){
      	var temp1=$pinglun.hasClass("selected")?"selected":"";
      	var temp2=$member.hasClass("selected")?"":"selected";
      	$member.addClass(temp2);
      	$pinglun.removeClass(temp1);
      }
       if($(this).hasClass("member")){
      	var temp1=$member.hasClass("selected")?"selected":"";
      	var temp2=$pinglun.hasClass("selected")?"":"selected";
      	$pinglun.addClass(temp2);
      	$member.removeClass(temp1);
      }
  });

	/*回复框*/
	$(".remark-detail p.fadeback").click(function(){
			var $reply=$(this).parent().parent().next();
			if($reply.hasClass("selected")){
				$reply.removeClass("selected");
			}else{
      		$reply.addClass("selected");			
      	}
		});
	})
</script>
<body>
<?php	
	include "navMenu.php"
?>

	<div id="sub-top">
		<a href="news_list.php"><p class="list">动态列表</p></a>
		<a href="act_list.php"><p class="react selected">活动相应</p></a>
	</div>
	<div id="main">
		<div class="head">
			<p>活动</p>
			<p class="head-right"><a href="act_list.php">返回动态列表</a></p>
		</div>
		<div class="content">
			  	<?php
                	$result=mysql_query("select * from act_tab where id='$_GET[id]'");
                	if($result)$msg=mysql_fetch_assoc($result);
                	$res1=mysql_query("select * from like_tab where article_id=$msg[id]");
                	$num1=mysql_num_rows($res1);
                	$res2=mysql_query("select * from join_tab where act_id=$msg[id]");
                	$num2=mysql_num_rows($res2);
                	$res3=mysql_query("select * from acm_tab where article_id=$msg[id]");
                	$num3=mysql_num_rows($res3);
                ?>
			<div class="content-title">
				<div class="theme"><?php echo $msg[title]; ?></div>
				<div class="time"><?php echo $msg[time]; ?></div>
				<div class="interset"><img src="images/heart.png" alt="">(<?php echo $num1; ?>)</div>
				<div class="join"><img src="images/join.png" alt="">(<?php echo $num2; ?>)</div>
				<div class="remarkimg"><img src="images/remark.png" alt="">(<?php echo $num3; ?>)</div>
			</div>
			<div class="content-detail">
				<p>
				<?php echo $msg[text]; ?>
				</p>
			</div>
	<ul>
		<a href="#"><li class="selected pinglun">评论列表</li></a>
		<a href="#"><li class="member">人员统计</li></a>
	</ul>

  <!---人员统计-->	
<table class="content-table selected" id="content-table">
			  <thead>
			    <tr>
			        <th><img src="images/join.png" alt="">报名</th>     
			        <th>专业</th>
			        <th>电话</th>
			        <th>QQ</th>
			        <th>邮箱</th>
			    </tr>
			  </thead>
			  <tbody><?php
                	$result=mysql_query("select * from join_tab where act_id=$_GET[id]");
                	$num=mysql_num_rows($result);
                	for($i=0;$i<$num;$i++)
                	{
                	$msg=mysql_fetch_assoc($result);
                	$res=mysql_query("select * from user_tab where username='$msg[user]'");
                	$msg1=mysql_fetch_assoc($res);
                	?>
				<tr>      
			      <td><?php echo $msg1[name]; ?></td>
			       <td><?php echo $msg1[major]; ?></td>
			       <td><?php echo $msg1[phone]; ?></td>
			       <td><?php echo $msg1[qq]; ?></td>
			       <td><?php echo $msg1[email]; ?></td>
			       </tr>        
					<?php
			        }
			         ?>
			</tbody>
		</table>
  <!---评论列表-->
		<div class="content-table1" id="content-table1">
			  	<?php
                	$result=mysql_query("select * from acm_tab where article_id='$_GET[id]'");
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


	</div>
</body>
</html>