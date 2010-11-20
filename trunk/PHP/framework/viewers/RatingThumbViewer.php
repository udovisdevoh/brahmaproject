<?php
//View rating bar
class RatingThumbViewer
{
	//(String)
	//Return HTML
	public static function view($aiUnitId, $isUp)
	{	
		$html = '';
		
		if ($isUp)
		{
			$html .= '<img class="RatingButton" id="rateUp" onClick="rateBot('.$aiUnitId.', true, "ratingMessageOutput");" src="./images/rateup.png" alt="rate up" />';
			$html .= '<div id="ratingMessageOutput"></div>';
		}
		else
		{
			$html .= '<img class="RatingButton" id="rateDown" onClick="rateBot('.$aiUnitId.', false, "ratingMessageOutput");" src="./images/ratedown.png" alt="rate down" />';
		}
		
		
		return $html;
	}
}
?>