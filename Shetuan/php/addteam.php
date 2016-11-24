<?php
include "mysql.php";
mysql_query("update user_tab set team='$_POST[team]' where id='$_POST[id]'");
echo "1";
?>