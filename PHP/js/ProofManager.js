//To produce output from proofs
function ProofManager(flattenizer, proofCache)
{
	this.flattenizer = flattenizer;
	this.proofCache = proofCache;
	this.lengthCachedData = new Hash();
}

//(String (HTML) view the proof
ProofManager.prototype.viewProof = function ProofManager_viewProof(subject, verb, complement, depth)
{
	if (depth == null)
		depth = 0;

	var isPositive = this.flattenizer.testConnection(subject, verb, complement);

	var proof = this.proofCache.getProof(subject, verb, complement);
	
	if (proof == null || proof.length == 0)
		return null;
	
	if (depth == 0)
		var htmlProof = "because<br />";
	else
		var htmlProof = '';
		
	for (var index = 0; index < proof.length; index++)
	{
		var statement = proof[index];
		try
		{
			var subProof = this.viewProof(statement.subject, statement.verb, statement.complement, depth + 1);
			
			if (subProof == null)
			{
				htmlProof += '<span class="AiConcept">' + statement.subject + '</span> <span class="AiOperator">' + statement.verb + '</span> <span class="AiConcept">' + statement.complement + '</span>,<br />';
			}
			else
			{
				htmlProof += subProof;
			}
		}
		catch (err)
		{
			//some fault tolerance for IE
		}
	}
	
	if (depth == 0)
		htmlProof += 'therefore, <span class="AiConcept">' + subject + '</span> <span class="AiOperator">' + verb + '</span> <span class="AiConcept">' + complement + '</span>';
	
	return htmlProof;
}

//(Int) length of a proof
ProofManager.prototype.evaluateLength = function ProofManager_evaluateLength(subject, verb, complement)
{
	var key = subject.toString() + ' ' + verb.toString() + ' ' + complement.toString();
	
	if (!this.lengthCachedData.hasItem(key))
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
				var subProofLength = this.evaluateLength(statement.subject, statement.verb, statement.complement);
				if (subProofLength == 0)
					proofLength += 1;
				else
					proofLength += subProofLength;
			}
		}
		this.lengthCachedData.setItem(key, proofLength);
		return proofLength;
	}
	else
	{
		return this.lengthCachedData.getItem(key);
	}
}