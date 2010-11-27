<?php
define('CACHE_DIRECTORY', './framework/tmp/');

//Manages cache
class Cache
{
	//(String)
	//time limit (in seconds)
	//get key and return cached string or null if not cached or time expired
	public static function get($key, $limitTimeSeconds)
	{
		if (DISABLE_CACHE)
			return null;
			
		$fileName = CACHE_DIRECTORY.$key;
		if (file_exists($fileName))
		{
			$fileTime = filemtime($fileName);
			if (time() - $fileTime < $limitTimeSeconds)
			{
				return file_get_contents($fileName);
			}
		}
		return null;
	}
	
	//(Void)
	//Add something to cache: key, value
	public static function set($key, $value)
	{
		if (DISABLE_CACHE)
			return false;
	
		$fileName = CACHE_DIRECTORY.$key;
		$filePointer = fopen($fileName, 'w');
		fwrite($filePointer, $value);
		fclose($filePointer);
	}
	
	//(Void)
	//Reset something in cache
	public static function reset($key)
	{
		if (DISABLE_CACHE)
			return;
			
		$fileName = CACHE_DIRECTORY.$key;
		if (file_exists($fileName))
		{
			unlink($fileName);
		}
		return;
	}
}
?>