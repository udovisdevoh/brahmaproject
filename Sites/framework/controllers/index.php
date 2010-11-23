<?php
require_once("./framework/settings.php");

if (isset($_GET['ai']) && $_GET['ai']) //Single AI
{
	$aiUnitKey = (int)$_GET['ai'];
	$renderedView = Cache::get('ai_profile_'.$aiUnitKey, DEFAULT_CACHE_TIMEOUT);
	if ($renderedView == null)
	{
		$aiUnit = AiUnit::getAiUnit($aiUnitKey);
		if ($aiUnit == null)
			die();			
		$bestUpRating = AiUnit::getBestUpRating();
		$worstDownRating = AiUnit::getWorstDownRating();
		$renderedView = AiProfileViewer::view($aiUnit, $bestUpRating, $worstDownRating);
		Cache::set('ai_profile_'.$aiUnitKey, $renderedView);
	}
}
else //List of AI
{
	$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
	$offset = ((int)($offset / AI_SHORT_PROFILE_COUNT_PER_PAGE)) * AI_SHORT_PROFILE_COUNT_PER_PAGE;
	
	if ($offset < 0)
		die();
	
	$renderedView = Cache::get('ai_short_profile_top_rated_list_'.$offset, DEFAULT_CACHE_TIMEOUT);
	if ($renderedView == null)
	{
		$aiUnitList = AiUnit::getTopRatedList($offset, AI_SHORT_PROFILE_COUNT_PER_PAGE);
		if ($aiUnitList == null && $offset != 0)
			die();	
		$aiUnitCount = AiUnit::count();
		$bestUpRating = AiUnit::getBestUpRating();
		$worstDownRating = AiUnit::getWorstDownRating();
		$renderedView = AiShortProfileTopRatedListViewer::view($aiUnitList, $offset, AI_SHORT_PROFILE_COUNT_PER_PAGE, $aiUnitCount, $bestUpRating, $worstDownRating);
		Cache::set('ai_short_profile_top_rated_list_'.$offset, $renderedView);
	}	
}
?>