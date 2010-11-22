<?php require_once("./framework/controllers/leftBrainChat.php"); ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<?php require_once("./framework/templates/headTags.php"); ?>

		<title>Collective Artificial Intelligence: Brahma Project</title>
		
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
	<body>
		<?php require_once("./framework/templates/header.php"); ?>
		
		<div style="clear:both"></div>
		
		<div class="Container">
			<?php echo $renderedView ?>
		</div>
		
		<?php require_once("./framework/templates/footer.php"); ?>
		
	</body>
</html>