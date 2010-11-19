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
	
	public static function getAiUnit($where)
	{
		return parent::getObject('ai_unit', $where);
	}
}
?>