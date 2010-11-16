<?php
require_once("./framework/settings.php");

if (isset($userProfile))
{
	setcookie('user', null);
	setcookie('password', null);
	unset($_SESSION['userProfile']);
}

$isCreateUserProfile = true;

if (isset($_POST['createAccount']))
{
	if ($_POST['password1'] != $_POST['password2'])
	{
		$errorMessage = "Password doesn't match with confirmation";
	}
	else
	{
		$name = strip_tags($_POST['name']);
		$password = strip_tags($_POST['password1']);
		$email = strip_tags($_POST['email']);
		$first_name = strip_tags($_POST['first_name']);
		$last_name = strip_tags($_POST['last_name']);

		try
		{
			UserProfile::newUserProfile($name, $password, $email, $first_name, $last_name);			
		}
		catch (Exception $exception)
		{
			$errorMessage = $exception->getMessage();
		}
	}
}

?>