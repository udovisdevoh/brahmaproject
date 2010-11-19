<?php
class AiProfileViewer
{
	//(String)
	//Return HTML from SQL Query output
	public static function view($aiUnit)
	{
		$html = '';
	
		$html .= '<div style="clear:both"></div>';
		
		$html .= '<div class="AiProfile">';
		
		$name = $aiUnit['name'];		
		$userName = $aiUnit['user_name'];
	

		$html .= '<h2>'.$name.'</h2>';
		
		$html .= '<p><a class="ChatWith" href="./leftBrainChat.php?id='.$aiUnit['id'].'"><img src="./images/chatwith.png" alt="Chat with '.$name.'" />Chat with <strong>\''.$name.'\'</strong></a></p>';
		
		$html .= '<p>rating: '.$aiUnit['rating'].'</p>';
		$html .= '<p>owner: <a href="?user='.$aiUnit['user_profile_id'].'">'.$userName.'</a></p>';		
		$html .= '</div>';

		
		return $html;
	}
}
?>