	<?php
//Represents a client side AI unit (left brain)
class AiUnit extends Model
{
	private $id;
	private $key_name;
	private $name;
	private $rateUp;
	private $rateDown;
	private $user_profile_id;
	
	public static function getTopRatedList($offset, $limit)
	{
		$selectWhat = 'ai_unit.id, ai_unit.name, ai_unit.rate_up, ai_unit.rate_down, ai_unit.name, ai_unit.user_profile_id, ai_unit.avatar_id, user_profile.name as `user_name`';
		$where = 'ai_unit.user_profile_id = user_profile.id and user_profile.is_active = 1';
		return parent::getObjectList('ai_unit, user_profile', $selectWhat, $where, '(rate_up - rate_down) DESC', $offset, $limit);
	}
	
	public static function count()
	{
		return parent::count('ai_unit','id');
	}
	
	public static function countForUser($userKey)
	{
		return parent::count('ai_unit','id','user_profile_id = '.$userKey);
	}
	
	public static function getAiUnit($id)
	{
		$selectWhat = 'ai_unit.id, ai_unit.name, ai_unit.rate_up, ai_unit.rate_down, ai_unit.name, ai_unit.avatar_id, ai_unit.user_profile_id, user_profile.name as `user_name`';
		$where = 'ai_unit.id = '.$id.' and ai_unit.user_profile_id = user_profile.id and user_profile.is_active = 1';
		return parent::getObject('ai_unit, user_profile', $selectWhat, $where);
	}
	
	public static function getName($id)
	{
		$selectWhat = 'ai_unit.name';
		$where = 'ai_unit.id = '.$id;
		$row = parent::getObject('ai_unit, user_profile', $selectWhat, $where);
		return $row['name'];
	}
	
	public static function delete($aiUnitId, $userId)
	{
		$aiUnitId = (int)$aiUnitId;
		$userId = (int)$userId;
		
		$aiUnit = parent::getObject('ai_unit','id','`id` = '.$aiUnitId.' and `user_profile_id` = '.$userId);
		
		if ($aiUnit != null)
		{
			parent::delete('connection','`ai_unit_id` = '.$aiUnitId);
			return parent::delete('ai_unit','`id` = '.$aiUnitId.' and `user_profile_id` = '.$userId, 1);
		}
		else
		{
			return false;
		}
	}
	
	public static function getBestUpRating()
	{
		$bestRating = 0;
		$sqlExpression = 'SELECT rate_up FROM ai_unit ORDER BY rate_up DESC LIMIT 1';
		
		
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
		
		$query = mysql_query($sqlExpression);
		if ($sqlRow = mysql_fetch_array($query))
			$bestRating = $sqlRow['rate_up'];
		
		mysql_close($link);
		
		return $bestRating;
	}
	
	public static function getWorstDownRating()
	{
		$bestRating = 0;
		$sqlExpression = 'SELECT rate_down FROM ai_unit ORDER BY rate_down DESC LIMIT 1';
		
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
		
		$query = mysql_query($sqlExpression);
		if ($sqlRow = mysql_fetch_array($query))
			$bestRating = $sqlRow['rate_down'];
		
		mysql_close($link);
		
		return $bestRating;
	}
	
	public static function rate($userProfileId, $aiBotId, $ip, $todayTimeStamp, $isUp)
	{
		$isUp = (int)$isUp;
		$sqlExpression = 'SELECT user_profile_rater_id FROM user_daily_rating WHERE `user_profile_rater_id` = '.$userProfileId.' and `ai_unit_rated_id` = '.$aiBotId;
		
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
		
		
		$query = mysql_query($sqlExpression);
		$isFound = ($sqlRow = mysql_fetch_array($query));
		
		
		if ($isFound)
		{
			mysql_query('UPDATE `user_daily_rating` SET `ip` = \''.$ip.'\', `modified` = FROM_UNIXTIME('.$todayTimeStamp.'), `is_up` = '.$isUp.' WHERE `user_profile_rater_id` = '.$userProfileId.' and `ai_unit_rated_id` = '.$aiBotId);
		}
		else
		{
			mysql_query('INSERT INTO `user_daily_rating` SET `ip` = \''.$ip.'\', `modified` = FROM_UNIXTIME('.$todayTimeStamp.'), `is_up` = '.$isUp.', `user_profile_rater_id` = '.$userProfileId.', `ai_unit_rated_id` = '.$aiBotId);
		}
		
		
		if ($isUp)
			mysql_query('UPDATE `ai_unit` SET `rate_up` = `rate_up` + 1 WHERE `id` = '.$aiBotId);
		else
			mysql_query('UPDATE `ai_unit` SET `rate_down` = `rate_down` + 1 WHERE `id` = '.$aiBotId);
		
		
		mysql_close($link);
	}

	public static function getAiUnitListForUser($userId, $offset, $limit)
	{
		$selectWhat = 'id, name, rate_up, rate_down, avatar_id';
		$where = 'user_profile_id = '.$userId;
		return parent::getObjectList('ai_unit', $selectWhat, $where, '(rate_up - rate_down) DESC', $offset, $limit);
	}
}
?>