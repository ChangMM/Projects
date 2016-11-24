<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<style>
*{font-family:"微软雅黑" }
#main{width:1000px; margin:0 auto; margin-top:30px;background-color:#fff; min-height:500px;margin-bottom:50px;
		padding-bottom:30px;   }
.main-table{width:960px; margin:0  auto; font-size:15px; }
.main-table td, .main-table th {padding: 15px;border-bottom: 1px dashed #f2f2f2;}
.main-table th {
				text-align: left;
				font-size:20px; 
				text-shadow: 0 1px 0 rgba(255,255,255,.5);
				border-bottom: 1px solid #ccc;
				background-color: #eee;
				background-image: -webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#eee));
				background-image: -webkit-linear-gradient(top, #f5f5f5, #eee);
				background-image: -moz-linear-gradient(top, #f5f5f5, #eee);
				background-image: -ms-linear-gradient(top, #f5f5f5, #eee);
				background-image: -o-linear-gradient(top, #f5f5f5, #eee);
				background-image: linear-gradient(top, #f5f5f5, #eee);
				filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#f5f5f5, endColorstr=#eeeeee);
				-ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#f5f5f5, endColorstr=#eeeeee)";
			}
th:nth-child(1),th:nth-child(2),th:nth-child(3){width:80px; } 
tr:nth-child(4n+1){background-color:#d5fafe; }				
</style>
<body>
	<div id="main">
<table class="main-table">
<thead>
<tr>
	<th>姓名</th>
	<th>性别</th>
	<th>专业年级</th>
	<th>电话</th>
	<th>备用电话</th>
	<th>小组</th>
</tr>
</thead>
<?php
include "mysql.php";
$result=mysql_query("select * from signup");
$num=mysql_num_rows($result);
for($i=0;$i<$num;$i++)
 {
   $msg=mysql_fetch_assoc($result);
?>
<tr>
	<td><?php echo $msg[name]; ?></td>
	<td><?php echo $msg[sex]; ?></td>
	<td><?php echo $msg[grade]; ?></td>
	<td><?php echo $msg[phone]; ?></td>
	<td><?php echo $msg[phone2]; ?></td>
	<td><?php echo $msg[groups]; ?></td>
</tr>
<tr><td colspan="2">自我介绍</td><td colspan="4"><?php echo $msg[intro]; ?></td></tr>
<tr><td colspan="2">你的优势</td><td colspan="4"><?php echo $msg[advan]; ?></td></tr>
<tr><td colspan="2">如何了解我们</td><td colspan="4"><?php echo $msg[howknowus]; ?></td></tr>
<?php
}
?>
</table>
</div>
</body>
</html>