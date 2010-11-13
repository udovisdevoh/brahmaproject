//Completes input
function AutoComplete(conceptNameMapper)
{
	//Parts and fields
	this.conceptNameMapper = conceptNameMapper;
	this.currentPosition = 0;
	this.isVisible = false;
	this.selection = Array(); //List of words
	this.specialKeyWords = Array('whatis','what','not','and','define','which');
}

//(String) get stub of last word
//or NULL if can't get one for now
AutoComplete.prototype.getLastWordStub = function AutoComplete_getLastWordStub(statementString)
{
	statementString = ' ' + statementString;

	var lastSpacePosition = statementString.lastIndexOf(' ');
	
	var lastWord = statementString.substr(lastSpacePosition).trim();
	if (lastWord.length > 0)
		return lastWord;
	return null;
}

//(String[]) list of words starting with wordStub
//null if nothing matched
AutoComplete.prototype.getWordList = function AutoComplete_getWordList(wordStub)
{
	this.currentPosition = 0;
	
	var startPosition = this.getFirstWordPositionStartWith(wordStub, this.conceptNameMapper.allNames, 0, this.conceptNameMapper.allNames.length - 1);

	if (startPosition == -1)
		return null;
	
	this.selection = Array();
	
	for (var index = startPosition; index < this.conceptNameMapper.allNames.length; index++)
	{
		var name = this.conceptNameMapper.allNames[index];
		if (name.startsWith(wordStub))
		{
			this.selection.push(name);
		}
		else
		{
			break;
		}
	}
	
	return this.selection;
}

//(int) Position of first word starting with word stub
// (works with binary search)
// -1 if nothing found
AutoComplete.prototype.getFirstWordPositionStartWith = function AutoComplete_getFirstWordPositionStartWith(wordStub, wordList, startPosition, endPosition)
{
	if (startPosition == endPosition)
	{
		if (wordList[startPosition].startsWith(wordStub))
			return startPosition;
		else
			return -1;
	}
	else if (startPosition + 1 == endPosition)
	{
		if (wordList[startPosition].startsWith(wordStub))
			return startPosition;
		else if (wordList[endPosition].startsWith(wordStub))
			return endPosition;
		else
			return -1;
	}

	var pivot = Math.round((startPosition + endPosition) / 2);
	
	if (wordStub <= wordList[pivot].substr(0,wordStub.length))
		return this.getFirstWordPositionStartWith(wordStub, wordList, startPosition, pivot);
	else
		return this.getFirstWordPositionStartWith(wordStub, wordList, pivot + 1, endPosition);
}

//(Void) Move up in autocomplete
AutoComplete.prototype.moveUp = function AutoComplete_moveUp(autoCompleteDom)
{
	document.getElementById('autoCompleteWord_' + this.currentPosition).setAttribute("class","");
	document.getElementById('autoCompleteWord_' + this.currentPosition).setAttribute("className","");
	
	if (this.currentPosition > 0)
		this.currentPosition--;
	
	document.getElementById('autoCompleteWord_' + this.currentPosition).setAttribute("class","Selected");	
	document.getElementById('autoCompleteWord_' + this.currentPosition).setAttribute("className","Selected");
}

//(Void) Move down in autocomplete
AutoComplete.prototype.moveDown = function AutoComplete_moveDown(autoCompleteDom)
{
	document.getElementById('autoCompleteWord_' + this.currentPosition).setAttribute("class","");
	document.getElementById('autoCompleteWord_' + this.currentPosition).setAttribute("className","");

	if (this.currentPosition < this.selection.length -1)
		this.currentPosition++;
	
	document.getElementById('autoCompleteWord_' + this.currentPosition).setAttribute("class","Selected");	
	document.getElementById('autoCompleteWord_' + this.currentPosition).setAttribute("className","Selected");
}

//(String)
AutoComplete.prototype.replaceLastWordWithSelectedWord = function AutoComplete_replaceLastWordWithSelectedWord(textString)
{
	var lastSpacePosition = textString.lastIndexOf(' ');
	
	if (lastSpacePosition != -1)
	{
		textString = textString.substr(0, lastSpacePosition + 1);
		textString += this.selection[this.currentPosition];
	}
	else
	{
		textString = this.selection[this.currentPosition];
	}
	
	return textString;
}