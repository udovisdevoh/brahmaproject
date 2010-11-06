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
		var proof = this.proofCache.getProof(subject, verb, complement);
		var proofLength = 0;

		for (var index = 0; index < proof.length; index++)
		{
			var statement = proof[index];
			proofLength += this.evaluate(statement.subject, statement.verb, statement.complement);
		}
		
		this.cachedData.setItem(key, proofLength);
		return proofLength;
	}
	else
	{
		return this.cachedData.getItem(key);
	}
}