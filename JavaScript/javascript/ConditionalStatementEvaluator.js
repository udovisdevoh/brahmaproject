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
	throw 'Implement ConditionalStatementEvaluator.render()';
}