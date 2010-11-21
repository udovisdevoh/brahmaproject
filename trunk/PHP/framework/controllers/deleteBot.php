<?php
require_once("./framework/settings.php");

if ($userProfile == null || !isset($_GET['ai']))
{
	header("Location: ./");
	die();
}
	
$userKey = (int)$userProfile['id'];
$aiUnitId = (int)$_GET['ai'];
$aiUnitName = AiUnit::getName($aiUnitId);

if (isset($_POST['delete']))
{
	if (AiUnit::delete($aiUnitId, $userKey) && AiUnit::getAiUnit($aiUnitId) == null)
		$success = '\''.$aiUnitName.'\' was deleted';
	else
		$error = 'Couldn\'t delete '.$aiUnitName;
}

?>