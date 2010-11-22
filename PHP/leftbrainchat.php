<?php require_once("./framework/controllers/leftBrainChat.php"); ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<?php require_once("./framework/templates/headTags.php"); ?>

		<title>Collective Artificial Intelligence: Brahma Project</title>
		
		<link href="./css/leftbrain.css" rel="stylesheet" type="text/css" />
		
		<script type="text/javascript" src="./js/Main.js"></script>
		<script type="text/javascript" src="./js/Concept.js"></script>
		<script type="text/javascript" src="./js/VerbBranch.js"></script>
		<script type="text/javascript" src="./js/ConceptNameMapper.js"></script>
		<script type="text/javascript" src="./js/TautologyManager.js"></script>
		<script type="text/javascript" src="./js/Instinct.js"></script>
		<script type="text/javascript" src="./js/Statement.js"></script>
		<script type="text/javascript" src="./js/ComplementaryOperatorManager.js"></script>
		<script type="text/javascript" src="./js/MutuallyExclusiveOperatorManager.js"></script>
		<script type="text/javascript" src="./js/EvaluationCache.js"></script>
		<script type="text/javascript" src="./js/ProofCache.js"></script>
		<script type="text/javascript" src="./js/Flattenizer.js"></script>
		<script type="text/javascript" src="./js/Optimizer.js"></script>
		<script type="text/javascript" src="./js/Invalidator.js"></script>
		<script type="text/javascript" src="./js/ProofManager.js"></script>
		<script type="text/javascript" src="./js/ThinkerGeneralizationToParent.js"></script>
		<script type="text/javascript" src="./js/ThinkerGeneralizationToBrother.js"></script>
		<script type="text/javascript" src="./js/ThinkerFindParentOfEnemyBrother.js"></script>
		<script type="text/javascript" src="./js/ThinkerFindEnemyBrother.js"></script>
		<script type="text/javascript" src="./js/Thinker.js"></script>
		<script type="text/javascript" src="./js/Theory.js"></script>
		<script type="text/javascript" src="./js/WhatisViewer.js"></script>
		<script type="text/javascript" src="./js/DefineViewer.js"></script>
		<script type="text/javascript" src="./js/TeachViewer.js"></script>
		<script type="text/javascript" src="./js/ObjectionFinder.js"></script>
		<script type="text/javascript" src="./js/FirstSecondPersonManager.js"></script>
		<script type="text/javascript" src="./js/HumanStatementSplitter.js"></script>
		<script type="text/javascript" src="./js/HumanStatementColorizer.js"></script>
		<script type="text/javascript" src="./js/AskViewer.js"></script>
		<script type="text/javascript" src="./js/History.js"></script>
		<script type="text/javascript" src="./js/AutoComplete.js"></script>
		<script type="text/javascript" src="./js/ConversationManager.js"></script>
		<script type="text/javascript" src="./js/TalkingRouter.js"></script>
	</head>
	<body onresize="resizeTextFields()">
		<?php /*require_once("./framework/templates/header.php");*/ ?>
		
		<div style="clear:both"></div>
		
		<form method="post" onsubmit='sendMessage(talkingRouter);return false;'>
			<div style="overflow:scroll;height:460px" id="conversation"></div>
			<div>
				<input style="width:88%" type="text" id="humanStatementField" autocomplete="off" />
				<button style="width:8%" onclick='sendMessage(talkingRouter);return false;'>Talk</button>
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
			
			var humanName = "human_dude";
			var aiName = "ai_dude";
			var talkingRouter = new TalkingRouter(humanName, aiName);
			var inputField = document.getElementById('humanStatementField');
			var autoCompleteDom = document.getElementById('autoComplete');
			var conversationDom = document.getElementById('conversation');
			inputField.focus();
			inputField.onkeyup = keyUpHandling;
			document.onkeydown = keyDownHandling;		
			resizeTextFields();
			
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
			
			//Handles key up events
			function keyUpHandling(e)
			{
				var unicode = getKeyCode(e);
				var key = String.fromCharCode(unicode);

				var rememberedStatement;
				
				if (unicode != 38 && unicode != 40 && unicode != 27 && unicode != 13)
				{
					var lastWordStub = talkingRouter.autoComplete.getLastWordStub(inputField.value);
					if (lastWordStub != null/* && lastWordStub.length > 1*/)
					{
						var wordList = talkingRouter.autoComplete.getWordList(lastWordStub);
						if (wordList == null)
						{
							autoCompleteDom.style.visibility = 'hidden';
							talkingRouter.autoComplete.isVisible = false;
						}
						else
						{
							talkingRouter.autoComplete.isVisible = true;
							autoCompleteDom.style.visibility = 'visible';
							autoCompleteDom.innerHTML = '';
							for (var wordIndex = 0; wordIndex < wordList.length; wordIndex++)
								talkingRouter.autoComplete.addViewElement(autoCompleteDom, wordIndex, wordList[wordIndex], wordIndex == talkingRouter.autoComplete.currentPosition);
						}
					}
					else
					{
						talkingRouter.autoComplete.isVisible = false;
						autoCompleteDom.style.visibility = 'hidden';
					}
				}
			}
			
			//Handles key down events
			function keyDownHandling(e)
			{
				var unicode = getKeyCode(e);
				var key = String.fromCharCode(unicode);

				var rememberedStatement;
				
				if (unicode == 38) //up
				{			
					if (talkingRouter.autoComplete.isVisible)
					{
						talkingRouter.autoComplete.moveUp(autoCompleteDom);
					}
					else
					{
						rememberedStatement = talkingRouter.history.getStatement();
						if (rememberedStatement != null)
						{
							inputField.value = rememberedStatement;
							talkingRouter.history.moveUp();
						}
					}
					return false;
				}
				else if (unicode == 40) //down
				{
					if (talkingRouter.autoComplete.isVisible)
					{
						talkingRouter.autoComplete.moveDown(autoCompleteDom);
					}
					else
					{
						rememberedStatement = talkingRouter.history.getStatement();
						if (rememberedStatement != null)
						{
							inputField.value = rememberedStatement;
							talkingRouter.history.moveDown();
						}
					}
					return false;
				}
				else if (unicode == 27) //esc
				{
					if (talkingRouter.autoComplete.isVisible)
					{
						inputField.focus();
						talkingRouter.autoComplete.isVisible = false;
						autoCompleteDom.style.visibility = 'hidden';
						return false;
					}
				}
				else if (unicode == 13 || unicode == 32) //enter or space
				{
					if (talkingRouter.autoComplete.isVisible)
					{
						inputField.focus();
						talkingRouter.autoComplete.isVisible = false;
						autoCompleteDom.style.visibility = 'hidden';
						inputField.value = talkingRouter.autoComplete.replaceLastWordWithSelectedWord(inputField.value);
						
						if (unicode == 32)//space
							inputField.value += ' ';

						if (unicode == 13 && talkingRouter.autoComplete.isCompleteStatement(inputField.value))//enter
							return true;//don't cancel enter button, send message to ai
							
						return false; //cancel enter button
					}
				}
			}
			
			function autoCompleteClick(elementId)
			{
				if (talkingRouter.autoComplete.isVisible)
				{
					talkingRouter.autoComplete.moveTo(autoCompleteDom, elementId);
				}
			}
			
			function autoCompleteDoubleClick()
			{
				if (talkingRouter.autoComplete.isVisible)
				{
					inputField.focus();
					talkingRouter.autoComplete.isVisible = false;
					autoCompleteDom.style.visibility = 'hidden';
					inputField.value = talkingRouter.autoComplete.replaceLastWordWithSelectedWord(inputField.value);
					
					return false;
				}
			}
			
			-->
		</script>
		
		<?php require_once("./framework/templates/footer.php"); ?>
		
	</body>
</html>