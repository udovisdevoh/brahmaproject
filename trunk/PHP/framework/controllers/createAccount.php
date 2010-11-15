<?php
require_once("./framework/settings.php");

if (isset($userProfile))
{
	setcookie('user', null);
	setcookie('password', null);
	unset($_SESSION['userProfile']);
}

$isCreateUserProfile = true;

?>