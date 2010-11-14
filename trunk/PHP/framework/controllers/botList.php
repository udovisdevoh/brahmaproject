<?php
require_once("./framework/models/AiUnit.php");

$aiUnitList = AiUnit::getTopRatedList(20);
?>