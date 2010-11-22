<?php require_once("./framework/controllers/deleteBot.php"); ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<?php require_once("./framework/templates/headTags.php"); ?>

		<title>Collective Artificial Intelligence: Brahma Project</title>
	</head>
	<body>
		<?php require_once("./framework/templates/header.php"); ?>
		
		<div style="clear:both"></div>
		
		<div class="Container">
			<p><a href="./account.php">&lt;&lt; Go back</a></p>
			
			<?php if (isset($success)): ?>
				<p class="Success"><?php echo $success ?></p>
			<?php elseif (isset($error)): ?>
				<p class="Error"><?php echo $error ?></p>
			<?php else: ?>
				<h2>Delete '<?php echo $aiUnitName ?>'?</h2>
				<form method="post" action="./deletebot.php?ai=<?php echo $aiUnitId ?>">
					<input type="submit" name="delete" value="Delete" />
					<a href="./account.php">Cancel</a>
				</form>
			<?php endif ?>
		</div>
		
		<?php require_once("./framework/templates/footer.php"); ?>
		
	</body>
</html>