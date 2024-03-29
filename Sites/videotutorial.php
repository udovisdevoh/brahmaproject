<?php require_once("./framework/controllers/videoTutorial.php"); ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<?php require_once("./framework/templates/headTags.php"); ?>

		<title>Brahma Project: Video Tutorials</title>
	</head>
	<body>
		<?php require_once("./framework/templates/header.php"); ?>
		<div style="clear:both"></div>

		<div id="videotutorial" class="Container">		
			<h2>Video Tutorials</h2>
			
			<ul>
				<li>
					How to train your first "left brain" bot
				</li>
				<li>
					Advanced use of the "left brain" interface
				</li>
				<li>
					How to chat with Brahma
				</li>
			</ul>
			
			<div id="videoTutorial" class="Container">
				<object width="425" height="344">
					<param name="movie" value="http://www.youtube.com/v/GwQMnpUsj8I&hl=en&fs=1"></param>
					<param name="allowFullScreen" value="true"></param>
					<param name="allowscriptaccess" value="always"></param>
					<embed src=http://www.youtube.com/v/GwQMnpUsj8I&hl=en&fs=1 type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed>
				</object> 
			</div>
		</div>
		
		<?php require_once("./framework/templates/footer.php"); ?>
		
	</body>
</html>