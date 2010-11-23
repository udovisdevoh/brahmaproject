<?php
class AiProfileViewer
{
	//(String)
	//Return HTML from SQL Query output
	public static function view($aiUnit, $bestUpRating, $worstDownRating)
	{
		$ratingBarUp = RatingBarViewer::view($aiUnit['rate_up'], $bestUpRating, 170, true);
		$ratingBarDown = RatingBarViewer::view($aiUnit['rate_down'], $worstDownRating, 170, false);
		
		$thumbUp = RatingThumbViewer::view($aiUnit['id'],true);
		$thumbDown = RatingThumbViewer::view($aiUnit['id'],false);
	
		$html = '';
	
		$html .= '<div style="clear:both"></div>';
		
		$html .= '<div class="AiProfile">';
		
		$name = $aiUnit['name'];		
		$userName = $aiUnit['user_name'];

		if (isset($aiUnit['avatar_id']) && $aiUnit['avatar_id'])
			$html .= '<img class="Avatar" src="./images/avatars/ai/'.((int)$aiUnit['avatar_id']).'.png" alt="Avatar" />';		

		$html .= '<h2>'.$name.'</h2>';
		
		$html .= '<p><a class="ChatWith" href="./leftbrainchat.bot?id='.$aiUnit['id'].'"><img src="./images/chatwith.png" alt="Chat with '.$name.'" />Chat with <strong>\''.$name.'\'</strong></a></p>';
		
	
		$html .= '<div class="Rating"><div class="RatingLabel">'.$aiUnit['rate_up'].'</div>'.$ratingBarUp.$thumbUp.'</div>';
		$html .= '<div style="clear:both"></div>';
		$html .= '<div class="Rating"><div class="RatingLabel">'.$aiUnit['rate_down'].'</div>'.$ratingBarDown.$thumbDown.'</div>';
		
		$html .= '<div style="clear:both"></div>';
		$html .= '<div id="ratingMessageOutput"></div>';
		
		$html .= '<div style="clear:both"></div>';
		
		$html .= '<p>owner: <a href="./user.bot?user='.$aiUnit['user_profile_id'].'">'.$userName.'</a></p>';		
		$html .= '</div>';

		
		return $html;
	}
	
	public static function viewShort($aiUnit, $bestUpRating, $worstDownRating)
	{
		$html = '';
		$name = $aiUnit['name'];
		if (strlen($name) > 28)
			$name = substr($name, 0,28).'...';
	
		$ratingBarUp = RatingBarViewer::view($aiUnit['rate_up'], $bestUpRating, 170, true);
		$ratingBarDown = RatingBarViewer::view($aiUnit['rate_down'], $worstDownRating, 170, false);
	
		$html .= '<li>';
		
		if (isset($aiUnit['avatar_id']) && $aiUnit['avatar_id'])
			$html .= '<a href="./?ai='.$aiUnit['id'].'"><img class="Avatar" src="./images/avatars/ai/'.((int)$aiUnit['avatar_id']).'.png" alt="Avatar" /></a>';
		
		$html .= '<p class="BotName"><strong><a href="./?ai='.$aiUnit['id'].'">'.$name.'</a></strong></p>';
		$html .= '<p><a class="ChatWith" href="./leftbrainchat.bot?id='.$aiUnit['id'].'"><img src="./images/chatwith.png" alt="Chat with '.$name.'" />Chat!</a></p>';
		
		
		$html .= '<div class="Rating"><div class="RatingLabel">'.$aiUnit['rate_up'].'</div>'.$ratingBarUp.'</div>';
		$html .= '<div style="clear:both"></div>';
		$html .= '<div class="Rating"><div class="RatingLabel">'.$aiUnit['rate_down'].'</div>'.$ratingBarDown.'</div>';
		$html .= '<div style="clear:both"></div>';
		
		if (isset($aiUnit['user_profile_id']) && isset($aiUnit['user_name']))
		{
			$html .= '<div class="Owner">owner: <a href="./user.bot?user='.$aiUnit['user_profile_id'].'">'.$aiUnit['user_name'].'</a></div>';
			$html .= '</li>';
		}
		
		return $html;
	}
	
	public static function viewEditProfileForm($aiUnit)
	{
		$html = '';
		
		$html .= '<h2>\''.$aiUnit['name'].'\' settings</h2>';
		
		$html .= '<form id="avatarForm" method="post" action="./editbot.bot?ai='.$aiUnit['id'].'">';
		
		
		for ($avatarId = 1; $avatarId <= LAST_AI_AVATAR_ID; $avatarId++)
		{
			if ($avatarId == $aiUnit['avatar_id'])
				$html .= '<div class="Checked AvatarRadioButton"><input type="radio" name="avatar_id" value="'.$avatarId.'" checked="checked" />';
			else
				$html .= '<div class="AvatarRadioButton"><input type="radio" name="avatar_id" value="'.$avatarId.'"/>';
			$html .= '<img src="./images/avatars/ai/'.$avatarId.'.png" alt="Avatar" />';
			
			$html .= '</div>';
		}
		
		$html .= '<div style="clear:both"></div>';
		
		$html .= '<p><input type="Submit" value="Choose avatar" name="chooseAvatar" /></p>';
		
		$html .= '</form>';
		
		return $html;
	}
}
?>