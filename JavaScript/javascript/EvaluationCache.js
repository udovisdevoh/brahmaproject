//Stores result of evaluation of propositions to improve performances of evaluation
function EvaluationCache()
{
	//(Array)[subject][verb][complement]
	//of constant as: Evaluator.resultTrue, Evaluator.resultFalse,
	//Evaluator.resultUnknown, Evaluator.resultNotInCache
	this.cachedData = Array();
}

EvaluationCache.prototype.getCachedResult = function EvaluationCache_getCachedResult(subject, verb, complement, defaultNullValue)
{
	if (this.cachedData[subject] == null)
		this.cachedData[subject] = Array();

	if (this.cachedData[subject][verb] == null)
		this.cachedData[subject][verb] = Array();
		
	if (this.cachedData[subject][verb][complement] == null)
	{
		return defaultNullValue;
	}
	else
	{
		return this.cachedData[subject][verb][complement];
	}
}

EvaluationCache.prototype.setCachedResult = function EvaluationCache_setCachedResult(subject, verb, complement, resultToSet)
{
	if (this.cachedData[subject] == null)
		this.cachedData[subject] = Array();

	if (this.cachedData[subject][verb] == null)
		this.cachedData[subject][verb] = Array();
		
	this.cachedData[subject][verb][complement] == result;
}