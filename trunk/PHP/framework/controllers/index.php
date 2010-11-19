<?php
require_once("./framework/settings.php");

define('AI_SHORT_PROFILE_COUNT_PER_PAGE', 5);

if (isset($_GET['ai'])) //Single AI
{
	$aiUnitKey = (int)$_GET['ai'];
	$renderedView = Cache::get('ai_short_profile_'.$aiUnitKey, 300);
	if ($renderedView == null)
	{
		$aiUnit = AiUnit::getAiUnit('`id` = '.$aiUnitKey);
		$renderedView = AiShortProfileViewer::view($aiUnit);
		Cache::set('ai_short_profile_'.$aiUnitKey, $renderedView);
	}
}
else //List of AI
{
	$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
	$offset = ((int)$offset / AI_SHORT_PROFILE_COUNT_PER_PAGE) * AI_SHORT_PROFILE_COUNT_PER_PAGE;

	
	$renderedView = Cache::get('ai_short_profile_top_rated_list_'.$offset, 300);
	if ($renderedView == null)
	{
		$aiUnitList = AiUnit::getTopRatedList($offset, AI_SHORT_PROFILE_COUNT_PER_PAGE);
		$aiUnitCount = AiUnit::count();
		$renderedView = AiShortProfileTopRatedListViewer::view($aiUnitList, $offset, AI_SHORT_PROFILE_COUNT_PER_PAGE, $aiUnitCount);
		Cache::set('ai_short_profile_top_rated_list_'.$offset, $renderedView);
	}	
}
?>