<!doctype html>
<html lang="en">
<?php 
    include "php/mysql.php";
	session_start();
	if(!$_SESSION[soc_user])
		header("location:signin.php");
?>
<head>
	<meta charset="UTF-8">
	<title>社团控--活动响应</title>
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/3.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/top.js"></script>	
</head>
<script>
	$(function(){
		jump("dongtai");
	});
</script>
<body>
<?php	
	include "navMenu.php"
?>

	<div id="sub-top">
		<a href="news_list.php"><p class="list ">动态列表</p></a>
		<a href="act_list.php"><p class="react selected">活动相应</p></a>
	</div>

	<div id="main">
		<table class="main-table">
			  <thead>
			    <tr>
			        <th>动态列表</th>        
			        <th>新消息</th>
			        <th>感兴趣</th>
			        <th>报名</th>
			        <th>评论</th>
			        <th><a href="add_act.php" class="new"><img src="images/edit.png" alt="">创建</a>
			        	<a href="#" class="delete"><img src="images/delete.png" alt="">删除</a></th>
			    </tr>
			  </thead>
			  <tbody>
			  	<?php
                	$result=mysql_query("select * from act_tab where aso='$_SESSION[soc_user]'");
                	$num=mysql_num_rows($result);
                	for($i=0;$i<$num;$i++)
                	{
                	$msg=mysql_fetch_assoc($result);
                	$res1=mysql_query("select * from like_tab where article_id=$msg[id]");
                	$num1=mysql_num_rows($res1);
                	$res2=mysql_query("select * from join_tab where act_id=$msg[id]");
                	$num2=mysql_num_rows($res2);
                	$res3=mysql_query("select * from acm_tab where article_id=$msg[id]");
                	$num3=mysql_num_rows($res3);
			  	?>
				<tr>
			      <td><a href="act_detail.php?id=<?php echo $msg[id]; ?>" ><?php echo $msg[title]; ?></a></td>        
			      <td><div class="table-newinfo"></div></td>
			       <td><img src="images/heart.png" alt="good"><?php echo $num1; ?></td>
			       <td><img src="images/join.png" alt=""><?php echo $num2; ?></td>
			       <td><img src="images/remark.png" alt="remark"><?php echo $num3; ?></td>
			       <td><?php echo $msg[time]; ?></td>
			    </tr>  
			    <?php
					}
			    ?>
				</tbody>
		</table>

		
	</div>
</body>
</html>