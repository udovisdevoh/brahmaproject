//Stores result of evaluation of propositions to improve performances of evaluation
function EvaluationCache()
{
	//(Array)[subject][verb][complement]
	//of constant as: Evaluator.resultTrue, Evaluator.resultFalse,
	//Evaluator.resultUnknown
	this.cachedData = new Hash();
}

//Constant as: Evaluator.resultTrue, Evaluator.resultFalse,
//Evaluator.resultUnknown
EvaluationCache.prototype.getCachedResult = function EvaluationCache_getCachedResult(subject, verb, complement)
{
	if (!this.cachedData.hasItem(subject))
		this.cachedData.setItem(subject, new Hash());

	var subjectBranch = this.cachedData.getItem(subject);
	
	if (!subjectBranch.hasItem(verb))
		subjectBranch.setItem(verb, new Hash());
	
	var verbBranch = subjectBranch.getItem(verb);
	
	if (verbBranch.hasItem(complement))
		return verbBranch.getItem(complement);
	else
		return false;
}

//Void: set value in cache
EvaluationCache.prototype.setCachedResult = function EvaluationCache_setCachedResult(subject, verb, complement, resultToSet)
{
	if (!this.cachedData.hasItem(subject))
		this.cachedData.setItem(subject, new Hash());

	var subjectBranch = this.cachedData.getItem(subject);
	
	if (!subjectBranch.hasItem(verb))
		subjectBranch.setItem(verb, new Hash());
	
	var verbBranch = subjectBranch.getItem(verb);
	
	verbBranch.setItem(complement, resultToSet);
}