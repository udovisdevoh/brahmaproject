//To split human statements chunks as string into an array of statement
function HumanStatementSplitter(instinct, conceptNameMapper)
{
	this.instinct = instinct;
	this.conceptNameMapper = conceptNameMapper;
}

//String[]: list of statements
HumanStatementSplitter.prototype.split = function HumanStatementSplitter_split(statementChunkString)
{
	statementChunkString = statementChunkString.replace(',',' ');
	statementChunkString = statementChunkString.replace(' and ',' ');
	statementChunkString = statementChunkString.hardTrim();
	

	var statementList = Array();
	
	//If the chunk contains a "which"
	var positionOfKeyWordWhich = statementChunkString.indexOf(' which ');
	if (positionOfKeyWordWhich != -1)
	{
		var leftChild = statementChunkString.substr(0, positionOfKeyWordWhich);
		var rightChild = statementChunkString.substr(positionOfKeyWordWhich+7);
		rightChild = this.getLastWord(leftChild) + ' ' + rightChild;
		
		return statementList.concat(this.split(leftChild), this.split(rightChild));
	}

	
	statementList.push(statementChunkString);
	return statementList;
}

//(String) last word
HumanStatementSplitter.prototype.getLastWord = function HumanStatementSplitter_getLastWord(statementString)
{
	statementString = statementString.hardTrim();
	var lastSpacePosition = statementString.lastIndexOf(' ');
	var lastWord = statementString.substr(lastSpacePosition);
	return lastWord;
}