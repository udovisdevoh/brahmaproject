<?php require_once("./framework/settings.php"); 

try
{
	if (isset($userProfile) && $userProfile != null && isset($userProfile['id']) && isset($_POST['id']) && isset($_POST['isUp']))
	{
		$aiBotId = (int)$_POST['id'];
		$isUp = (bool)$_POST['isUp'];
		$todayTimeStamp = strtotime('midnight');
		$ip = $_SERVER['REMOTE_ADDR'];
		
		if (UserProfile::isCanRate($userProfile['id'], $aiBotId, $ip, $todayTimeStamp))
		{
			AiUnit::rate($userProfile['id'], $aiBotId, $ip, $todayTimeStamp, $isUp);
			$renderedView = 'Thank you!';
		}
		else
		{
			$renderedView = 'You have already rated this bot today. Wait for tomorrow.';
		}
	}
	else
	{
		$renderedView = 'Please signin first';
	}
}
catch (Exception $exception)
{
	$renderedView = 'Error';
}


?>