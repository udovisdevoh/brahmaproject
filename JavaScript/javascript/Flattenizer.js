//Flattenizer
function Flattenizer(instinct)
{
	//(Instinct) instinct
	this.instinct = instinct;
	
	//(ConceptNameMapper) concept name mapper
	this.conceptNameMapper = instinct.conceptNameMapper;
	
	//(EvaluationCache) to prevent circular evaluation
	this.circularEvaluationPreventionCache = new EvaluationCache();
	
	//(ProofCache) Stores proof for statements
	this.proofCache = new ProofCache();
}

//(Bool) whether connection exist as an implicit connection
Flattenizer.prototype.testConnection = function Flattenizer_testConnection(subject, verb, complement)
{
	this.circularEvaluationPreventionCache.setCachedResult(subject, verb, complement, true);
	
	var totologicBranch = subject.getTotologicBranch(verb);
	var implicitBranch = subject.getImplicitBranch(verb);
	
	if (!implicitBranch.isFlat)
	{
		this.copyFromTotologicBranch(totologicBranch, implicitBranch);
		this.flattenBranch(subject, implicitBranch);
		implicitBranch.isFlat = true;
	}
	
	this.circularEvaluationPreventionCache.setCachedResult(subject, verb, complement, false);
	
	return implicitBranch.hasComplement(complement);
}

Flattenizer.prototype.copyFromTotologicBranch = function Flattenizer_copyFromTotologicBranch(totologicBranch, implicitBranch)
{
	for (var index in totologicBranch.complementList)
	{
		var complement = totologicBranch.complementList[index];
		if (complement instanceof Concept)
		{
			implicitBranch.addComplement(complement);
		}
	}
}

//(Void) Flatten implicit branch
Flattenizer.prototype.flattenBranch = function Flattenizer_flattenBranch(subject, implicitBranch)
{
	throw 'Implement Flattenizer.flattenBranch()';	
}