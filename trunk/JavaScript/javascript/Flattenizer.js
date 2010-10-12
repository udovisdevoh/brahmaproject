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
	var implicitBranch = subject.getImplicitBranch(verb);
	
	if (!implicitBranch.isFlat)
		if (!this.circularEvaluationPreventionCache.getCachedResult(subject, verb))
			this.flattenBranch(implicitBranch, subject, verb);
	
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

Flattenizer.prototype.flattenBranch = function Flattenizer_flattenBranch(implicitBranch, subject, verb)
{
	var totologicBranch = subject.getTotologicBranch(verb);
	this.circularEvaluationPreventionCache.setCachedResult(subject, verb, true);
	this.copyFromTotologicBranch(totologicBranch, implicitBranch);
	
	//Render stuff like: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
	if (verb == this.instinct.madeof)
		this.renderSelfRecursiveOperator(subject, verb, implicitBranch);
		
	
	//Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
	//todo
	
	//Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [pine] [madeof] [matter]
	//todo
	
	implicitBranch.isFlat = true;
	this.circularEvaluationPreventionCache.setCachedResult(subject, verb, false);
}

//Constant as: Evaluator.resultTrue, Evaluator.resultFalse,
//Render stuff like: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
Flattenizer.prototype.renderSelfRecursiveOperator = function Flattenizer_renderSelfRecursiveOperator(subjectToTest, selfRecursiveVerb, implicitBranch)
{
	for (var index1 in implicitBranch.complementList)
	{
		var immediateComplement = implicitBranch.complementList[index1];
		if (immediateComplement instanceof Concept)
		{
			var remoteImplicitBranch = immediateComplement.getImplicitBranch(selfRecursiveVerb);
			
			if (!remoteImplicitBranch.isFlat)
				if (!this.circularEvaluationPreventionCache.getCachedResult(immediateComplement, selfRecursiveVerb))
					this.flattenBranch(remoteImplicitBranch, immediateComplement, selfRecursiveVerb);
			
			for (var index2 in remoteImplicitBranch.complementList)
			{
				var remoteComplement = remoteImplicitBranch.complementList[index1];
				
				this.proofCache.addProofArgument(subjectToTest, selfRecursiveVerb, remoteComplement, subjectToTest, selfRecursiveVerb, immediateComplement, true);
				this.proofCache.addProofArgument(subjectToTest, selfRecursiveVerb, remoteComplement, immediateComplement, selfRecursiveVerb, remoteComplement, true);
				implicitBranch.addComplement(remoteComplement);
			}
		}
	}
}