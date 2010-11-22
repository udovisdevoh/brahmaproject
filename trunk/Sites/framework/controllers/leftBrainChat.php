<?php
require_once("./framework/settings.php");

if (!isset($_GET['id']))
	die();
	
$aiUnitKey = (int)$_GET['id'];


$renderedView = Cache::get('ai_unit_chat_controls_'.$aiUnitKey, DEFAULT_CACHE_TIMEOUT);
if ($renderedView == null)
{
	$aiUnit = AiUnit::getAiUnit($aiUnitKey);
	if ($aiUnit == null)
		die();			
	
	$renderedView = AiUnitChatControlsViewer::view($aiUnit);
	Cache::set('ai_unit_chat_controls_'.$aiUnitKey, $renderedView);
}


?>