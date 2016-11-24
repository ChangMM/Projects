<?php
    include "mysql.php";
	session_start();
	$result=mysql_query("select * from aso_tab where id='$_SESSION[societykong_user]'");
	$num=mysql_num_rows($result);
	if($num)
	{
		if($_POST[name])
		$result=mysql_query("update aso_tab set name='$_POST[name]' where id='$_SESSION[societykong_user]' ");
		if($_POST[type])
		$result=mysql_query("update aso_tab set type='$_POST[type]' where id='$_SESSION[societykong_user]' ");
		if($_POST[info])
		$result=mysql_query("update aso_tab set info='$_POST[info]' where id='$_SESSION[societykong_user]' ");
		if($result)
			{
				echo "succeed";
			}
		else echo "fail";
	}
?>