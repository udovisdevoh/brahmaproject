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
		//Render stuff as: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
		// or if [wood] [partof] [tree] and [water] [partof] [wood] then [water] [partof] [tree]
		if (verb == this.instinct.madeof
		|| verb == this.instinct.partof
		|| verb == this.instinct.helpedby
		|| verb == this.instinct.help
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
		|| verb == this.instinct.helpedby
		|| verb == this.instinct.make)
		{
			//Render stuff as: if [tree] [madeof] [wood] and [wood] isa [matter] then [tree] [madeof] [matter]
			//and if [bird] [helpedby] [tree] and [tree] isa [plant] then [bird] [helpedby] [plant]
			//BUT NOT: if [tree] [partof] [forest] and [forest] isa [ecosystem] then [tree] [partof] [ecosystem]
			//because it would mean that all ecosystems contain tree
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
			
			//Render stuff as: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
			//and if [parrot] isa [bird] and [bird] [helpedby] [tree] then [parrot] [helpedby] [tree]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
		}
		//For some operators (like partof) the [operator] is, it must use someare recursively to expand its connections
		else if (verb == this.instinct.someare
		|| verb == this.instinct.partof
		|| verb == this.instinct.help
		|| verb == this.instinct.madeby)
		{
			//Render stuff as: if [wood] [partof] [tree] and [matter] someare [wood] then [matter] [partof] [tree]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			
			//Render stuff as: if [tree] someare [pine] and [wood] [partof] [tree] then [wood] [partof] [pine]
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
			//Render stuff as: if [gmo] isa [poison] and [poison] [destroy] [life] then [gmo] [destroy] [life]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
			
			//Render stuff as: if [monsanto] make [poison] and [poison] oppress [human] then [monsanto] oppress [human]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.make, implicitBranch);
			
			//Render stuff as if [monsanto] destroy [human] and [human] someare [joe] then [monsanto] destroy [joe]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			
			//Render stuff as: if [monsanto] destroy [health] and [health] [help] [human] then [monsanto] [destroy] [human]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.help, implicitBranch);
			
			//Render stuff as: if [monsanto] destroy [health] and [health] [likedby] [human] then [monsanto] [destroy] [human]
			//this.renderFromPreRecursiveOperator(subject, verb, this.instinct.likedby, implicitBranch);
			
			//render stuff as: if [mcdonalds] help [trans_fat] and [trans_fat] destroy [me] then [mcdonalds] destroy [me]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.help, implicitBranch);
		}
		else if (verb == this.instinct.destroyedby)
		{
			//Render stuff as: if [gmo] isa [poison] and [poison] [destroy] [life] then [gmo] [destroy] [life]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			
			//Render stuff as: if [monsanto] make [poison] and [poison] oppress [human] then [monsanto] oppress [human]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.madeby, implicitBranch);
			
			//Render stuff as if [monsanto] destroy [human] and [human] someare [joe] then [monsanto] destroy [joe]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.isa, implicitBranch);
			
			//Render stuff as: if [monsanto] destroy [health] and [health] [help] [human] then [monsanto] [destroy] [human]
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.helpedby, implicitBranch);
			
			//Render stuff as: if [monsanto] destroy [health] and [health] [likedby] [human] then [monsanto] [destroy] [human]
			//this.renderFromPostRecursiveOperator(subject, verb, this.instinct.like, implicitBranch);
			
			//render stuff as: if [mcdonalds] help [trans_fat] and [trans_fat] destroy [me] then [mcdonalds] destroy [me]
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.helpedby, implicitBranch);
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
			
			//Render stuff as if [me] madeby [mom] then [me] from [mom]
			//this.renderFromCopyFromOperator(subject, verb, this.instinct.madeby, implicitBranch);	//creates bug, produces stuff like: you make lifeform, therefore you originof frog
		}
		else if (verb == this.instinct.originof)
		{
			this.renderFromPreRecursiveOperator(subject, verb, this.instinct.someare, implicitBranch);
			this.renderFromPostRecursiveOperator(subject, verb, this.instinct.madeof, implicitBranch);
			
			//Render stuff as if [mom] make [me] then [mom] originof [me]
			//this.renderFromCopyFromOperator(subject, verb, this.instinct.make, implicitBranch); //creates bug, produces stuff like: you make lifeform, therefore you originof frog
		}
		

		if (verb == this.instinct.help)
		{
			//render stuff as: if [mcdonalds] make [mcnugget] and [mcnugget] madeof [trans_fat] then [mcdonalds] help [trans_fat]
			this.renderTernaryMetaOperation(subject, verb, this.instinct.make, this.instinct.madeof, implicitBranch);
		}
		else if (verb == this.instinct.helpedby)
		{
			//render stuff as: if [mcnugget] madeby [mcdonalds] and [trans_fat] partof [mcnugget] then [trans_fat] helpedby [mcdonalds]
			this.renderTernaryMetaOperation(subject, verb, this.instinct.partof, this.instinct.madeby, implicitBranch);
		}
		
	} while (howManyComplement < implicitBranch.complementList.length);
	
	this.optimizer.optimize(subject, verb, tautologicBranch);
	
	implicitBranch.isFlat = true;
	implicitBranch.isLocked = false;
}

