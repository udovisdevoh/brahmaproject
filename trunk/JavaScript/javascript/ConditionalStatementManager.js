//Manages conditional statements
function ConditionalStatementManager(conceptNameMapper, conditionalStatementMemory)
{	
	//(ConditionalStatementParser) Parses conditional statements (from string to conditional statement objects)
	this.conditionalStatementParser = new ConditionalStatementParser(conceptNameMapper);
	
	//(ConditionalStatementMemory) Stores and retrieves conditional statement
	this.conditionalStatementMemory = conditionalStatementMemory;
}

//Learn conditional statement from string
ConditionalStatementManager.prototype.learnStatement = function ConditionalStatementManager_learnStatement(stringStatement)
{
	var conditionalStatement = this.conditionalStatementParser.parse(stringStatement);
	if (!this.conditionalStatementMemory.contains(conditionalStatement))
	{
		this.conditionalStatementMemory.push(conditionalStatement);
	}
}

//Learn conditional statement from string
ConditionalStatementManager.prototype.forgetStatement = function ConditionalStatementManager_forgetStatement(stringStatement)
{
	var conditionalStatement = this.conditionalStatementParser.parse(stringStatement);
	return this.conditionalStatementMemory.remove(conditionalStatement);
}

//Whether conditional statement exist in memory or not
ConditionalStatementManager.prototype.testStatement = function ConditionalStatementManager_testStatement(stringStatement)
{
	var conditionalStatement = this.conditionalStatementParser.parse(stringStatement);
	return this.conditionalStatementMemory.contains(conditionalStatement);
}