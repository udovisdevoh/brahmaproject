<?php
require_once("./framework/settings.php");

define('AI_SHORT_PROFILE_COUNT_PER_PAGE', 20);

if (isset($_GET['ai']))
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
else
{
	$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
	
	$renderedView = Cache::get('ai_short_profile_top_rated_list_'.$offset, 300);
	if ($renderedView == null)
	{
		$aiUnitList = AiUnit::getTopRatedList($offset, AI_SHORT_PROFILE_COUNT_PER_PAGE);
		
		/*echo '<pre>';
		print_r($aiUnitList);
		echo '</pre>';die();*/
		
		$renderedView = AiShortProfileTopRatedListViewer::view($aiUnitList);
		Cache::set('ai_short_profile_top_rated_list_'.$offset, $renderedView);
	}	
}
?>