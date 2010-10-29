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
	statementList.push(statementChunkString);
	return statementList;
}