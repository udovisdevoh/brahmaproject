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

//(Array of statement)
//Get proof for statement
Flattenizer.prototype.getProof = function Flattenizer_getProof(subject, verb, complement, isPositive)
{
	return this.proofCache.getProof(subject, verb, complement, isPositive);
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
	
		//Self recursive verbs
		//Render stuff like: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
		if (verb == this.instinct.madeof)
		{
			this.renderFromPreRecursiveOperator(subject, verb, verb, implicitBranch);
		}
		
		//Whathever the [operator] is, it must use ISA recursively to expand its connections
		//Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [tree] [madeof] [matter]
		this.renderFromPreRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
		
		//Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
		this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
		
		//Render stuff for complementary operators
		//todo
	} while (howManyComplement < implicitBranch.complementList.length);
	
	implicitBranch.isFlat = true;
	implicitBranch.isLocked = false;
}

//(Void) Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [tree] [madeof] [matter]
Flattenizer.prototype.renderFromPreRecursiveOperator = function Flattenizer_renderFromPreRecursiveOperator(subjectToRender, verbToRender, recursiveVerb, implicitBranch)
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

//(Void) Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
Flattenizer.prototype.renderFromPostRecursiveOperator = function Flattenizer_renderFromPostRecursiveOperator(subjectToRender, verbToRender, recursiveVerb, implicitBranch)
{
	var remoteRecursiveVerbBranch = subjectToRender.getImplicitBranch(recursiveVerb);
	
	if (!remoteRecursiveVerbBranch.isFlat)
		if (!remoteRecursiveVerbBranch.isLocked)
			this.flattenBranch(remoteRecursiveVerbBranch, subjectToRender, recursiveVerb);

	for (var index1 in remoteRecursiveVerbBranch.complementList)
	{
		var immediateComplement = remoteRecursiveVerbBranch.complementList[index1];
		if (immediateComplement instanceof Concept)
		{
			var remoteCurrentVerbBranch = immediateComplement.getImplicitBranch(verbToRender);
			
			if (!remoteCurrentVerbBranch.isFlat)
				if (!remoteCurrentVerbBranch.isLocked)
					this.flattenBranch(remoteCurrentVerbBranch, immediateComplement, verbToRender);
			
			for (var index2 in remoteCurrentVerbBranch.complementList)
			{
				var remoteComplement = remoteCurrentVerbBranch.complementList[index2];
				
				this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, subjectToRender, recursiveVerb, immediateComplement, true);
				this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, immediateComplement, verbToRender, remoteComplement, true);
				implicitBranch.addComplement(remoteComplement);
			}
		}
	}
}