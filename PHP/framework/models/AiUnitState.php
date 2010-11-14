<?php
//Represents the state of a AiUnit (so we can revert to previous states)
class AiUnitState extends Model
{
	private $id;
	private $data;
	private $modified;
	private $ai_unit_id;
}
?>