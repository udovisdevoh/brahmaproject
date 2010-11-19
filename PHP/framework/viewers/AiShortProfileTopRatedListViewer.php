<?php
class AiShortProfileTopRatedListViewer
{
	//(String)
	//Return HTML from SQL Query output
	public static function view($aiUnitList)
	{
		$html = '<ul class="BotList">';
		
		foreach ($aiUnitList as $aiUnit)
		{
			$html .= '<li>';
			$html .= '<p><a href="./?ai='.$aiUnit['id'].'">'.$aiUnit['name'].'</a></p>';
			$html .= '<p>rating: '.$aiUnit['rating'].'</p>';
			$html .= '<p>owner: <a href="?user='.$aiUnit['user_profile_id'].'">'.$aiUnit['user_name'].'</a></p>';
			$html .= '</li>';
		}
		
		$html .= '</ul>';
		
		
		return $html;
	}
}
?>