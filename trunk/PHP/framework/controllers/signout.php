<?php
require_once("./framework/settings.php");

if (isset($_POST['id']))
{
	$userId = (int)$_POST['id'];
	if ($userId != 0 && $userProfile['id'] == $userId)
	{
		setcookie('user', null);
		setcookie('password', null);
		unset($_SESSION['userProfile']);
		$userProfile = null;
	}
}
?>