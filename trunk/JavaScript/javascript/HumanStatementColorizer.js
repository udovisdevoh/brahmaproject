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
		
		if (this.instinct.verbNameList.indexOf(word) != -1)
		{
			word = '<span class="HumanOperator">' + word + '</span>';
		}
		else if (this.conceptNameMapper.mapNameToConcept.hasItem(word) || word == 'me' || word == 'you' || word == 'i')
		{
			word = '<span class="HumanConcept">' + word + '</span>';
		}
		
		colorizedStatementString += word + ' ';
	}
	
	colorizedStatementString = colorizedStatementString.trim();
	
	return colorizedStatementString;
}