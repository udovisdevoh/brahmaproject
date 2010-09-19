//Condition or condition tree
function Condition(statementOrLeftChild, middleOperator, rightChild)
{
	//Constants
	//(int)
	var or = 0;
	
	//(int)
	var and = 1;

	//Parts
	//(Condition)
	this.leftChild;
	
	//(Bool)
	this.middleOperator;
	
	//(Condition)
	this.rightChild;
	
	//(Statement)
	this.statement;
	
	if (statementOrLeftChild instanceof Statement)
	{
		this.statement = statementOrLeftChild;
	}
	else if (statementOrLeftChild instanceof Condition && middleOperator instanceof int && rightChild instanceof Condition)
	{
		this.leftChild = statementOrLeftChild;
		this.middleOperator = middleOperator;
		this.rightChild = rightChild;
	}
}