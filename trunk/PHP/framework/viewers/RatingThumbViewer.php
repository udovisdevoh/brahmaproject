<?php
//View rating bar
class RatingThumbViewer
{
	//(String)
	//Return HTML
	public static function view($aiUnitId)
	{	
		$html = '';
		$html .= '<img src="./images/rateup.png" alt="rate up" />';
		$html .= '<img src="./images/ratedown.png" alt="rate down" />';
		return $html;
	}
}
?>