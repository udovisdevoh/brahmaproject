//Stores and retrieves conditional statements
function ConditionalStatementMemory()
{
	//(Array) list of conditional statements
	this.conditionalStatementList = Array();
}

//Whether conditional statement exist in memory or not
ConditionalStatementMemory.prototype.contains = function ConditionalStatementMemory_contains(conditionalStatement)
{
	for (var index in conditionalStatementList)
	{
		var currentConditionalStatement = conditionalStatementList[index];
		if (conditionalStatement.equals(currentConditionalStatement))
		{
			return true;
		}
	}
	return false;
}