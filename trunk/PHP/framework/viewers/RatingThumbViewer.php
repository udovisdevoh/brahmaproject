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
			$html .= '<img class="RatingButton" id="rateUp" onClick="rateBot('.$aiUnitId.', 1, \'ratingMessageOutput\');" src="./images/rateup.png" alt="rate up" />';
		}
		else
		{
			$html .= '<img class="RatingButton" id="rateDown" onClick="rateBot('.$aiUnitId.', 0, \'ratingMessageOutput\');" src="./images/ratedown.png" alt="rate down" />';
		}
		
		
		return $html;
	}
}
?>