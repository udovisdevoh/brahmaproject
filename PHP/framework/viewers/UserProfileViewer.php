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
}
?>