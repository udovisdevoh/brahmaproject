<?php
require_once("./framework/settings.php");

if ($userProfile == null)
{
	echo '<p class="Error">Can\'t save. Open a new browser tab and sign in as owner of this AI before you try again.</p>';
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
		echo '<p class="Error">Can\'t save. Open a new browser tab and sign in as owner of this AI before you try again.</p>';
		die();
	}
	
	if (IS_ENABLE_USER_SAVE_AI_QUOTA)
		$saveAiQuotaTimeLeft = UserProfile::getSaveAiQuotaTimeLeft($userKey);
	else
		$saveAiQuotaTimeLeft = 0;
	
	if ($saveAiQuotaTimeLeft <= 0)
	{
		AiUnit::saveFromAjax($aiUnitId, $memory);
		
		if (IS_ENABLE_USER_SAVE_AI_QUOTA)
			UserProfile::setSaveAiQuotaTimeLeft($userKey);
		
		Cache::reset('left_brain_chat_'.$aiUnitId);
	}
	else
	{
		echo '<p class="Error">Please wait '.$saveAiQuotaTimeLeft.' seconds before you can save again</p>';
		die();
	}
}
else
{
	echo '<p class="Error">Unknown error</p>';
	die();
}
?>