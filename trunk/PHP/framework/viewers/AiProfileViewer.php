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
	

		$html .= '<h2>'.$name.'</h2>';
		
		$html .= '<p><a class="ChatWith" href="./leftbrainchat.php?id='.$aiUnit['id'].'"><img src="./images/chatwith.png" alt="Chat with '.$name.'" />Chat with <strong>\''.$name.'\'</strong></a></p>';
		
		$html .= '<div class="Rating"><div class="RatingLabel">'.$aiUnit['rate_up'].'</div>'.$ratingBarUp.$thumbUp.'</div>';
		$html .= '<div style="clear:both"></div>';
		$html .= '<div class="Rating"><div class="RatingLabel">'.$aiUnit['rate_down'].'</div>'.$ratingBarDown.$thumbDown.'</div>';
		
		$html .= '<div style="clear:both"></div>';
		$html .= '<div id="ratingMessageOutput"></div>';
		
		$html .= '<div style="clear:both"></div>';
		
		$html .= '<p>owner: <a href="?user='.$aiUnit['user_profile_id'].'">'.$userName.'</a></p>';		
		$html .= '</div>';

		
		return $html;
	}
	
	public static function viewShort($aiUnit, $bestUpRating, $worstDownRating)
	{
		$html = '';
		$name = $aiUnit['name'];
		if (strlen($name) > 32)
			$name = substr($name, 0,32).'...';
	
		$ratingBarUp = RatingBarViewer::view($aiUnit['rate_up'], $bestUpRating, 170, true);
		$ratingBarDown = RatingBarViewer::view($aiUnit['rate_down'], $worstDownRating, 170, false);
	
		$html .= '<li>';
		$html .= '<p class="BotName"><strong><a href="./?ai='.$aiUnit['id'].'">'.$name.'</a></strong></p>';
		$html .= '<p><a class="ChatWith" href="./leftbrainchat.php?id='.$aiUnit['id'].'"><img src="./images/chatwith.png" alt="Chat with '.$name.'" />Chat!</a></p>';
		
		$html .= '<div class="Rating"><div class="RatingLabel">'.$aiUnit['rate_up'].'</div>'.$ratingBarUp.'</div>';
		$html .= '<div style="clear:both"></div>';
		$html .= '<div class="Rating"><div class="RatingLabel">'.$aiUnit['rate_down'].'</div>'.$ratingBarDown.'</div>';
		$html .= '<div style="clear:both"></div>';
		
		if (isset($aiUnit['user_profile_id']) && isset($aiUnit['user_name']))
		{
			$html .= '<div class="Owner">owner: <a href="?user='.$aiUnit['user_profile_id'].'">'.$aiUnit['user_name'].'</a></div>';
			$html .= '</li>';
		}
		
		return $html;
	}
}
?>