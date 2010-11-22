<?php
require_once("./framework/settings.php");


	
$aiUnitId = (int)$_GET['id'];

$aiUnit = AiUnit::getAiUnit($aiUnitId);


if ($aiUnit == null)
	die();
	




?>