<?php
require_once("./framework/models/AiUnit.php");

$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

$aiUnitList = AiUnit::getTopRatedList($offset, 20);
?>