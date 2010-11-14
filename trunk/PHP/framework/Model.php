<?php
require_once("./framework/settings.php");

//Represent an abstract model
abstract class Model
{
	public static function getObjectList($tableName = null, $where = null, $orderBy = null, $offset = 0, $limit = -1)
	{
		if ($tableName == null)
			throw new Exception('Table name cannot be null');
		
		$sqlExpression = 'SELECT * FROM '.$tableName;
		
		if ($where != null)
			$sqlExpression .= ' WHERE '.$where;
			
		if ($orderBy != null)
			$sqlExpression .= ' ORDER BY '.$orderBy;
			
		if ($limit != -1)
		{
			if ($offset != 0)
				$sqlExpression .= ' LIMIT '.$offset.','.$limit;
			else
				$sqlExpression .= ' LIMIT '.$limit;
		}
		
		$sqlRowList = array();
		
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
		
		$query = mysql_query($sqlExpression);
		while ($sqlRow = mysql_fetch_array($query))
			$sqlRowList[] = $sqlRow;
		
		mysql_close($link);
		
		return $sqlRowList;
	}
}
?>