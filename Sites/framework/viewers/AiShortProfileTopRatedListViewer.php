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
			$html .= AiProfileViewer::viewShort($aiUnit, $bestUpRating, $worstDownRating);
		}
		
		$html .= '</ul>';
		
		$html .= '<div style="clear:both"></div>';
		
		$html .= $breadCrump;
		
		return $html;
	}
}
?>