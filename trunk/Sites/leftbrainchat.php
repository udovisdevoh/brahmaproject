<?php require_once("./framework/controllers/leftBrainChat.php"); ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<?php require_once("./framework/templates/headTags.php"); ?>
		<?php require_once("./framework/templates/leftBrainHeadTags.php"); ?>
		<title>Collective Artificial Intelligence: Brahma Project</title>
	</head>
	<body onresize="resizeTextFields()">
		<?php /*require_once("./framework/templates/header.php");*/ ?>
		
		<div style="clear:both"></div>
		
		<form method="post" onsubmit='sendMessage(talkingRouter);return false;'>
			<div style="overflow:scroll;height:460px" id="conversation"></div>
			<div>
				<input style="width:78%" type="text" id="humanStatementField" autocomplete="off" />
				<button style="width:15%" onclick='sendMessage(talkingRouter);return false;'>Talk</button>
				<div id="autoComplete"></div>
			</div>
		</form>
		
		<script type="text/javascript">
			<!--
			function resizeTextFields()
			{
				if (is_ie)
					conversationDom.style.height = Math.max(0, document.documentElement.clientHeight - 226) + 'px';
				else
					conversationDom.style.height = Math.max(0, self.innerHeight - 235) + 'px';
			}
			
			//Send message to Ai
			function sendMessage(talkingRouter)
			{
				var humanStatementField = document.getElementById('humanStatementField');
				var humanStatement = humanStatementField.value;
				
				var inputAndOutput = talkingRouter.talkTo(humanStatement);
				
				conversationDom.innerHTML += '<div class="HumanBlock">' + humanName + ": " + inputAndOutput['input'] + '</div>';
				conversationDom.innerHTML += '<div class="AiBlock">' + aiName + ": " + inputAndOutput['output'] + '</div>';
				
				conversationDom.scrollTop = conversationDom.scrollHeight;
				humanStatementField.value = "";
				return false;
			}
			
			var humanName = "<?php echo strtolower($userProfile['name'])?>";
			var aiName = "<?php echo strtolower($aiUnit['name'])?>";
			var talkingRouter = new TalkingRouter(humanName, aiName);
			var inputField = document.getElementById('humanStatementField');
			var autoCompleteDom = document.getElementById('autoComplete');
			var conversationDom = document.getElementById('conversation');
			inputField.focus();
			inputField.onkeyup = keyUpHandling;
			document.onkeydown = keyDownHandling;		
			resizeTextFields();
			-->
		</script>
		
		<?php require_once("./framework/templates/footer.php"); ?>
		
	</body>
</html>