<?php
require_once("./framework/settings.php");

if ($userProfile == null)
{
	echo "Can't save. Please login to site as owner of this AI in a new browser tab";
	die();
}

if (isset($_POST['ai']) && isset($_POST['memory']))
{
	$aiUnitId = (int)$_POST['ai'];
	$userKey = (int)$userProfile['id'];
	$memory = $_POST['memory'];	
	
	$aiUnit = AiUnit::getAiUnitForUser($aiUnitId, $userKey);

	if ($aiUnit == null)
	{
		echo "Can't save. Please login to site as owner of this AI in a new browser tab";
		die();
	}
	
	//echo $memory;
	
	echo AiUnit::saveFromAjax($aiUnitId, $memory);
}
else
{
	echo 'Couldn\'t save';
	die();
}
?>