//Conditional statement
function ConditionalStatement(condition, effectStatement)
{
	//(Condition) Condition tree
	this.condition = condition;
	
	//(Statement) Effect statements (will be affected to true when condition is true)
	this.effectStatement = effectStatement;
}

//Whether conditional statements are equal
ConditionalStatement.prototype.equals = function ConditionalStatement_equals(other)
{
	return this.effectStatement.equals(other.effectStatement) && this.condition.equals(other.condition);
}

//(String) get string representation of conditional statement
ConditionalStatement.prototype.toString = function ConditionalStatement_toString()
{
	return "if " + this.condition.toString() + " then " + this.effectStatement.toString();
}