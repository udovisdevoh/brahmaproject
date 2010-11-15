<?php
require_once("./framework/settings.php");
setcookie('user', null);
setcookie('password', null);
$_SESSION['userProfileId'] = 0;
header('Location: ./');
?>