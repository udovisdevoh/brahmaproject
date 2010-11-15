<?php require_once("./framework/controllers/index.php"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<?php require_once("./framework/templates/headTags.php"); ?>

		<title>Collective Artificial Intelligence: Brahma Project</title>
	</head>
	<body>
		<?php require_once("./framework/templates/header.php"); ?>
		
		<?php
		if (isset($aiUnitList))
			require_once("./framework/templates/botList.php");
		else if (isset($aiUnit))
			require_once("./framework/templates/bot.php");
		?>
		
		<?php require_once("./framework/templates/footer.php"); ?>
		
	</body>
</html>