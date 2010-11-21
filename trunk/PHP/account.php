<?php require_once("./framework/controllers/account.php"); ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<?php require_once("./framework/templates/headTags.php"); ?>

		<title>Brahma Project: My account</title>
	</head>
	<body>
		<?php require_once("./framework/templates/header.php"); ?>
		<div style="clear:both"></div>

		<div class="Container">		
			<?php echo $renderedView ?>
		</div>
		
		<?php require_once("./framework/templates/footer.php"); ?>
		
	</body>
</html>