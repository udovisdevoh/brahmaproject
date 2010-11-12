//Completes input
function AutoComplete(conceptNameMapper)
{
	//Parts
	this.conceptNameMapper = conceptNameMapper;
}

//(String) get stub of last word
//or NULL if can't get one for now
AutoComplete.prototype.getLastWordStub = function AutoComplete_getLastWordStub(statementString)
{
	statementString = ' ' + statementString;

	var lastSpacePosition = statementString.lastIndexOf(' ');
	if (lastSpacePosition != -1)
	{
		return statementString.substr(lastSpacePosition).trim();
	}
	else
	{
		return null;
	}
}

//(String[]) list of words starting with wordStub
AutoComplete.prototype.getWordList = function AutoComplete_getWordList(wordStub)
{
	var list = Array();
	
	for (var nameIndex = 0; nameIndex < this.conceptNameMapper.mapNameToConcept.keys.length; nameIndex++)
	{
		var name = this.conceptNameMapper.mapNameToConcept.keys[nameIndex];
		if (name.startsWith(wordStub))
			list.push(name);
	}

	list.sort();
	
	return list;
}