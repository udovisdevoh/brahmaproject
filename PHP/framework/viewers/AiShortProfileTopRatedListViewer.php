<?php
class AiShortProfileTopRatedListViewer
{
	//(String)
	//Return HTML from SQL Query output
	public static function view($aiUnitList, $offset, $countPerPage, $totalCount, $bestRating)
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
		
			$ratingBar = RatingBarViewer::view($aiUnit['rating'], $bestRating, 150);
		
			$html .= '<li>';
			$html .= '<p><strong><a href="./?ai='.$aiUnit['id'].'">'.$name.'</a></strong></p>';
			$html .= '<p><a class="ChatWith" href="./leftBrainChat.php?id='.$aiUnit['id'].'"><img src="./images/chatwith.png" alt="Chat with '.$name.'" />Chat!</a></p>';
			$html .= '<div><div class="RatingLabel">rating: '.$aiUnit['rating'].'</div>'.$ratingBar.'</div>';
			$html .= '<div style="clear:both"></div>';
			$html .= '<p>owner: <a href="?user='.$aiUnit['user_profile_id'].'">'.$userName.'</a></p>';
			$html .= '</li>';
		}
		
		$html .= '</ul>';
		
		$html .= '<div style="clear:both"></div>';
		
		$html .= $breadCrump;
		
		return $html;
	}
}
?>