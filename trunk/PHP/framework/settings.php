<?php
require_once("./framework/Model.php");
require_once("./framework/models/AiUnit.php");
require_once("./framework/models/UserProfile.php");

session_start();

define('MYSQL_SERVER', 'localhost');
define('MYSQL_USER', 'brahmavisitor');
define('MYSQL_DB', 'brahmaproject');
define('MYSQL_PW', 'nxmNKDfpp3HeeUmN');


$userProfile = UserProfile::getCurrentUser();



?>