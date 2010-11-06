//Evaluates the length of a proof
function ProofLengthEvaluator(flattenizer, proofCache)
{
	//Parts
	this.flattenizer = flattenizer;
	this.proofCache = proofCache;
	this.cachedData = new Hash();
}

//(Int) length of a proof
ProofLengthEvaluator.prototype.evaluate = function ProofLengthEvaluator_evaluate(subject, verb, complement)
{
	var key = subject.toString() + ' ' + verb.toString() + ' ' + complement.toString();
	
	if (!this.cachedData.hasItem(key))
	{
		var implicitBranch = subject.getImplicitBranch(verb);
		if (!implicitBranch.isFlat)
			if (!implicitBranch.isLocked)
				this.flattenizer.flattenBranch(implicitBranch, subject, verb);
	
		var proofLength = 0;
		var proof = this.proofCache.getProof(subject, verb, complement);
		if (proof != null)
		{
			for (var index = 0; index < proof.length; index++)
			{
				var statement = proof[index];
				var subProofLength = this.evaluate(statement.subject, statement.verb, statement.complement);
				if (subProofLength == 0)
					proofLength += 1;
				else
					proofLength += subProofLength;
			}
		}
		this.cachedData.setItem(key, proofLength);
		return proofLength;
	}
	else
	{
		return this.cachedData.getItem(key);
	}
}