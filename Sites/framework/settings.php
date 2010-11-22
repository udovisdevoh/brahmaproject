<?php
require_once("./framework/Model.php");
require_once("./framework/Cache.php");
require_once("./framework/StringManipulation.php");
require_once("./framework/models/AiUnit.php");
require_once("./framework/models/UserProfile.php");
require_once("./framework/viewers/AiProfileViewer.php");
require_once("./framework/viewers/AiShortProfileTopRatedListViewer.php");
require_once("./framework/viewers/BreadCrumpViewer.php");
require_once("./framework/viewers/RatingBarViewer.php");
require_once("./framework/viewers/RatingThumbViewer.php");
require_once("./framework/viewers/UserProfileViewer.php");
require_once("./framework/viewers/AiUnitChatControlsViewer.php");

session_start();

define('MYSQL_SERVER', 'localhost');
define('MYSQL_USER', 'brahmavisitor');
define('MYSQL_DB', 'brahmaproject');
define('MYSQL_PW', 'nxmNKDfpp3HeeUmN');
define('PW_SALT', 'ft56yrthj');
define('DISABLE_CACHE', true);
define('AI_SHORT_PROFILE_COUNT_PER_PAGE', 12);
define('AI_COUNT_LIMIT_PER_USER', 100);
define('DEFAULT_CACHE_TIMEOUT', 300);
define('LAST_AI_AVATAR_ID', 70);


$userProfile = UserProfile::getCurrentUser();

?>