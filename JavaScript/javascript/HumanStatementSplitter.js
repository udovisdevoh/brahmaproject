//To split human statements chunks as string into an array of statement
function HumanStatementSplitter(instinct)
{
	this.instinct = instinct;
}

//String[]: list of statements
HumanStatementSplitter.prototype.split = function HumanStatementSplitter_split(statementChunkString)
{
	var statementList = Array();
	statementList.push(statementChunkString);
	return statementList;
}