<?php
require_once("./framework/settings.php");
setcookie('user', null);
setcookie('password', null);
unset($_SESSION['userProfile']);
header('Location: ./');
?>