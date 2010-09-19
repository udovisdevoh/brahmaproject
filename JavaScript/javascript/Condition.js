//Condition or condition tree
function Condition(statementOrLeftChild, middleOperator, rightChild)
{
	//Constants
	var or = 0;
	
	var and = 1;

	//Parts
	this.leftChild;
	
	this.middleOperator;
	
	this.rightChild;
	
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