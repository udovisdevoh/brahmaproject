<?php
class AiUnitChatControlsViewer
{
	public static function view($aiUnit, $bestUpRating, $worstDownRating)
	{
		$ratingBarUp = RatingBarViewer::view($aiUnit['rate_up'], $bestUpRating, 170, true);
		$ratingBarDown = RatingBarViewer::view($aiUnit['rate_down'], $worstDownRating, 170, false);
		
		
		$html = '';
		
		$html .= '<div class="AiUnitChatControls">';
		
		
			$name = $aiUnit['name'];
			if (strlen($name) > 28)
				$name = substr($name, 0,28).'...';
				
			if (isset($aiUnit['avatar_id']) && $aiUnit['avatar_id'])
				$html .= '<img class="Avatar" src="./images/avatars/ai/'.((int)$aiUnit['avatar_id']).'.png" alt="Avatar" />';
			
			$html .= '<div class="Names">';
				$html .= '<div class="SiteName">BrahmaProject.org</div>';
				$html .= '<div class="AiName">'.$name.'</div>';
			$html .= '</div>';
			
			
			$html .= '<div style="clear:both"></div>';
			
			$html .= '<div class="Rating"><div class="RatingLabel">up: '.$aiUnit['rate_up'].'</div>'.$ratingBarUp.'</div>';
			$html .= '<div style="clear:both"></div>';
			$html .= '<div class="Rating"><div class="RatingLabel">down: '.$aiUnit['rate_down'].'</div>'.$ratingBarDown.'</div>';
			$html .= '<div style="clear:both"></div>';
			
			if (isset($aiUnit['user_profile_id']) && isset($aiUnit['user_name']))
			{
				$html .= '<div class="Owner">Owner: <i>'.$aiUnit['user_name'].'</i></div>';
			}
			
			
			$html .= '<a class="Button" onClick="if (confirm(\'Overwrite changes?\')) {saveAjax('.$aiUnit['id'].'); }">Save</a>';
		
		$html .= '</div>';
		
		return $html;
	}
}
?>