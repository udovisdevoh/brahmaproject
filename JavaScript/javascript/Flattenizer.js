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
		// or if [wood] [partof] [tree] and [water] [partof] [wood] then [water] [partof] [tree]
		if (verb == this.instinct.madeof || verb == this.instinct.partof)
		{
			this.renderFromPreRecursiveOperator(subject, verb, verb, implicitBranch);
		}
		
		//For some operators (like madeof) the [operator] is, it must use ISA recursively to expand its connections
		if (verb == this.instinct.isa || verb == this.instinct.madeof)
		{
			//Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [tree] [madeof] [matter]
			//BUT NOT: if [tree] [partof] [forest] and [forest] isa [ecosystem] then [tree] [partof] [ecosystem]
			//because it would mean that all ecosystems contain tree
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
			
			//Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
		}
		//For some operators (like partof) the [operator] is, it must use someare recursively to expand its connections
		else if (verb == this.instinct.someare || verb == this.instinct.partof)
		{
			//Render stuff like: if [wood] [partof] [tree] and [matter] someare [wood] then [matter] [partof] [tree]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			
			//Render stuff like: if [tree] someare [pine] and [wood] [partof] [tree] then [wood] [partof] [pine]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
		}
		
		if (verb == this.instinct.contradict)
		{
			//if [female] contradict [male] and [male] someare [man] then [female] contradict [man]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			
			//if [male] contradict [female] and [man] isa [male] then [man] contradict [female]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
		}
		
		//Render stuff for complementary operators
		//For instance: pine isa lifeform -> lifeform someare pine
		//this.renderFromComplementaryOperator(subject, verb, implicitBranch);
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
				
				var proof = this.getProof(subjectToRender, verbToRender, remoteComplement, true);
				if (proof == null || proof.length == 0)
				{
					this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, subjectToRender, verbToRender, immediateComplement, true);
					this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, immediateComplement, recursiveVerb, remoteComplement, true);
				}
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
				
				var proof = this.getProof(subjectToRender, verbToRender, remoteComplement, true);
				if (proof == null || proof.length == 0)
				{
					this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, subjectToRender, recursiveVerb, immediateComplement, true);
					this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, immediateComplement, verbToRender, remoteComplement, true);
				}
				implicitBranch.addComplement(remoteComplement);
			}
		}
	}
}

//(Void) Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
Flattenizer.prototype.renderFromComplementaryOperator = function Flattenizer_renderFromComplementaryOperator(subjectToRender, verbToRender, implicitBranch)
{
	throw 'Implement Flattenizer.renderFromComplementaryOperator()';
}