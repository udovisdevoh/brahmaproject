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
	do
	{
		var oldStringCondition = stringCondition;
		stringCondition = this.removeParanthesesFromBeginingAndEndIfConsistencyIsKept(stringCondition);
	} while (stringCondition != oldStringCondition);

	var shallowestOperatorPosition = this.getShallowestOperatorPosition(stringCondition);
	var shallowestOperator = this.getShallowestOperator(stringCondition, shallowestOperatorPosition);
	
	var stringCondition1 = stringCondition.substr(0, shallowestOperatorPosition);
	var stringCondition2 = stringCondition.substr(shallowestOperatorPosition + shallowestOperator.length, stringCondition.length - 1);
	
	this.returnArray[0] = stringCondition1;
	this.returnArray[1] = shallowestOperator;
	this.returnArray[2] = stringCondition2;
	

	return this.returnArray;
}

//(String) Remove parantheses from begining and end if consistency is kept
BoolLogicSplitter.prototype.removeParanthesesFromBeginingAndEndIfConsistencyIsKept = function BoolLogicSplitter_removeParanthesesFromBeginingAndEndIfConsistencyIsKept(expression)
{
	expression = expression.trim();
	var oldExpression;
	do
	{
		oldExpression = expression;
		var newExpression = expression;
		if (expression.charAt(0) == '(' && expression.charAt(expression.length - 1) == ')')
		{
			newExpression = newExpression.substr(1, expression.length - 2);
			if (this.isParanthesesConsistant(newExpression))
			{
				expression = newExpression;
			}
		}
		
	} while (oldExpression != expression);
	return expression;
}

//(Boolean) Whether parantheses are consistant in expression
BoolLogicSplitter.prototype.isParanthesesConsistant = function BoolLogicSplitter_isParanthesesConsistant(expression)
{
	var depth = 0;
	for (var index in expression)
	{
		var character = expression.charAt(index);
	
		if (character == '(')
		{
			depth++;
		}
		else if (character == ')')
		{
			depth--;
		}
	}
	return depth == 0;
}

//(Integer) get the position of the shallowest operator (least in priority)
BoolLogicSplitter.prototype.getShallowestOperatorPosition = function BoolLogicSplitter_getShallowestOperatorPosition(expression)
{
	var shallowestDepth = -1;
	var shallowestOperatorPosition = -1;
	var shallowestOperatorIsAnd = false;
	var depth = 0;
	
	for (var index = 0; index < expression.length ; index++)
	{
		var character = expression.charAt(index);
		if (character == '(')
			depth++;
		else if (character == ')')
			depth--;
			
		if (isWord(index, expression, 'and'))
		{
			if (shallowestDepth == -1 || depth < shallowestDepth)
			{
				shallowestDepth = depth;
				shallowestOperatorPosition = index;
				shallowestOperatorIsAnd = true;
			}
		}
		else if (isWord(index, expression, 'or'))
		{
			if (shallowestDepth == -1 || depth <= shallowestDepth)
			{
				shallowestDepth = depth;
				shallowestOperatorPosition = index;
				shallowestOperatorIsAnd = false;
			}
		}
	}
	
	//(Boolean) whether there is a word matching word variable at index in expression
	function isWord(index, expression, word)
	{
		if (index > 0)
		{
			var currentWord = expression.substr(index - 1, word.length + 2);
			return currentWord == ' ' + word + ' ';
		}
		
		return false;
	}
	
	if (shallowestOperatorPosition == -1)
		throw "Couldn't find shallowest operator's position in \"" + expression + "\"";
	
	return shallowestOperatorPosition;
}

//(String) get the shallowest operator from its position
BoolLogicSplitter.prototype.getShallowestOperator = function BoolLogicSplitter_getShallowestOperator(expression, position)
{
	if (expression.substr(position, 2) == 'or')
		return 'or';
	else if (expression.substr(position, 3) == 'and')
		return 'and';
	else
		throw "Couldn't find shallowest operator in " + expression + " at index " + position
}