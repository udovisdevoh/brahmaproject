//Completes input
function AutoComplete(conceptNameMapper)
{
	//Parts
	this.conceptNameMapper = conceptNameMapper;
	this.currentPosition = 0;
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
	
	var startPosition = this.getFirstWordPositionStartWith(wordStub, this.conceptNameMapper.mapNameToConcept.keys, 0, this.conceptNameMapper.mapNameToConcept.keys.length - 1);

	if (startPosition == -1)
		return null;
	
	var selection = Array();
	
	for (var index = startPosition; index < this.conceptNameMapper.mapNameToConcept.keys.length; index++)
	{
		var name = this.conceptNameMapper.mapNameToConcept.keys[index];
		if (name.startsWith(wordStub))
		{
			selection.push(name);
		}
		else
		{
			break;
		}
	}
	
	return selection;
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