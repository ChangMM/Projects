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
	<title>社团控--社团号设置</title>
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/7.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/top.js"></script>
	<script type="text/javascript" src="js/isCheck.js"></script>
	<script type="text/javascript" src="js/setting.js"></script>
</head>
<style>
	td input{
		border:none; font-size:15px; outline: none; color:#777; width:150px;display: inline-block;text-align: center;
	}
	textarea{height:100px; width: 300px; font-size:15px;outline:none;border:none;color:#777; resize:none;text-align: center;}
td input.alter,textarea.alter{
	text-align: left;
	padding:5px;color:#990;
	background: rgba(230,230,230,0.5);
}

</style>
<script>
	$(function(){
		jump("guanli");

	});
</script>
<body>
<?php	
	include "navMenu.php"
?>
	<div id="sub-top">
		<a href="user_setting.php"><p class="list selected">社团号设置</p></a>
		<a href="menber_setting.php"><p>用户管理</p></a>
	</div>
	<!--点击修改后出现的页面-->
	   <div class="mask">
    	<div class="PopupLayer"> 
    		<div class="mask-title"><p>用户管理</p><a id="close_poppubg"></a></div>
				
    	</div>
    </div>
	<div id="main">
		<div class="head">
			<p>社团号设置</p>
		</div>
		<div class="sub-head1">
			<p>账号设置</p>
		</div>
		<div class="content">
			  	<?php
                	$result=mysql_query("select * from aso_tab where username='$_SESSION[soc_user]'");
                	$msg=mysql_fetch_assoc($result);
               	?>
			<table class="user-setting">
				<tr>
			      <td>名称</td>        
			      <td><input name="name" type="text" value="<?php echo $msg[name]; ?>" readonly="true"></td>     
			      <td></td>
			    </tr>
			    <tr>
			      <td>头像</td>        
			      <td><img src="images/right.jpg" alt=""></td>
			      <td><a href="javascript:void(0)" class="avtar">修改</a></td>
			    </tr>
			    <tr>
			      <td>社团类型</td>        
			      <td><input name="type" type="text" value="<?php echo $msg[type]; ?>" readonly="true"></td>
			      <td><a href="javascript:void(0)" onclick=alter(this)>修改</a></td>
			    </tr>
			    <tr>
			      <td>手机端大图</td>        
			      <td><img src="images/mobile.jpg" alt=""></td>
			      <td><a href="javascript:void(0)" class="mobile-avtar">修改</a></td>
			    </tr>
			    <tr>
			      <td>一句话简介</td>        
			      <td style="position:relative">
			      	<input name="info" type="text" value="<?php echo $msg[info]; ?>" readonly="true" onkeyup=lengthOnly(this)  />
			      	<div class="popup"><span></span>简介不要超过12字</div>
			      </td>
			      <td><a href="javascript:void(0)" onclick=alter(this)>修改</a></td>
			    </tr>
			    <tr>
			      <td>具体介绍</td>        
			      <td>
			      	<textarea name="detail" id="" cols="30" rows="10" readonly="true" scroll="no"><?php echo $msg[detail]; ?></textarea>
			      	</td>
			      <td><a href="javascript:void(0)" onclick=alter(this)>修改</a></td>
			    </tr>
			    <tr>
			      <td>联系方式</td>        
			      <td style="position:relative">
			      <input name="phone" type="text" value="<?php echo $msg[phone]; ?>" readonly="true" onkeyup=numOnly(this) />
				  <div class="popup"><span></span>号码好像不对啊</div>
			  </td>
			      <td><a href="javascript:void(0)" onclick=alter(this)>修改</a></td>
			    </tr>     
			</table>
		</div>
		<div class="sub-head2">
			<p>功能设置</p>
		</div>
		<div class="content">
			<table class="gong-setting">
				<tr>
					<td colspan="2">每次发布新动态是否进行推送</td>
					<td>
						<div class="switch">
	      					<input type="radio" class="switch-input" name="view" value="week" id="week" checked>
	     		 			<label for="week" class="switch-label switch-label-off" onclick="ajax('send_setting','1')">开</label>
						    <input type="radio" class="switch-input" name="view" value="month" id="month">
						    <label for="month" class="switch-label switch-label-on" onclick="ajax('send_setting','2')">关</label>
						    <span class="switch-selection"></span>
    					</div>
					</td>
				</tr>				<tr>
					<td colspan="2">推送对象设置</td>
					<td>
						<select name="" id="" onchange="ajax('obj_setting',this.value);">
							<option value="全部用户">全部用户</option>
							<option value="部分用户">部分用户</option>
						</select>
					</td>
				</tr>
				<tr>
					<td colspan="2">绑定手机接收新通知</td>
					<td>
						<div class="switch">
	      					<input type="radio" class="switch-input" name="view2" value="week2" id="week2" checked>
	     		 			<label for="week2" class="switch-label switch-label-off" onclick="ajax('pg_setting','1')">开</label>
						    <input type="radio" class="switch-input" name="view2" value="month2" id="month2" >
						    <label for="month2" class="switch-label switch-label-on" onclick="ajax('pg_setting','2')">关</label>
						    <span class="switch-selection"></span>
    					</div>						
					</td>
				</tr>
			</table>
		</div>
	</div>
	
</body>
</html>