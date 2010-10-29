//Colorize syntax of human statement
function HumanStatementColorizer(instinct, conceptNameMapper)
{
	this.instinct = instinct;
	this.conceptNameMapper = conceptNameMapper;
}

//(String (HTML)) colorized string
HumanStatementColorizer.prototype.colorize = function HumanStatementColorizer_colorize(statementString)
{
	var colorizedStatementString = "";
	
	statementString = statementString.hardTrim();
	
	var wordList = statementString.split(' ');
	
	for (var index = 0; index < wordList.length; index++)
	{
		var word = wordList[index];
		var isVerb = false;
		
		for (var verbIndex = 0; verbIndex < this.instinct.verbList.length; verbIndex++)
		{
			var verb = this.instinct.verbList[verbIndex];
			if (verb.toString() == word)
			{
				isVerb = true;
				break;
			}
		}
		
		if (isVerb)
		{
			word = '<span class="HumanOperator">' + word + '</span>';
		}
		else if (this.conceptNameMapper.mapNameToConcept.hasItem(word))
		{
			word = '<span class="HumanConcept">' + word + '</span>';
		}
		
		colorizedStatementString += word + ' ';
	}
	
	colorizedStatementString = colorizedStatementString.trim();
	
	return colorizedStatementString;
}