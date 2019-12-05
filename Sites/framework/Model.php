<?php
global $link;

function mysql_connect($hostName, $user, $password)
{
	return mysqli_connect($hostName, $user, $password);
}

function mysql_select_db($database)
{
	global $link;
	return mysqli_select_db($link, $database);
}

function mysql_query($sql)
{
	global $link;
	return mysqli_query($link, $sql);
}

function mysql_fetch_array($query)
{
	$row = mysqli_fetch_array($query);	
	return $row;
}

function mysql_close($link2)
{
	mysqli_close($link2);
}

require_once("./framework/settings.php");

//Represent an abstract model
abstract class Model
{
	public static function getObjectList($tableName = null, $selectWhat = '*', $where = null, $orderBy = null, $offset = 0, $limit = -1)
	{
		global $link;
		
		if ($tableName == null)
			throw new Exception('Table name cannot be null');
		
		$sqlExpression = 'SELECT '.$selectWhat.' FROM '.$tableName;
		
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
	
	public static function getObject($tableName = null, $selectWhat = '*', $where = null, $orderBy = null)
	{
		global $link;
		
		if ($tableName == null)
			throw new Exception('Table name cannot be null');
		
		$sqlExpression = 'SELECT '.$selectWhat.' FROM '.$tableName;
		
		if ($where != null)
			$sqlExpression .= ' WHERE '.$where;
			
		if ($orderBy != null)
			$sqlExpression .= ' ORDER BY '.$orderBy;
			
		$sqlExpression .= ' LIMIT 1';

		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
		
		$query = mysql_query($sqlExpression);
		$sqlRow = mysql_fetch_array($query);
		
		mysql_close($link);
		
		return $sqlRow;
	}
	
	public static function count($tableName = null, $columnName = 'id', $where = null)
	{
		global $link;
		
		if ($tableName == null)
			throw new Exception('Table name cannot be null');
		
		$sqlExpression = 'SELECT count('.$columnName.') FROM '.$tableName;
		
		if ($where != null)
			$sqlExpression .= ' WHERE '.$where;
			
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
		
		$query = mysql_query($sqlExpression);
		$sqlRow = mysql_fetch_array($query);
		
		mysql_close($link);
		
		return $sqlRow[0];
	}
	
	public static function delete($tableName, $where, $limit = -1)
	{
		global $link;
		
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
				
		$sqlExpression = 'delete from '.$tableName.' where '.$where;
			
		if ($limit != -1)
			$sqlExpression .= ' limit '.$limit;
		
		$query = mysql_query($sqlExpression);
		
		mysql_close($link);		
	
		
		return $query;
	}
	
	public static function update($tableName, $fieldsString, $where)
	{
		global $link;
		
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
				
		$sqlExpression = 'update '.$tableName.' set '.$fieldsString.' where '.$where;
		

		$query = mysql_query($sqlExpression);
		
		$sqlRow = mysql_fetch_array($query);
		
		mysql_close($link);
	}
	
	public static function newObject($tableName, $fieldsString)
	{
		global $link;
		
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
				
		$sqlExpression = 'insert into '.$tableName.' set '.$fieldsString;
		
		if (!mysql_query($sqlExpression))
		{
			throw new Exception("Couldn't insert row");
		}
				
		mysql_close($link);
	}
}
?>