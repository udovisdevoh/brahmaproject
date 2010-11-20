<?php
class AiShortProfileTopRatedListViewer
{
	//(String)
	//Return HTML from SQL Query output
	public static function view($aiUnitList, $offset, $countPerPage, $totalCount, $bestUpRating, $worstDownRating)
	{
		$breadCrump = BreadCrumpViewer::view('./?offset=', $offset, $countPerPage, $totalCount);
	
		$html = '';
	
		$html .= '<div style="clear:both"></div>';
		
		$html .= $breadCrump;
		$html .= '<ul class="BotList">';
		
		foreach ($aiUnitList as $aiUnit)
		{
			$name = $aiUnit['name'];
			if (strlen($name) > 32)
				$name = substr($name, 0,32).'...';
				
			$userName = $aiUnit['user_name'];
			if (strlen($userName) > 24)
				$userName = substr($userName, 0, 24).'...';
		
			$ratingBarUp = RatingBarViewer::view($aiUnit['rate_up'], $bestUpRating, 170, true);
			$ratingBarDown = RatingBarViewer::view($aiUnit['rate_down'], $worstDownRating, 170, false);
		
			$html .= '<li>';
			$html .= '<p class="BotName"><strong><a href="./?ai='.$aiUnit['id'].'">'.$name.'</a></strong></p>';
			$html .= '<p><a class="ChatWith" href="./leftBrainChat.php?id='.$aiUnit['id'].'"><img src="./images/chatwith.png" alt="Chat with '.$name.'" />Chat!</a></p>';
			
			$html .= '<div class="Rating"><div class="RatingLabel">up: '.$aiUnit['rate_up'].'</div>'.$ratingBarUp.'</div>';
			$html .= '<div style="clear:both"></div>';
			$html .= '<div class="Rating"><div class="RatingLabel">down: '.$aiUnit['rate_down'].'</div>'.$ratingBarDown.'</div>';
			$html .= '<div style="clear:both"></div>';
			
			
			$html .= '<div class="Owner">owner: <a href="?user='.$aiUnit['user_profile_id'].'">'.$userName.'</a></div>';
			$html .= '</li>';
		}
		
		$html .= '</ul>';
		
		$html .= '<div style="clear:both"></div>';
		
		$html .= $breadCrump;
		
		return $html;
	}
}
?>