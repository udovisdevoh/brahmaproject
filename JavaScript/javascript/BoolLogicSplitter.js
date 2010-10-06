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

/*
private string RemoveBracketsFromBeginingAndIfConsistencyIsKept(string expression)
{
	string oldExpression;
	do
	{
		oldExpression = expression;
		string newExpression = expression;
		foreach (BracketDefinition bracketDefinition in bracketPriorityList)
		{
			if (expression[0] == bracketDefinition.BeginMarkup && expression[expression.Length - 1] == bracketDefinition.EndMarkup)
			{
				newExpression = newExpression.Substring(1, expression.Length - 2);
				if (bracketStackConsistencyValidator.IsBracketConsistant(newExpression, bracketPriorityList))
				{
					expression = newExpression;
				}
			}
		}
	} while (oldExpression != expression);
	return expression;
}
*/