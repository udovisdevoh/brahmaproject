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
			$html .= ' <span>&laquo; Previous</span> ';
		else
			$html .= ' <a href="'.$urlStub.($offset - $countPerPage).'">&laquo; Previous</a> ';
		
		
		for ($currentOffset = 0; $currentOffset < $totalCount; $currentOffset+= $countPerPage)
		{
			if ($currentOffset == $offset)
				$html .= ' <span class="Selected">'.$pageIndex.'</span> ';
			else
				$html .= ' <a href="'.$urlStub.$currentOffset.'">'.$pageIndex.'</a> ';
			
			
			$pageIndex++;
		}
		
		
		if ($offset + $countPerPage >= $totalCount)
			$html .= ' <span>Next &raquo;</span> ';
		else
			$html .= ' <a href="'.$urlStub.($offset + $countPerPage).'">Next &raquo;</a> ';
		
		$html .= '</div>';
		
		return $html;
	}
}
?>