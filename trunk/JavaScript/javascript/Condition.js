//Condition or condition tree
function Condition(statementOrLeftChild, middleOperator, rightChild)
{
	//Constants
	//(int)
	this.or = 0;
	
	//(int)
	this.and = 1;

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
	else if (statementOrLeftChild instanceof Condition && rightChild instanceof Condition)
	{
		this.leftChild = statementOrLeftChild;
		this.middleOperator = middleOperator;
		this.rightChild = rightChild;
	}
}

//(Boolean) Whether conditions are equal
Condition.prototype.equals = function Condition_equals(other)
{
	if (this.statement != null)
	{
		return this.statement.equals(other.statement);
	}
	return this.middleOperator == other.middleOperator && ((this.leftChild.equals(other.leftChild) && this.rightChild.equals(other.rightChild)) || (this.leftChild.equals(other.rightChild) && this.rightChild.equals(other.leftChild)));
}

//(String) get string representation of condition
Condition.prototype.toString = function Condition_toString()
{
	if (this.statement != null)
		return this.statement.toString();
	
	var stringRepresentation = "";
	
	if (this.leftChild != null)
		stringRepresentation += this.leftChild.toString();
		
	if (this.middleOperator == 0)
		stringRepresentation += ' or';
	else
		stringRepresentation += ' and';
		
	if (this.rightChild != null)
		stringRepresentation += ' ' + this.rightChild.toString();
	
	return stringRepresentation;
}