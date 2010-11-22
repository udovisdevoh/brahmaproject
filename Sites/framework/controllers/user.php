<?php
require_once("./framework/settings.php");

if (isset($_GET['user'])) //Single User
{
	$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
	$offset = ((int)($offset / AI_SHORT_PROFILE_COUNT_PER_PAGE)) * AI_SHORT_PROFILE_COUNT_PER_PAGE;
	
	if ($offset > AI_COUNT_LIMIT_PER_USER || $offset < 0)
		die();
	
	$userKey = (int)$_GET['user'];
	$renderedView = Cache::get('user_profile_'.$userKey.'_'.$offset, DEFAULT_CACHE_TIMEOUT);
	if ($renderedView == null)
	{
		$viewedUserProfile = UserProfile::getUser('`id` = '.$userKey.' and `is_active` = 1');	
		if ($viewedUserProfile == null)
			die();			
		$aiUnitList = AiUnit::getAiUnitListForUser($userKey, $offset, AI_SHORT_PROFILE_COUNT_PER_PAGE);
		$bestUpRating = AiUnit::getBestUpRating();
		$worstDownRating = AiUnit::getWorstDownRating();
		$aiUnitCount = AiUnit::countForUser($userKey);

		
		$totalUpRating = UserProfile::getTotalUpRating($userKey);
		$totalDownRating = UserProfile::getTotalDownRating($userKey);
		$rank = UserProfile::getRank($userKey);
		
		$renderedView = UserProfileViewer::view($viewedUserProfile, $aiUnitList, $offset, AI_SHORT_PROFILE_COUNT_PER_PAGE, $aiUnitCount, $bestUpRating, $worstDownRating, $totalUpRating, $totalDownRating, $rank);
		
		if ($aiUnitList != null)
			Cache::set('user_profile_'.$userKey.'_'.$offset, $renderedView);
	}
}
else
{
	//Implement list of users
	die();
}
?>