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
			var isLastWordPerfectlyMatched = talkingRouter.autoComplete.isLastWordPerfectlyMatched(inputField.value)
		
			inputField.focus();
			talkingRouter.autoComplete.isVisible = false;
			autoCompleteDom.style.visibility = 'hidden';
			inputField.value = talkingRouter.autoComplete.replaceLastWordWithSelectedWord(inputField.value);
			
			if (unicode == 32)//space
				inputField.value += ' ';

			if (unicode == 13 && (talkingRouter.autoComplete.isCompleteStatement(inputField.value) || isLastWordPerfectlyMatched))//enter
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