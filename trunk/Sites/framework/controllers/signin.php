<?php
require_once("./framework/settings.php");
$userProfile = UserProfile::signIn(urldecode($_POST['user']), urldecode($_POST['password']));
?>