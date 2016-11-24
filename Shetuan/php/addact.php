<?php
    include "mysql.php";
	session_start();
	$result=mysql_query("insert into act_tab(title,text,aso) values('$_POST[title]','$_POST[text]','$_SESSION[soc_user]')");
	if ($result) {
		echo "1";
	}
	else echo "0";
?>