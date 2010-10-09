//(ConditionalStatementEvaluator) Evaluate implicit statements from conditional statements
function ConditionalStatementEvaluator(evaluator)
{
	//(Evaluator) parent evaluator
	this.evaluator = evaluator;
}

//Constant as: Evaluator.resultTrue, Evaluator.resultFalse,
//Evaluator.resultUnknown, Evaluator.resultNotInCache
ConditionalStatementEvaluator.prototype.render = function ConditionalStatementEvaluator_render(subject, verb, complement)
{
	var listConditionalStatementMatchingEffect = this.getListConditionalStatementMatchingEffect(subject, verb, complement);
	
	for (var index in listConditionalStatementMatchingEffect)
	{
		var conditionalStatementMatchingEffect = listConditionalStatementMatchingEffect[index];		
		if (conditionalStatementMatchingEffect.condition != null)
		{
			if (this.isSatisfied(conditionalStatementMatchingEffect.condition, subject, verb, complement))
			{
				if (conditionalStatementMatchingEffect.effectStatement.isPositive)
				{
					return this.evaluator.resultTrue;
				}
				else
				{
					return this.evaluator.resultFalse;
				}
			}
			else
			{
				this.proofCache.resetProof(subject, verb, complement);
			}
		}
	}
	
	return this.evaluator.resultNotInCache;
}

//(Array of ConditionalStatement)
//List of conditional statement for which the effect matches subject, verb, complement
ConditionalStatementEvaluator.prototype.getListConditionalStatementMatchingEffect = function ConditionalStatementEvaluator_getListConditionalStatementMatchingEffect(subject, verb, complement)
{
	var listConditionalStatementMatchingEffect = Array();
	for (var index in this.evaluator.conditionalStatementManager.conditionalStatementMemory.conditionalStatementList)
	{
		var conditionalStatement = this.evaluator.conditionalStatementManager.conditionalStatementMemory.conditionalStatementList[index];	
		
		if (conditionalStatement.effectStatement != null)
		{
			if (conditionalStatement.effectStatement.subject == subject && conditionalStatement.effectStatement.verb == verb && conditionalStatement.effectStatement.complement == complement)
			{
				listConditionalStatementMatchingEffect.push(conditionalStatement);
			}
		}
	}
	return listConditionalStatementMatchingEffect;
}

//(Boolean) Whether condition is satisfied
ConditionalStatementEvaluator.prototype.isSatisfied = function ConditionalStatementEvaluator_isSatisfied(condition, subject, verb, complement)
{
	var isSatisfied = false;
	
	if (condition.statement != null)
	{		
		if (this.evaluator.circularReasoningPreventionMemory.getCachedResult(condition.statement.subject, condition.statement.verb, condition.statement.complement, this.evaluator.resultNotInCache) != this.resultBeingCurrentlyEvaluated)
		{
			var result = this.evaluator.eval(condition.statement.subject, condition.statement.verb, condition.statement.complement);		
			result = result == this.evaluator.resultTrue;
			var isSatisfied = result == condition.statement.isPositive;
			
			if (isSatisfied)
			{
				this.evaluator.proofCache.addProofArgument(subject, verb, complement, condition.statement.subject, condition.statement.verb, condition.statement.complement, true);
			}
		}
	}
	else if (condition.middleOperator == condition.and)
	{
		isSatisfied = this.isSatisfied(condition.leftChild, statement) && this.isSatisfied(condition.rightChild, subject, verb, complement);
	}
	else if (condition.middleOperator == condition.or)
	{
		isSatisfied = this.isSatisfied(condition.leftChild, statement) || this.isSatisfied(condition.rightChild, subject, verb, complement);
	}
	
	return isSatisfied;
}