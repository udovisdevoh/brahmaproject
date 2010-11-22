//Manages mutually exclusive operators like isa and contradict
function MutuallyExclusiveOperatorManager(conceptNameMapper)
{
	this.conceptNameMapper = conceptNameMapper;
}

//(void) Set two operators so they are mutually exclusive
MutuallyExclusiveOperatorManager.prototype.add = function MutuallyExclusiveOperatorManager_add(operatorName1, operatorName2)
{
	var operator1 = this.conceptNameMapper.getConcept(operatorName1);
	operator1.isNaturalOperator = true;
	var operator2 = this.conceptNameMapper.getConcept(operatorName2);
	operator1.isNaturalOperator = false;
	
	var index;
	
	index = operator1.mutuallyExclusiveOperators.indexOf(operator2);
	if (index == -1)
		operator1.mutuallyExclusiveOperators.push(operator2);
	
	index = operator2.mutuallyExclusiveOperators.indexOf(operator1);
	if (index == -1)
		operator2.mutuallyExclusiveOperators.push(operator1);
}