<?php
require_once("./framework/settings.php");

if (!isset($_GET['id']))
	die();
	
$aiUnitId = (int)$_GET['id'];

$aiUnit = AiUnit::getAiUnit($aiUnitId);


if ($aiUnit == null)
	die();
	




?>