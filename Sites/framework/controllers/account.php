<?php
require_once("./framework/settings.php");

if ($userProfile == null)
{
	header("Location: ./");
	die();
}
	
$userKey = (int)$userProfile['id'];
$renderedView = Cache::get('user_account_settings_'.$userKey, DEFAULT_CACHE_TIMEOUT);

if ($renderedView == null)
{
	$aiUnitList = AiUnit::getAiUnitListForUser($userKey, 0, AI_COUNT_LIMIT_PER_USER);
	$renderedView = UserProfileViewer::viewAccountSettings($userProfile, $aiUnitList);
	
	Cache::set('user_account_settings_'.$userKey, $renderedView);
}

?>