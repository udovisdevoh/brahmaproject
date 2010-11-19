<?php
//View rating bar
class RatingBarViewer
{
	//(String)
	//Return HTML
	public static function view($currentRating, $maxRating, $maxWidth)
	{	
		if ($maxRating < 1)
			$maxRating = 1;
		
		$hue = (int)($currentRating / $maxRating * 128);
		

		$gradient = 'background:-webkit-gradient(linear,left top,left bottom,color-stop(0, #FFF),color-stop(0.5, hsl('.$hue.',100%,50%)),color-stop(1, #000));background:-moz-linear-gradient(center top,#FFF 0%,hsl('.$hue.',100%,50%) 50%,#000 100%)';
			
		$width = (int)($currentRating / $maxRating * $maxWidth) + 1;
		$html = '<div class="RatingBar" style="width:'.$width.'px;'.$gradient.'"></div>';
		
		return $html;
	}
}