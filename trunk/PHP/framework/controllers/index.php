<?php
require_once("./framework/settings.php");

define('AI_SHORT_PROFILE_COUNT_PER_PAGE', 12);

if (isset($_GET['ai'])) //Single AI
{
	$aiUnitKey = (int)$_GET['ai'];
	$renderedView = Cache::get('ai_profile_'.$aiUnitKey, 300);
	if ($renderedView == null)
	{
		$aiUnit = AiUnit::getAiUnit($aiUnitKey);
		$bestRating = AiUnit::getBestRating();
		$renderedView = AiProfileViewer::view($aiUnit, $bestRating);
		Cache::set('ai_profile_'.$aiUnitKey, $renderedView);
	}
}
else if (isset($_GET['user'])) //Single User
{
	$userKey = (int)$_GET['user'];
	$renderedView = Cache::get('user_profile_'.$userKey, 300);
	if ($renderedView == null)
	{
		$userProfile = UserProfile::getUser('`id` = '.$userKey);
		$renderedView = UserProfileViewer::view($userProfile);
		Cache::set('user_profile_'.$userKey, $renderedView);
	}
}
else //List of AI
{
	$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
	$offset = ((int)($offset / AI_SHORT_PROFILE_COUNT_PER_PAGE)) * AI_SHORT_PROFILE_COUNT_PER_PAGE;
	$renderedView = Cache::get('ai_short_profile_top_rated_list_'.$offset, 300);
	if ($renderedView == null)
	{
		$aiUnitList = AiUnit::getTopRatedList($offset, AI_SHORT_PROFILE_COUNT_PER_PAGE);
		$aiUnitCount = AiUnit::count();
		$bestRating = AiUnit::getBestRating();
		$renderedView = AiShortProfileTopRatedListViewer::view($aiUnitList, $offset, AI_SHORT_PROFILE_COUNT_PER_PAGE, $aiUnitCount, $bestRating);
		Cache::set('ai_short_profile_top_rated_list_'.$offset, $renderedView);
	}	
}
?>