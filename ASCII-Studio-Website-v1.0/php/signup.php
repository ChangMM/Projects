<?php
include "mysql.php";
$result=mysql_query("insert into signup(name,sex,grade,phone,phone2,groups,intro,advan,howknowus)  
		values('$_POST[name]','$_POST[sex]','$_POST[grade]','$_POST[phone]','$_POST[phone2]','$_POST[group]','$_POST[intro]','$_POST[advan]','$_POST[howknowus]')");
if($result)
	echo "1";
else echo "0";
?>