//Render stuff as if [me] madeby [mom] then [me] from [mom]
Flattenizer.prototype.renderFromCopyFromOperator = function Flattenizer_renderFromCopyFromOperator(subjectToRender, verbToRender, verbToCopy, implicitBranch)
{
	var remoteImplicitBranch = subjectToRender.getImplicitBranch(verbToCopy);
	
	if (!remoteImplicitBranch.isFlat)
		if (!remoteImplicitBranch.isLocked)
			this.flattenBranch(remoteImplicitBranch, subjectToRender, verbToCopy);
			
	for (var index2 = 0; index2 < remoteImplicitBranch.complementList.length; index2++)
	{
		var complement = remoteImplicitBranch.complementList[index2];
		
		//We will not flatten operations when they depend on [subject] [verb] [subject] propositions
		if (subjectToRender != complement && verbToRender != verbToCopy)
		{	
			var proof = this.getProof(subjectToRender, verbToRender, complement, true);
			if (proof == null || proof.length == 0)
			{
				//We must make sure we don't use a proof that contains what we're trying to proove
				if (!this.proofCache.isProofContainArgument(subjectToRender, verbToCopy, complement, subjectToRender, verbToRender, complement))
				{
					this.proofCache.addProofArgument(subjectToRender, verbToRender, complement, subjectToRender, verbToCopy, complement, true);
				}
			}
			implicitBranch.addComplement(complement);
		}
	}
}

//(Void) Render stuff as: if [tree] [madeof] [wood] and [wood] isa [matter] then [tree] [madeof] [matter]
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
				
				//We will not flatten operations when they depend on [subject] [verb] [subject] propositions
				if (subjectToRender != immediateComplement && immediateComplement != remoteComplement)
				{	
					var proof = this.getProof(subjectToRender, verbToRender, remoteComplement, true);
					if (proof == null || proof.length == 0)
					{								
						//We must make sure we don't use a proof that contains what we're trying to proove
						if (!this.proofCache.isProofContainArgument(subjectToRender, verbToRender, immediateComplement, subjectToRender, verbToRender, remoteComplement)
						&& !this.proofCache.isProofContainArgument(immediateComplement, recursiveVerb, remoteComplement, subjectToRender, verbToRender, remoteComplement))
						{
							this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, subjectToRender, verbToRender, immediateComplement, true);
							this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, immediateComplement, recursiveVerb, remoteComplement, true);
						}
					}
					implicitBranch.addComplement(remoteComplement);
				}
			}
		}
	}
}

//(Void) Render stuff as: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
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
				
				//We will not flatten operations when they depend on [subject] [verb] [subject] propositions
				if (subjectToRender != immediateComplement && immediateComplement != remoteComplement)
				{
					var proof = this.getProof(subjectToRender, verbToRender, remoteComplement, true);
					if (proof == null || proof.length == 0)
					{
						//We must make sure we don't use a proof that contains what we're trying to proove
						if (!this.proofCache.isProofContainArgument(subjectToRender, recursiveVerb, immediateComplement, subjectToRender, verbToRender, remoteComplement)
						&& !this.proofCache.isProofContainArgument(immediateComplement, verbToRender, remoteComplement, subjectToRender, verbToRender, remoteComplement))
						{
							this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, subjectToRender, recursiveVerb, immediateComplement, true);
							this.proofCache.addProofArgument(subjectToRender, verbToRender, remoteComplement, immediateComplement, verbToRender, remoteComplement, true);
						}
					}
					implicitBranch.addComplement(remoteComplement);
				}
			}
		}
	}
}

//render stuff as: if [mcdonalds] make [mcnugget] and [mcnugget] madeof [trans_fat] then [mcdonalds] help [trans_fat]
// and if [mcnugget] madeby [mcdonalds] and [trans_fat] partof [mcnugget] then [trans_fat] helpedby [mcdonalds]
Flattenizer.prototype.renderTernaryMetaOperation = function Flattenizer_renderTernaryMetaOperation(subjectToRender, verbToRender, recursiveVerb1, recursiveVerb2, implicitBranch)
{
	var recursiveVerbBranch1 = subjectToRender.getImplicitBranch(recursiveVerb1);
	if (!recursiveVerbBranch1.isFlat)
		if (!recursiveVerbBranch1.isLocked)
			this.flattenBranch(recursiveVerbBranch1, subjectToRender, recursiveVerb1);

	for (var index1 = 0; index1 < recursiveVerbBranch1.complementList.length; index1++)
	{
		var complement1 = recursiveVerbBranch1.complementList[index1];
		
		var recursiveVerbBranch2 = complement1.getImplicitBranch(recursiveVerb2);	
		if (!recursiveVerbBranch2.isFlat)
			if (!recursiveVerbBranch2.isLocked)
				this.flattenBranch(recursiveVerbBranch2, complement1, recursiveVerb2);
				
		for (var index2 = 0; index2 < recursiveVerbBranch2.complementList.length; index2++)
		{
			var complement2 = recursiveVerbBranch2.complementList[index2];
			
			//We will not flatten operations when they depend on [subject] [verb] [subject] propositions
			if (subjectToRender != complement1 && complement1 != complement2)
			{
				var proof = this.getProof(subjectToRender, verbToRender, complement2, true);
				if (proof == null || proof.length == 0)
				{
					//We must make sure we don't use a proof that contains what we're trying to proove
					if (!this.proofCache.isProofContainArgument(subjectToRender, recursiveVerb1, complement1, subjectToRender, verbToRender, complement2)
					&& !this.proofCache.isProofContainArgument(complement1, recursiveVerb2, complement2, subjectToRender, verbToRender, complement2))
					{
						this.proofCache.addProofArgument(subjectToRender, verbToRender, complement2, subjectToRender, recursiveVerb1, complement1, true);
						this.proofCache.addProofArgument(subjectToRender, verbToRender, complement2, complement1, recursiveVerb2, complement2, true);			
					}
				}
				implicitBranch.addComplement(complement2);
			}
		}
	}
}