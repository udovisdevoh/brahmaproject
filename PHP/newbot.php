<?php require_once("./framework/controllers/newBot.php"); ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<?php require_once("./framework/templates/headTags.php"); ?>

		<title>Collective Artificial Intelligence: Brahma Project</title>
		
		<script type="text/javascript" src="./js/NameGenerator.js"></script>
		<script type="text/javascript">
			<!--
			var randomNameGenerator = new RandomNameGenerator();
			/*var nameField = document.getElementById('name');
			nameField.value = randomNameGenerator.generateRandomName(Math.floor(Math.random() * 7) + 4);*/
			-->
		</script>
	</head>
	<body>
		<?php require_once("./framework/templates/header.php"); ?>
		
		<div style="clear:both"></div>
		
		<div class="Container">
			<h2>New left brain bot</h2>
			<form method="post" action="./newbot.php">
				<fieldset>
					<label for="name">Name:</label>
					<input type="text" name="name" id="name" maxlength="128" style="width:250px" />
					<a onClick="document.getElementById('name').value = randomNameGenerator.generateRandomName(Math.floor(Math.random() * 7) + 4);">regenerate name</a>
				</fieldset>
				
				<p>
					<input type="submit" name="newBot" id="newBot" value="Create (save)" />
				</p>
			</form>
			
			<?php if (isset($error)): ?>
				<p class="Error"><?php echo $error ?></p>
			<?php endif	?>
		</div>
		
		<?php require_once("./framework/templates/footer.php"); ?>
		
		<script type="text/javascript">
			<!--
			document.getElementById('name').value = randomNameGenerator.generateRandomName(Math.floor(Math.random() * 7) + 4);
			-->
		</script>
		
	</body>
</html>