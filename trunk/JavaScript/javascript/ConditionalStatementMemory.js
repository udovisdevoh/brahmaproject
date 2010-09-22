//Stores and retrieves conditional statements
function ConditionalStatementMemory()
{
	//(Array) list of conditional statements
	this.conditionalStatementList = Array();
}

//Whether conditional statement exist in memory or not
ConditionalStatementMemory.prototype.contains = function ConditionalStatementMemory_contains(conditionalStatement)
{
	for (var index in this.conditionalStatementList)
	{
		var currentConditionalStatement = this.conditionalStatementList[index];
		if (conditionalStatement.equals(currentConditionalStatement))
		{
			return true;
		}
	}
	return false;
}

//Add conditional statement to memory
ConditionalStatementMemory.prototype.push = function ConditionalStatementMemory_add(conditionalStatement)
{
	if (conditionalStatement == null)
		throw 'Cannot add null conditional statement';
		
	this.conditionalStatementList.push(conditionalStatement);
}