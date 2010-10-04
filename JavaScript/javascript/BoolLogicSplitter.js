//splits expression into smaller ones by taking "and" or "or" as the operator
//creates boolean logic binary trees
function BoolLogicSplitter()
{
	this.returnArray = Array();
}

//splits expression into smaller ones by taking "and" or "or" as the operator
//creates boolean logic binary trees
BoolLogicSplitter.prototype.split = function BoolLogicSplitter_split(stringCondition)
{
	stringCondition = this.removeParanthesesFromBeginingAndEndIfConsistencyIsKept(stringCondition);

	var shallowestOperatorPosition = this.getShallowestOperatorPosition(stringCondition);
	var shallowestOperator = this.getShallowestOperator(stringCondition, shallowestOperatorPosition);
	
	var stringCondition1 = stringCondition.substr(0, shallowestOperatorPosition);
	var stringCondition2 = stringCondition.substr(shallowestOperatorPosition + shallowestOperator.length, stringCondition.length - 1);
	
	this.returnArray[0] = stringCondition1;
	this.returnArray[1] = shallowestOperator;
	this.returnArray[2] = stringCondition2;
	

	return this.returnArray;
}