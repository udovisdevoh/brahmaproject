<?php
require_once("./framework/settings.php");

if ($userProfile == null || !isset($_GET['ai']))
{
	header("Location: ./");
	die();
}
	
$userKey = (int)$userProfile['id'];
$aiUnitId = (int)$_GET['ai'];

$aiUnit = AiUnit::getAiUnitForUser($aiUnitId, $userKey);


if ($aiUnit == null)
	die();
	
if (isset($_POST['chooseAvatar']))
{
	$avatarId = (int)$_POST['avatar_id'];
	
	if ($avatarId > 0 && $avatarId <= LAST_AI_AVATAR_ID)
	{
		AiUnit::setAvatar($aiUnitId, $userKey, $avatarId);
		header("Location: ./editbot.php?ai=".$aiUnitId);
	}
}

$renderedView = AiProfileViewer::viewEditProfileForm($aiUnit);


?>