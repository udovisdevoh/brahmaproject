<?php

class connection extends Model
{
	public static function getConnectionListForAi($aiUnitId)
	{
		return parent::getObjectList('connection', '`subject`, `verb`, `complement`', '`ai_unit_id` = \''.$aiUnitId.'\'');
	}
}

?>