<?php
require_once("./framework/settings.php");

if ($userProfile == null)
{
	header("Location: ./");
	die();
}
	
$userKey = (int)$userProfile['id'];

if (isset($_POST['newBot']))
{
	$name = strip_tags($_POST['name']);
	
	
	try
	{
		AiUnit::newAiUnit($name, $userKey);
		header("Location: ./account.php");
		die();
	}
	catch (Exception $exception)
	{
		$error = 'Invalid name or name already in use';
	}
}


?>