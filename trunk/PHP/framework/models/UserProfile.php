<?php
//Represents a user's profile
class UserProfile extends Model
{
	private $id;
	private $name;
	private $password;
	private $email;
	private $first_name;
	private $last_name;
	private $is_active;
	
	public static function signIn($user, $password)
	{
		$password = md5(PW_SALT.$password);
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);

		$query = mysql_query('SELECT * FROM `user_profile` WHERE `name` = \''.addslashes($user).'\' AND `password` = \''.addslashes($password).'\' AND `is_active` = 1 LIMIT 1');
		$sqlRow = mysql_fetch_array($query);
		
		mysql_close($link);
		
		if ($sqlRow['id'] > 0)
		{
			setcookie('user', $user, time()+86400);
			setcookie('password', $password, time()+86400);
		
			$_SESSION['userProfile'] = $sqlRow;
			

			return $sqlRow;
		}

		return null;
	}
	
	public static function getCurrentUser()
	{
		if (isset($_SESSION['userProfile']) && $_SESSION['userProfile'])
			return $_SESSION['userProfile'];
			
		if (isset($_COOKIE['user']) && isset($_COOKIE['password']))
		{
			$user = $_COOKIE['user'];
			$password = $_COOKIE['password'];
		}
		
		if (isset($user) && isset($password))
		{
			$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
			mysql_select_db(MYSQL_DB);

			$query = mysql_query('SELECT * FROM `user_profile` WHERE `name` = \''.addslashes($user).'\' AND `password` = \''.addslashes($password).'\' AND `is_active` = 1 LIMIT 1');
			$sqlRow = mysql_fetch_array($query);
			
			mysql_close($link);
			
			if ($sqlRow['id'] > 0)
			{
				setcookie('user', $user, time()+86400);
				setcookie('password', $password, time()+86400);
			
				$_SESSION['userProfile'] = $sqlRow;
				
				

				return $sqlRow;
			}
		}
		
		return null;
	}
	
	public static function getUser($where)
	{
		return parent::getObject('user_profile', '*', $where, null);
	}
	
	public static function newUserProfile($name, $password, $email, $first_name, $last_name)
	{
		if (!self::isValidEmail($email))
			throw new Exception("Please use a valid email address");
			
		if (!self::isValidPassword($password))
			throw new Exception("Password must be at least 8 chars, must contain a lower case, a capital, a number and a symbol ($%&*!? etc)");
	
		$password = md5(PW_SALT.$password);
	
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
			
		if (!mysql_query("INSERT INTO user_profile
		(
			`id`,
			`name`,
			`password`,
			`email`,
			`first_name`,
			`last_name`,
			`is_active`
		)
		values (
			'',
			'".addslashes($name)."',
			'".addslashes($password)."',
			'".addslashes($email)."',
			'".addslashes($first_name)."',
			'".addslashes($last_name)."',
			'1')"))
		{
			mysql_close($link);
			throw new Exception("This username or email already exist");
		}
		
		mysql_close($link);
		
		setcookie('user', $name, time()+86400);
		setcookie('password', $password, time()+86400);
		
		header('Location: ./');
	}
	
	function isValidEmail($email)
	{
		return preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/", $email); 
	}
	
	public static function isValidPassword($password)
	{
		if (strlen($password) < 8)
			return false;
		else if (!preg_match("#[a-z]+#", $password))
			return false;
		else if (!preg_match("#[A-Z]+#", $password))
			return false;
		else if (!preg_match("#[0-9]+#", $password))
			return false;
		else if (!preg_match("#\W+#", $password))
			return false;
		
		return true;
	}
	
	public static function isCanRate($userId, $aiBotId, $ip, $todayTimeStamp)
	{
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
		
		$query = mysql_query('SELECT user_profile_rater_id FROM `user_daily_rating` WHERE (`user_profile_rater_id` = '.$userId.' or `ip` = \''.$ip.'\') and `ai_unit_rated_id` = '.$aiBotId.' and `modified` = FROM_UNIXTIME('.$todayTimeStamp.') LIMIT 1');
		$isFound = ($sqlRow = mysql_fetch_array($query));
			
		mysql_close($link);
		
		return !$isFound;
	}
}
?>