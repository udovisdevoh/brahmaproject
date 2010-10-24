//To remove useless totologies (they are useless because they exist as non-tautology connection)
function Optimizer(proofCache)
{
	//(ProofCache) Stores proof for statements
	this.proofCache = proofCache;
}

//Remove useless totologies from totologic branch
//(they are useless when they exist as non-tautology connection)
Optimizer.prototype.optimize = function Optimizer_optimize(subject, verb, totologicBranch)
{
	var newComplementList = Array();
	for (var index in totologicBranch.complementList)
	{
		var complement = totologicBranch.complementList[index];
		var proof = this.proofCache.getProof(subject, verb, complement, true);
		if (!proof || proof.length == 0)
		{
			newComplementList.push(complement);
		}
	}
	
	totologicBranch.complementList = newComplementList;
}