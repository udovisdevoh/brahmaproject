//Manages complementary operators
function ComplementaryOperatorManager(conceptNameMapper)
{
	//(ConceptNameMapper)
	this.conceptNameMapper = conceptNameMapper;
}

//Add complementary operator relation
ComplementaryOperatorManager.prototype.add = function ComplementaryOperatorManager_add(operatorName1, operatorName2)
{
	var operator1 = this.conceptNameMapper.getConcept(operatorName1);
	operator1.isNaturalOperator = true;
	var operator2 = this.conceptNameMapper.getConcept(operatorName2);
	operator2.isNaturalOperator = false;
	
	var index;
	
	index = operator1.complementaryOperators.indexOf(operator2);
	if (index == -1)
		operator1.complementaryOperators.push(operator2);
	
	index = operator2.complementaryOperators.indexOf(operator1);
	if (index == -1)
		operator2.complementaryOperators.push(operator1);
}

//Remove complementary operator relation
ComplementaryOperatorManager.prototype.remove = function ComplementaryOperatorManager_remove(operatorName1, operatorName2)
{
	var operator1 = this.conceptNameMapper.getConcept(operatorName1);
	var operator2 = this.conceptNameMapper.getConcept(operatorName2);
	
	var index;

	do
	{
		index = operator1.complementaryOperators.indexOf(operator2);
		if (index != -1)
		{
			operator1.complementaryOperators.splice(index, 1);
		}
	} while (index != -1);
	
	do
	{
		index = operator2.complementaryOperators.indexOf(operator1);
		if (index != -1)
		{
			operator2.complementaryOperators.splice(index, 1);
		}
	} while (index != -1);
}

//Test whether complementary operator relation exist
ComplementaryOperatorManager.prototype.test = function ComplementaryOperatorManager_test(operatorName1, operatorName2)
{
	var operator1 = this.conceptNameMapper.getConcept(operatorName1);
	var operator2 = this.conceptNameMapper.getConcept(operatorName2);
	
	return operator1.complementaryOperators.indexOf(operator2) != -1;
}