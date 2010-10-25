//To remove useless tautologies (they are useless because they exist as non-tautology connection)
function Optimizer(proofCache)
{
	//(ProofCache) Stores proof for statements
	this.proofCache = proofCache;
}

//Remove useless tautologies from tautologic branch
//(they are useless when they exist as non-tautology connection)
Optimizer.prototype.optimize = function Optimizer_optimize(subject, verb, tautologicBranch)
{
	var newComplementList = Array();
	for (var index in tautologicBranch.complementList)
	{
		var complement = tautologicBranch.complementList[index];
		var proof = this.proofCache.getProof(subject, verb, complement, true);
		if (!proof || proof.length == 0)
		{
			newComplementList.push(complement);
		}
	}
	
	tautologicBranch.complementList = newComplementList;
}