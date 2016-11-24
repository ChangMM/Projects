<?php
include "mysql.php";
session_start();
if($_POST[type])mysql_query("update aso_tab set type='$_POST[type]' where username='$_SESSION[soc_user]'");
if($_POST[info])mysql_query("update aso_tab set info='$_POST[info]' where username='$_SESSION[soc_user]'");
if($_POST[detail])mysql_query("update aso_tab set detail='$_POST[detail]' where username='$_SESSION[soc_user]'");
if($_POST[phone])mysql_query("update aso_tab set phone='$_POST[phone]' where username='$_SESSION[soc_user]'");
if($_POST[send_setting])mysql_query("update aso_tab set send_setting='$_POST[send_setting]' where username='$_SESSION[soc_user]'");
if($_POST[obj_setting])mysql_query("update aso_tab set obj_setting='$_POST[obj_setting]' where username='$_SESSION[soc_user]'");
if($_POST[pg_setting])mysql_query("update aso_tab set pg_setting='$_POST[pg_setting]' where username='$_SESSION[soc_user]'");
echo "1";
?>