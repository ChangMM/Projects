<?php
 //    include "mysql.php";
	// $result=mysql_query("select * from aso_tab where username='$_POST[username]' and psw='$_POST[password]'");
	// $num=mysql_num_rows($result);
	// if($num)
	// {   session_start();
	//     $_SESSION["soc_user"]="$_POST[username]";
	// 	echo "1";
	// 	}
	// 	else echo "0";
	session_start();
	    $_SESSION["soc_user"]="$_POST[username]";
		echo "1";
?>