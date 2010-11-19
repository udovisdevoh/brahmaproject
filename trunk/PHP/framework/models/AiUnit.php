	<?php
//Represents a client side AI unit (left brain)
class AiUnit extends Model
{
	private $id;
	private $key_name;
	private $name;
	private $rating;
	private $user_profile_id;
	
	public static function getTopRatedList($offset, $limit)
	{
		$selectWhat = 'ai_unit.id, ai_unit.name, ai_unit.rating, ai_unit.name, ai_unit.user_profile_id, user_profile.name as `user_name`';
		$where = 'ai_unit.user_profile_id = user_profile.id and user_profile.is_active = 1';
		return parent::getObjectList('ai_unit, user_profile', $selectWhat, $where, 'rating DESC', $offset, $limit);
	}
	
	public static function count()
	{
		return parent::count('ai_unit','id');
	}
	
	public static function getAiUnit($id)
	{
		$selectWhat = 'ai_unit.id, ai_unit.name, ai_unit.rating, ai_unit.name, ai_unit.user_profile_id, user_profile.name as `user_name`';
		$where = 'ai_unit.id = '.$id.' and ai_unit.user_profile_id = user_profile.id and user_profile.is_active = 1';
		return parent::getObject('ai_unit, user_profile', $selectWhat, $where);
	}
	
	public static function getBestRating()
	{
		$bestRating = 0;
		$sqlExpression = 'SELECT rating FROM ai_unit ORDER BY rating DESC LIMIT 1';
		
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
		
		$query = mysql_query($sqlExpression);
		if ($sqlRow = mysql_fetch_array($query))
			$bestRating = $sqlRow['rating'];
		
		mysql_close($link);
		
		return $bestRating;
	}
}
?>