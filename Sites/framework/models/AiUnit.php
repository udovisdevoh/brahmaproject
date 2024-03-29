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
	
	public static function getAiUnitForUser($aiUnitId, $userKey)
	{
		$selectWhat = '*';
		$where = 'ai_unit.id = '.$aiUnitId.' and ai_unit.user_profile_id = '.$userKey;
		return parent::getObject('ai_unit', $selectWhat, $where);
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
			parent::delete('user_daily_rating','`ai_unit_rated_id` = '.$aiUnitId);
			return parent::delete('ai_unit','`id` = '.$aiUnitId.' and `user_profile_id` = '.$userId, 1);
		}
		else
		{
			return false;
		}
	}
	
	public static function getBestUpRating()
	{
		global $link;
		
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
		global $link;
		
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
		global $link;
		
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
	
	public static function setAvatar($aiUnitId, $userProfileId, $avatarId)
	{
		return parent::update('ai_unit','`avatar_id` = '.$avatarId,'`id` = '.$aiUnitId.' and `user_profile_id` = '.$userProfileId);
	}
	
	public static function newAiUnit($name, $userProfileId)
	{
		$userProfileId = (int)$userProfileId;
		$name = StringManipulation::conceptNameFormatUcFirst($name);
		return parent::newObject('ai_unit','`name` = \''.addslashes($name).'\', `user_profile_id` = '.$userProfileId.', `avatar_id` = '.(rand(1, LAST_AI_AVATAR_ID)));
	}
	
	public static function saveFromAjax($aiUnitId, $memoryString)
	{
		global $link;
		
		$anchorChunkList = explode('<' , $memoryString);
		$isTautologic = false;
		$subject = null;
		$verb = null;
		$complement = null;
		$sqlTransaction = null; //String[]
		
		foreach ($anchorChunkList as $anchorChunk)
		{
			$anchorChunk = trim($anchorChunk);
			if (strlen($anchorChunk) > 0)
			{
				if (substr($anchorChunk, strlen($anchorChunk) - 1, 1) == '>')
				{
					$anchorChunk = substr($anchorChunk, 0, strlen($anchorChunk) - 1);
					
					if (substr($anchorChunk, 0, 10) == 'tautologic')
					{
						$isTautologic = true;
						
						$anchorChunk = substr($anchorChunk, 11);
					}
					else if (substr($anchorChunk, 0, 8) == 'implicit')
					{
						$anchorChunk = substr($anchorChunk, 9);
					}
					else
					{
						echo "Invalid memory format";
						die();
					}
					
					$curlyBracketChunkList = explode('{', $anchorChunk);
					
					foreach ($curlyBracketChunkList as $curlyBracketChunk)
					{
						if (strlen($curlyBracketChunk) > 0)
						{
							if (substr($curlyBracketChunk, strlen($curlyBracketChunk) - 1, 1) == '}')
							{
								$curlyBracketChunk = substr($curlyBracketChunk, 0, strlen($curlyBracketChunk) - 1);
								
								
								$firstColonPosition = strpos($curlyBracketChunk, ':');
								
								if ($firstColonPosition)
								{
									$subject = StringManipulation::conceptNameFormat(substr($curlyBracketChunk, 0, $firstColonPosition));
									
									$curlyBracketChunk = substr($curlyBracketChunk, $firstColonPosition + 1);
									
									$squareBracketChunkList = explode('[' , $curlyBracketChunk);
									
									foreach ($squareBracketChunkList as $squareBracketChunk)
									{
										if (strlen($squareBracketChunk) > 0)
										{
											if (substr($squareBracketChunk, strlen($squareBracketChunk) - 1, 1) == ']')
											{
												$squareBracketChunk = substr($squareBracketChunk, 0, strlen($squareBracketChunk) - 1);
												
												$firstColonPosition = strpos($squareBracketChunk, ':');
												
												if ($firstColonPosition)
												{
													$verb = StringManipulation::conceptNameFormat(substr($squareBracketChunk, 0, $firstColonPosition));													
													$squareBracketChunk = substr($squareBracketChunk, $firstColonPosition + 1);
													
													$complementList = explode(',', $squareBracketChunk);
													
													foreach ($complementList as $complement)
													{
														$complement = trim($complement);
														$complement = StringManipulation::conceptNameFormat($complement);
														if (strlen($complement) > 0)
														{
															$sqlTransaction[] = 'INSERT INTO `connection` SET `ai_unit_id` = \''.$aiUnitId.'\', `subject` = \''.$subject.'\', `verb` = \''.$verb.'\', `complement` = \''.$complement.'\', `is_tautologic` = '.((int)$isTautologic).', `is_true` = 1';
														}
													}
												}
												else
												{
													echo "Invalid memory format";
													die();
												}
											}
											else
											{
												echo "Invalid memory format";
												die();
											}
										}
									}
								}
								else
								{
									echo "Invalid memory format";
									die();
								}
							}
							else
							{
								echo "Invalid memory format";
								die();
							}
						}
					}
				}
				else
				{
					echo "Invalid memory format";
					die();
				}
			}
		}
		
		if ($sqlTransaction == null)
		{
			echo 'Nothing to save';
			die();
		}
		
		
		
		$link = mysql_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PW);
		mysql_select_db(MYSQL_DB);
		
		mysql_query("START TRANSACTION", $link);
		
		mysql_query('DELETE FROM `connection` WHERE `ai_unit_id` = \''.$aiUnitId.'\'');		
		
		foreach ($sqlTransaction as $sqlQuery)
			mysql_query($sqlQuery);
		
		mysql_query("COMMIT", $link);
		
		mysql_close($link);
		
		
		echo '<p class="Success">Success</p>';
	}
}
?>