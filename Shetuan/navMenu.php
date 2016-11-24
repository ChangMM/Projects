<div id="top">
	<img src="images/logo.png" alt="" class="logo">
		<ul class="top-item">
			<a href="news_list.php"><li class="dongtai">动态</li></a>
			<a href="add_news.php"><li class="fabu">发布</li></a>
			<a href="user_setting.php"><li class="guanli">管理</li></a>
		</ul>
		
		<div class="top-right">
			<img src="images/newinfo.png" alt="">
			<img src="images/right.jpg" alt="" class="top-authorlogo"> 
			<p class="aicre"><?php 
                	$result=mysql_query("select * from aso_tab where username='$_SESSION[soc_user]'");
                	$msg=mysql_fetch_assoc($result);
                	echo $msg[name] ?>
                </p>   
			<p class="exit"><a href="php/logoff.php">退出</a></p>
		</div>		
</div>