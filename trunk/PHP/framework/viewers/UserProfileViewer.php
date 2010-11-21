<?php
class UserProfileViewer
{
	public static function view($user, $aiUnitList, $offset, $countPerPage, $totalCount, $bestUpRating, $worstDownRating, $totalUpRating, $totalDownRating, $rank)
	{
		$breadCrump = BreadCrumpViewer::view('./user.php?user='.$user['id'].'&offset=', $offset, $countPerPage, $totalCount);
	
		$html = '';
		
		$html .= '<div class="UserInfo">';
		$html .= '<h2>'.$user['name'].'</h2>';
		$html .= '<p>('.$user['first_name'].' '.$user['last_name'].')</p>';
		$html .= '<p>Rank: <strong>#'.$rank.'</strong></p>';
		$html .= '<p>Total up rating: <strong>'.$totalUpRating.'</strong></p>';
		$html .= '<p>Total down rating: <strong>'.$totalDownRating.'</strong></p>';
		$html .= '</div>';
		
		$html .= $breadCrump;
		$html .= '<ul class="BotList">';
		
		foreach ($aiUnitList as $aiUnit)
		{
			$html .= AiProfileViewer::viewShort($aiUnit, $bestUpRating, $worstDownRating);
		}
		
		$html .= '</ul>';

		$html .= '<div style="clear:both"></div>';
		
		$html .= $breadCrump;
		
		return $html;
	}
	
	public static function viewAccountSettings($user, $aiUnitList)
	{
		$html = '';
		
		$newBotLink = '<a class="Icon" href="./newbot.php" /><img src="./images/new.png" alt="Create new Left Brain Bot" /><span>Create new Left Brain Bot</span></a>';
		
		$html .= '<h2>My Account ('.$user['name'].')</h2>';
		
		$html .= $newBotLink;
		
		$html .= '<a class="Icon" href="./user.php?user='.$user['id'].'"><img src="./images/userpublicprofile.png" alt="View public profile" /><span>View public profile</span></a>';		
		
		$html .= '<div style="clear:both"></div>';
		
		$html .= '<h3>My left brain bots</h3>';
		
		foreach ($aiUnitList as $aiUnit)
		{
			$html .= '<div class="AccountSettingsAiUnit">';
			
			if (isset($aiUnit['avatar_id']) && $aiUnit['avatar_id'])
				$html .= '<img class="AvatarAccountSettings" src="./images/avatars/ai/'.$aiUnit['avatar_id'].'.png" alt="Avatar" />';
			
			$html .= '<div class="Name">'.$aiUnit['name'].'</div>';
			$html .= '<a href="./?ai='.$aiUnit['id'].'" class="ViewProfile"><span>view profile</span></a>';
			$html .= '<a href="./leftbrainchat.php?ai='.$aiUnit['id'].'" class="Train"><span>train</span></a>';
			$html .= '<a href="./editbot.php?ai='.$aiUnit['id'].'" class="Settings"><span>settings</span></a>';
			$html .= '<a href="./deletebot.php?ai='.$aiUnit['id'].'" class="Delete"><span>delete</span></a>';
			$html .= '</div>';
		}
			
		$html .= '<div style="clear:both"></div>';
		
		return $html;
	}
}
?>