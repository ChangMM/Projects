<?php
include "mysql.php";
$result=mysql_query("insert into contact(name,way,content)  
		values('$_POST[name]','$_POST[way]','$_POST[content]')");
if($result)
	echo "1";
else echo "0";
?>