<?php
//View rating bar
class RatingBarViewer
{
	//(String)
	//Return HTML
	public static function view($currentRating, $maxRating, $maxWidth, $isUp)
	{	
		if ($maxRating < 1)
			$maxRating = 1;
		
		$hue = (int)($currentRating / $maxRating * 128);
		

		$width = (int)($currentRating / $maxRating * $maxWidth) + 1;
		
		if ($isUp)
			$html = '<div class="RatingBar RatingBarUp" style="width:'.$width.'px;"></div>';
		else
			$html = '<div class="RatingBar RatingBarDown" style="width:'.$width.'px;"></div>';
		
		return $html;
	}
}