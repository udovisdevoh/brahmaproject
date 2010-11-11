//To remember proofs for connections
function ProofCache()
{
	this.cachedData = new Hash();
}

//(Void) Remember proof argument
ProofCache.prototype.addProofArgument = function ProofCache_addProofArgument(subject, verb, complement, argumentSubject, argumentVerb, argumentComplement, isArgumentPositive)
{
	if (!this.cachedData.hasItem(subject))
		this.cachedData.setItem(subject, new Hash());

	var subjectBranch = this.cachedData.getItem(subject);
	
	if (!subjectBranch.hasItem(verb))
		subjectBranch.setItem(verb, new Hash());
	
	var verbBranch = subjectBranch.getItem(verb);
	

	var proof;
	if (verbBranch.hasItem(complement))
	{
		proof = verbBranch.getItem(complement);
	}
	else
	{
		proof = Array();
		verbBranch.setItem(complement, proof);
	}
	
	argumentStatement = new Statement(argumentSubject, argumentVerb, argumentComplement, isArgumentPositive);
	
	var isFoundArgument = false;
	for (var index = 0; index < proof.length; index++)
	{
		var currentArgument = proof[index];
		if (argumentStatement == currentArgument)
		{
			isFoundArgument = true;
		}
	}
	
	if (!isFoundArgument)
	{
		proof.push(argumentStatement);
	}
}

//(Array of Statement)
//Get proof for statement
ProofCache.prototype.getProof = function ProofCache_getProof(subject, verb, complement, isPositive)
{
	if (!this.cachedData.hasItem(subject))
		this.cachedData.setItem(subject, new Hash());

	var subjectBranch = this.cachedData.getItem(subject);
	
	if (!subjectBranch.hasItem(verb))
		subjectBranch.setItem(verb, new Hash());
	
	var verbBranch = subjectBranch.getItem(verb);
	

	var proof = null;
	if (verbBranch.hasItem(complement))
	{
		proof = verbBranch.getItem(complement);
	}
	
	return proof;
}

//(Bool)
//Return true if proof contains argument or complement of argument
ProofCache.prototype.isProofContainArgument = function ProofCache_isProofContainArgument(proofSubject, proofVerb, proofComplement, argumentSubject, argumentVerb, argumentComplement)
{
	//Must return true if proof contains argument or complement of argument
	throw 'Implement ProofCache.isProofContainArgument()';
}

/*//(Void) Reset proof
ProofCache.prototype.resetProof = function ProofCache_resetProof(subject, verb, complement)
{
	if (!this.cachedData.hasItem(subject))
		this.cachedData.setItem(subject, new Hash());

	var subjectBranch = this.cachedData.getItem(subject);
	
	if (!subjectBranch.hasItem(verb))
		subjectBranch.setItem(verb, new Hash());
	
	var verbBranch = subjectBranch.getItem(verb);
	
	verbBranch.clear();
}*/