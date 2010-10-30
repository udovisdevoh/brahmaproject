//Flattenizer
function Flattenizer(instinct)
{
	//(Instinct) instinct
	this.instinct = instinct;
	
	//(ConceptNameMapper) concept name mapper
	this.conceptNameMapper = instinct.conceptNameMapper;
	
	//(ProofCache) Stores proof for statements
	this.proofCache = new ProofCache();
	
	//(Optimizer) To remove useless tautologies (they are useless because they exist as non-tautology connection)
	this.optimizer = new Optimizer(this.proofCache);
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
	if (this.testConnection(subject, verb, complement) == isPositive)
		return this.proofCache.getProof(subject, verb, complement, isPositive);
}

Flattenizer.prototype.copyFromTautologicBranch = function Flattenizer_copyFromTautologicBranch(tautologicBranch, implicitBranch)
{
	for (var index = 0; index < tautologicBranch.complementList.length; index++)
	{
		var complement = tautologicBranch.complementList[index];
		if (complement instanceof Concept)
		{
			implicitBranch.addComplement(complement);
		}
	}
}

Flattenizer.prototype.flattenBranch = function Flattenizer_flattenBranch(implicitBranch, subject, verb)
{
	var tautologicBranch = subject.getTautologicBranch(verb);
	
	implicitBranch.isLocked = true;
	
	implicitBranch.complementList = new Array();//We must clear the list of complements
	
	this.copyFromTautologicBranch(tautologicBranch, implicitBranch);
	
	var howManyComplement;
	
	do
	{
		howManyComplement = implicitBranch.complementList.length;
	
		//Self recursive verbs
		//Render stuff like: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
		// or if [wood] [partof] [tree] and [water] [partof] [wood] then [water] [partof] [tree]
		if (verb == this.instinct.madeof
		|| verb == this.instinct.partof
		|| verb == this.instinct.need
		|| verb == this.instinct.allow
		|| verb == this.instinct.make
		|| verb == this.instinct.madeby
		|| verb == this.instinct.largerthan
		|| verb == this.instinct.smallerthan
		|| verb == this.instinct.from
		|| verb == this.instinct.originof)
		{
			this.renderFromPreRecursiveOperator(subject, verb, verb, implicitBranch);
		}
		
		//For some operators (like madeof) the [operator] is, it must use ISA recursively to expand its connections
		if (verb == this.instinct.isa
		|| verb == this.instinct.madeof
		|| verb == this.instinct.need
		|| verb == this.instinct.make)
		{
			//Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [tree] [madeof] [matter]
			//and if [bird] [need] [tree] and [tree] isa [plant] then [bird] [need] [plant]
			//BUT NOT: if [tree] [partof] [forest] and [forest] isa [ecosystem] then [tree] [partof] [ecosystem]
			//because it would mean that all ecosystems contain tree
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
			
			//Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
			//and if [parrot] isa [bird] and [bird] [need] [tree] then [parrot] [need] [tree]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
		}
		//For some operators (like partof) the [operator] is, it must use someare recursively to expand its connections
		else if (verb == this.instinct.someare
		|| verb == this.instinct.partof
		|| verb == this.instinct.allow
		|| verb == this.instinct.madeby)
		{
			//Render stuff like: if [wood] [partof] [tree] and [matter] someare [wood] then [matter] [partof] [tree]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			
			//Render stuff like: if [tree] someare [pine] and [wood] [partof] [tree] then [wood] [partof] [pine]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
		}
		//For some symmetric operators like "contradict"
		else if (verb == this.instinct.contradict)
		{
			//if [female] contradict [male] and [male] someare [man] then [female] contradict [man]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			
			//if [male] contradict [female] and [man] isa [male] then [man] contradict [female]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
		}
		//For some operators like "destroy"
		else if (verb == this.instinct.destroy)
		{
			//Render stuff like: if [gmo] isa [poison] and [poison] [destroy] [life] then [gmo] [destroy] [life]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
			
			//Render stuff like: if [monsanto] make [poison] and [poison] oppress [human] then [monsanto] oppress [human]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.make, implicitBranch);
			
			//Render stuff like if [monsanto] destroy [human] and [human] someare [joe] then [monsanto] destroy [joe]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			
			//Render stuff like: if [monsanto] destroy [health] and [health] [allow] [human] then [monsanto] [destroy] [human]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.allow, implicitBranch);
		}
		else if (verb == this.instinct.destroyedby)
		{
			//Render stuff like: if [gmo] isa [poison] and [poison] [destroy] [life] then [gmo] [destroy] [life]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			
			//Render stuff like: if [monsanto] make [poison] and [poison] oppress [human] then [monsanto] oppress [human]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.madeby, implicitBranch);
			
			//Render stuff like if [monsanto] destroy [human] and [human] someare [joe] then [monsanto] destroy [joe]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
			
			//Render stuff like: if [monsanto] destroy [health] and [health] [allow] [human] then [monsanto] [destroy] [human]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.need, implicitBranch);
		}		
		else if (verb == this.instinct.largerthan) //For operators like "largerthan" and "smallerthan"
		{
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
		}
		else if (verb == this.instinct.smallerthan)
		{
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
		}
		else if (verb == this.instinct.from)
		{
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.partof, implicitBranch);
		}
		else if (verb == this.instinct.originof)
		{
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.madeof, implicitBranch);
		}
		
	} while (howManyComplement < implicitBranch.complementList.length);
	
	this.optimizer.optimize(subject, verb, tautologicBranch);
	
	implicitBranch.isFlat = true;
	implicitBranch.isLocked = false;
}

//(Void) Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [tree] [madeof] [matter]
Flattenizer.prototype.renderFromPreRecursiveOperator = function Flattenizer_renderFromPreRecursiveOperator(subjectToRender, verbToRender, recursiveVerb, implicitBranch)
{
	for (var index1 = 0; index1 < implicitBranch.complementList.length; index1++)
	{
		var immediateComplement = implicitBranch.complementList[index1];
		if (immediateComplement instanceof Concept)
		{
			var remoteImplicitBranch = immediateComplement.getImplicitBranch(recursiveVerb);
			
			if (!remoteImplicitBranch.isFlat)
				if (!remoteImplicitBranch.isLocked)
					this.flattenBranch(remoteImplicitBranch, immediateComplement, recursiveVerb);
			
			for (var index2 = 0; index2 < remoteImplicitBranch.complementList.length; index2++)
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

	for (var index1 = 0; index1 < remoteRecursiveVerbBranch.complementList.length; index1++)
	{
		var immediateComplement = remoteRecursiveVerbBranch.complementList[index1];
		if (immediateComplement instanceof Concept)
		{
			var remoteCurrentVerbBranch = immediateComplement.getImplicitBranch(verbToRender);
			
			if (!remoteCurrentVerbBranch.isFlat)
				if (!remoteCurrentVerbBranch.isLocked)
					this.flattenBranch(remoteCurrentVerbBranch, immediateComplement, verbToRender);
			
			for (var index2 = 0; index2 < remoteCurrentVerbBranch.complementList.length; index2++)
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