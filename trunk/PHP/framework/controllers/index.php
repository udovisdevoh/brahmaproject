<?php
require_once("./framework/models/AiUnit.php");

if (isset($_GET['ai']))
{
	$aiUnitKey = (int)$_GET['ai'];
	$aiUnit = AiUnit::getAiUnit('`key_name` = '.$aiUnitKey);
}
else
{
	$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
	$aiUnitList = AiUnit::getTopRatedList($offset, 20);
}
?>