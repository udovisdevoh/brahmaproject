<?php
require_once("./framework/Model.php");

//Represents a client side AI unit (left brain)
class AiUnit extends Model
{
	private $id;
	private $key_name;
	private $name;
	private $rating;
	private $user_profile_id;
	
	public static function getTopRatedList($count)
	{
		$topRatedList = Array();
		return $topRatedList;
	}
}
?>