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
	<title>社团控--用户管理</title>
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/8.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/top.js"></script>
	<script type="text/javascript" src="js/isCheck.js"></script>
</head>
<script>

	$(function(){
		jump("guanli");
	$(".right  div").click(function(){
    $sub_top_obj=$(".right div.selected");
      if(!$(this).hasClass("selected")){
      	$sub_top_obj.removeClass("selected");
      	$(this).addClass("selected");
      }
  });
	});
</script>
<body>
<?php	
	include "navMenu.php"
?>

	<div id="sub-top">
		<a href="user_setting.php"><p  class="list">社团号设置</p></a>
		<a href="menber_setting.php"><p  class="selected">用户管理</p></a>
	</div>
	<div id="main">
		<div class="head">
			<p>用户管理</p>
		</div>
		<div class="content">
			<div class="left">
			<table>
				<?php 
					$result=mysql_query("select * from user_tab where soc='$_SESSION[soc_user]'");
						$msg=mysql_fetch_assoc($result);
						$n=mysql_num_rows($result);
						$a[0]=$msg[team];
						$num=1;
						while($msg=mysql_fetch_assoc($result))
							{
								$i=0;
								$flag=1;
								for($i=0;$i<$num;$i++)
									{
										if($msg[team]==$a[$i])
										{
											$flag=0;
										}
									}	
								if($flag==1)
								{
									$a[$num]=$msg[team];
									$num++;
								}
							}  						
				
				if($_GET[team])$res=mysql_query("select * from user_tab where soc='$_SESSION[soc_user]' and team='$_GET[team]'");
						else $res=mysql_query("select * from user_tab where soc='$_SESSION[soc_user]'");
				 ?>
			  <thead>
			    <tr>
			        <th><input type="checkbox" onclick=choose(this,document.getElementsByTagName("input"))>全选</th>			                
			        <th>姓名</th>
			        <th>组别<select  onchange="move(this.value)" name="" id="">
			        	<option value="0">分组到</option>
			        	<?php 
							for($i=0;$i<$num;$i++)
							{
						?>
			        	<option value="<?php echo $a[$i]; ?>"><?php echo $a[$i]; ?></option>
			        	<?php } ?>
			        </select>
			        </th>
			        <th>性别</th>
			        <th>邮箱</th>
			        <th>QQ</th>
			        <th>手机</th>
			    </tr>
			  </thead>
			  	<tbody>
			  		<?php 
			  		$number=mysql_num_rows($res);
			  		for($i=0;$i<$number;$i++)
			  		{
			  			$msg=mysql_fetch_assoc($res);
			  		?>
					<tr>
			      		<td><input type="checkbox" value="<?php echo $msg[id]; ?>"><img src="images/right.jpg" alt="avtar"></td>        
			      		<td><?php echo $msg[name]; ?></td>
			       		<td><?php echo $msg[team]; ?></td>
			       		<td><?php echo $msg[sex]; ?></td>
			       		<td><?php echo $msg[email]; ?></td>
			       		<td><?php echo $msg[qq]; ?></td>
			       		<td><?php echo $msg[phone]; ?></td>
			    	</tr>
			    	<?php 
					}
			    	?>
				</tbody>
			</table>	    				
			</div>
			<div class="right">
				<div class="new-list"><img src="images/newzu.png" alt="" class="add"></div>
				<a href="menber_setting.php?team="><div class="selected">所有成员(<?php echo $n; ?>)</div></a>
				<?php 
							for($i=0;$i<$num;$i++)
							{
							$result=mysql_query("select * from user_tab where soc='$_SESSION[soc_user]' and team='$a[$i]'");
							$n=mysql_num_rows($result);
				?><a href="menber_setting.php?team=<?php echo $a[$i]; ?>"><div><?php echo $a[$i]; ?>(<?php echo $n; ?>)</div></a>
				<?php 
							}
				?>
				</div>
		</div>	
	</div>
</body>
</html>