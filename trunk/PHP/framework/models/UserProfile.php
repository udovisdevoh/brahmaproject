<?php
//Represents a user's profile
class UserProfile extends Model
{
	private $id;
	private $key_name;
	private $name;
	private $password;
	private $email;
	private $first_name;
	private $last_name;
	private $is_active;
	
	public static function getCurrentUser()
	{
		if (isset($_SESSION['userProfile']) && $_SESSION['userProfile'])
			return $_SESSION['userProfile'];
			
		if (isset($_POST['user']) && isset($_POST['password']) && isset($_POST['signIn']))
		{
			$user = $_POST['user'];
			$password = md5($_POST['password']);
		}
		else if (isset($_COOKIE['user']) && isset($_COOKIE['password']))
		{
			$user = $_COOKIE['user'];
			$password = $_COOKIE['password'];
		}
		
		if (isset($user) && isset($password))
		{
			$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
			mysql_select_db(MYSQL_DB);
			$query = mysql_query('SELECT * FROM `user_profile` WHERE `key_name` = \''.addslashes($user).'\' AND `password` = \''.addslashes($password).'\' LIMIT 1');
			$sqlRow = mysql_fetch_array($query);
			
			mysql_close($link);
			
			if ($sqlRow['id'] > 0)
			{
				setcookie('user', $user, time()+86400);
				setcookie('password', $password, time()+86400);
			
				$_SESSION['userProfile'] = $sqlRow;
				
				header('Location: ./');
				return $sqlRow;
			}
		}
		
		return null;
	}
}
?>