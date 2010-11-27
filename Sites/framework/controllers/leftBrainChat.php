<?php
require_once("./framework/settings.php");

if (!isset($_GET['id']))
	die();
	
$aiUnitKey = (int)$_GET['id'];


$renderedView = Cache::get('left_brain_chat_'.$aiUnitKey, DEFAULT_CACHE_TIMEOUT);
if ($renderedView == null)
{
	$aiUnit = AiUnit::getAiUnit($aiUnitKey);
	if ($aiUnit == null)
		die();
		
	$connectionList = Connection::getConnectionListForAi($aiUnitKey);
	
	$bestUpRating = AiUnit::getBestUpRating();
	$worstDownRating = AiUnit::getWorstDownRating();
	
	$renderedView .= AiUnitChatControlsViewer::view($aiUnit, $bestUpRating, $worstDownRating);
	$renderedView .= AiUnitMemoryViewer::view($connectionList);
	
	Cache::set('left_brain_chat_'.$aiUnitKey, $renderedView);
}


?>