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
		return parent::getObjectList('ai_unit', null, 'rating DESC', $offset, $limit);
	}
	public static function getAiUnit($where)
	{
		return parent::getObject('ai_unit', $where);
	}
}
?>