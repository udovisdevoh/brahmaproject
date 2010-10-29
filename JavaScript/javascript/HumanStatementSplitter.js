//To split human statements chunks as string into an array of statement
function HumanStatementSplitter(instinct, conceptNameMapper)
{
	//Parts
	this.instinct = instinct;
	this.conceptNameMapper = conceptNameMapper;
}

//String[]: list of statements
HumanStatementSplitter.prototype.split = function HumanStatementSplitter_split(statementChunkString)
{
	var statementList = Array();
	
	if (!this.isSplittable(statementChunkString))
	{
		statementList.push(statementChunkString);
		return statementList;
	}

	while (statementChunkString.indexOf(',') != -1)
		statementChunkString = statementChunkString.replace(',',' ');
	
	while (statementChunkString.indexOf(' and ') != -1)
		statementChunkString = statementChunkString.replace(' and ',' ');
		
	statementChunkString = statementChunkString.hardTrim();
	
	
	//If the chunk contains a "which"
	var positionOfKeyWordWhich = statementChunkString.indexOf(' which ');
	if (positionOfKeyWordWhich != -1)
	{
		var leftChild = statementChunkString.substr(0, positionOfKeyWordWhich);
		var rightChild = statementChunkString.substr(positionOfKeyWordWhich+7);
		rightChild = this.getLastWord(leftChild) + ' ' + rightChild;
		
		return statementList.concat(this.split(leftChild), this.split(rightChild));
	}
	else
	{
		var wordList = statementChunkString.split(' ');
		var isConcept;
		var isOperator;
		
		var latestSubject = null;
		var latestVerb = null;
		var isFoundNot = false;
		
		for (var index = 0; index < wordList.length; index++)
		{
			var word = wordList[index];
			isOperator = this.instinct.verbNameList.indexOf(word) != -1;
			isConcept = !isOperator && word != 'not';

			if (isConcept && index == 0)
			{
				latestSubject = word;
			}
			else if (isOperator)
			{
				latestVerb = word;
				isFoundNot = false;
			}
			else if (isConcept && !isFoundNot && latestSubject != null && latestVerb != null)
			{
				statementList.push(latestSubject + ' ' + latestVerb + ' ' + word);
			}
			else if (word == 'not')
			{
				isFoundNot = true;
			}
		}
	}
	
	return statementList;
}

//(String) last word
HumanStatementSplitter.prototype.getLastWord = function HumanStatementSplitter_getLastWord(statementString)
{
	statementString = statementString.hardTrim();
	var lastSpacePosition = statementString.lastIndexOf(' ');
	var lastWord = statementString.substr(lastSpacePosition + 1);
	return lastWord;
}

//(Bool) whether the statement is splittable
HumanStatementSplitter.prototype.isSplittable = function HumanStatementSplitter_isSplittable(statementChunkString)
{
	statementChunkString = ' ' + statementChunkString + ' ';
	
	while (statementChunkString.indexOf(' not ') != -1)
		statementChunkString = statementChunkString.replace(' not ',' ');
	while (statementChunkString.indexOf(' why ') != -1)
		statementChunkString = statementChunkString.replace(' why ',' ');
	while (statementChunkString.indexOf(' whatis ') != -1)
		statementChunkString = statementChunkString.replace(' whatis ',' ');
	while (statementChunkString.indexOf(' how ') != -1)
		statementChunkString = statementChunkString.replace(' how ',' ');
	while (statementChunkString.indexOf(' and ') != -1)
		statementChunkString = statementChunkString.replace(' and ',' ');
	while (statementChunkString.indexOf(',') != -1)
		statementChunkString = statementChunkString.replace(',',' ');
	
	statementChunkString = statementChunkString.hardTrim();
	
	var wordList = statementChunkString.split(' ');
	
	return wordList.length >= 4 && this.instinct.verbNameList.indexOf(wordList[1]) != -1;
}