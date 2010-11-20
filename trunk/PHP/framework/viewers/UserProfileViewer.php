<?php
class UserProfileViewer
{
	public static function view($user, $aiUnitList, $bestUpRating, $worstDownRating, $totalUpRating, $totalDownRating)
	{
		$html = '';
		
		$html .= '<div class="UserInfo">';
		$html .= '<h2>'.$user['name'].'</h2>';
		$html .= '<p>('.$user['first_name'].' '.$user['last_name'].')</p>';
		$html .= '<p>Total up rating: '.$totalUpRating.'</p>';
		$html .= '<p>Total down rating: '.$totalDownRating.'</p>';
		$html .= '</div>';
		

		$html .= '<ul class="BotList">';
		
		foreach ($aiUnitList as $aiUnit)
		{
			$html .= AiProfileViewer::viewShort($aiUnit, $bestUpRating, $worstDownRating);
		}
		
		$html .= '</ul>';

		
		return $html;
	}
}
?>