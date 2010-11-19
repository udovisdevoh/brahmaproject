<?php
//Some kind of page selector
class BreadCrumpViewer
{
	//(String)
	//Return HTML from SQL Query output
	public static function view($urlStub, $offset, $countPerPage, $totalCount)
	{
		$html = '';
		
		$html .= '<div class="BreadCrump">';
		
		$pageIndex = 0;
		
		if ($offset == 0)
			$html .= ' &lt; ';
		else
			$html .= ' <a href="'.$urlStub.($offset - $countPerPage).'">&lt;</a> ';
		
		
		for ($currentOffset = 0; $currentOffset < $totalCount; $currentOffset+= $countPerPage)
		{
			if ($currentOffset == $offset)
				$html .= ' '.$pageIndex.' ';
			else
				$html .= ' <a href="'.$urlStub.$currentOffset.'">'.$pageIndex.'</a> ';
			
			
			$pageIndex++;
		}
		
		
		if ($offset + $countPerPage >= $totalCount)
			$html .= ' &gt; ';
		else
			$html .= ' <a href="'.$urlStub.($offset + $countPerPage).'">&gt;</a> ';
		
		$html .= '</div>';
		
		return $html;
	}
}
?>