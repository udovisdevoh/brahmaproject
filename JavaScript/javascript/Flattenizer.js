//Flattenizer
function Flattenizer(instinct)
{
	//(Instinct) instinct
	this.instinct = instinct;
	
	//(ConceptNameMapper) concept name mapper
	this.conceptNameMapper = instinct.conceptNameMapper;
	
	//(ProofCache) Stores proof for statements
	this.proofCache = new ProofCache();
}

//(Bool) whether connection exist as an implicit connection
Flattenizer.prototype.testConnection = function Flattenizer_testConnection(subject, verb, complement)
{
	var implicitBranch = subject.getImplicitBranch(verb);
	
	if (!implicitBranch.isFlat)
		if (!implicitBranch.isLocked)
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
	
	implicitBranch.isLocked = true;
	
	this.copyFromTotologicBranch(totologicBranch, implicitBranch);
	
	var howManyComplement;
	
	do
	{
		howManyComplement = implicitBranch.complementList.length;
	
		//Render stuff like: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
		if (verb == this.instinct.madeof)
		{
			this.renderFromRecursiveOperator(subject, verb, verb, implicitBranch);
		}
		
		//Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [tree] [madeof] [matter]
		this.renderFromRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
		
		//Whathever the [operator] is, it must use ISA recursively to expand its connections
		//Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
		
		//Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [pine] [madeof] [matter]
		//todo
	} while (howManyComplement < implicitBranch.complementList.length);
	
	implicitBranch.isFlat = true;
	implicitBranch.isLocked = false;
}

//(Void) Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
Flattenizer.prototype.renderFromRecursiveOperator = function Flattenizer_renderSelfRecursiveOperator(subjectToRender, verbToRender, recursiveVerb, implicitBranch)
{
	for (var index1 in implicitBranch.complementList)
	{
		var immediateComplement = implicitBranch.complementList[index1];
		if (immediateComplement instanceof Concept)
		{
			var remoteImplicitBranch = immediateComplement.getImplicitBranch(recursiveVerb);
			
			if (!remoteImplicitBranch.isFlat)
				if (!remoteImplicitBranch.isLocked)
					this.flattenBranch(remoteImplicitBranch, immediateComplement, recursiveVerb);
			
			for (var index2 in remoteImplicitBranch.complementList)
			{
				var remoteComplement = remoteImplicitBranch.complementList[index2];
				
				this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, subjectToRender, verbToRender, immediateComplement, true);
				this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, immediateComplement, recursiveVerb, remoteComplement, true);
				implicitBranch.addComplement(remoteComplement);
			}
		}
	}
}

//(Array of statement)
//Get proof for statement
Flattenizer.prototype.getProof = function Flattenizer_getProof(subject, verb, complement, isPositive)
{
	return this.proofCache.getProof(subject, verb, complement, isPositive);
}