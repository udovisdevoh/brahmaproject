<?php require_once("./framework/controllers/index.php"); ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<?php require_once("./framework/templates/headTags.php"); ?>

		<title>Collective Artificial Intelligence: Brahma Project</title>
	</head>
	<body>
		<?php require_once("./framework/templates/header.php"); ?>
		
		<div class="Container">
			<?php
			if (isset($aiUnitList))
				require_once("./framework/templates/botList.php");
			else if (isset($aiUnit))
				require_once("./framework/templates/bot.php");
			?>
		</div>
		
		<?php require_once("./framework/templates/footer.php"); ?>
		
	</body>
</html>