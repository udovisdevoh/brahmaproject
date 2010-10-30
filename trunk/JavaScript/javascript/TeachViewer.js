//Picks random proofs
function TeachViewer(flattenizer, instinct, proofViewer)
{
	//Constants
	this.couldntTeach = "Couldn't find anything to teach";
	
	//Parts
	this.flattenizer = flattenizer
	this.instinct = instinct;
	this.proofViewer = proofViewer;
}

//(String (HTML)) Find a random connection and make proof about it
TeachViewer.prototype.teachAbout = function teachAbout(subject)
{
	var verb = this.getVerbWithMostNonTautologicConnection(subject);
	
	if (verb == null)
		return this.couldntTeach;
	
	var complement = this.getRandomNonTautologicComplement(subject, verb);
	
	if (complement == null)
		return this.couldntTeach;
		
	var proof = this.proofViewer.viewProof(subject, verb, complement);

	if (proof == null)
		return this.couldntTeach;
	else
		return proof;
}

//(Concept) verb with the most connections
TeachViewer.prototype.getVerbWithMostNonTautologicConnection = function getVerbWithMostNonTautologicConnection(subject)
{
	var mostCount = 0;
	var mostVerb = null;
	for (var index2 = 0; index2 < this.instinct.verbList.length; index2++)
	{
		var verb = this.instinct.verbList[index2];
		if (verb instanceof Concept)
		{
			var implicitBranch = subject.getImplicitBranch(verb);
			
			if (!implicitBranch.isFlat)
				if (!implicitBranch.isLocked)
					this.flattenizer.flattenBranch(implicitBranch, subject, verb);
					
			var tautologicBranch = subject.getTautologicBranch(verb);
			
			var currentCount = implicitBranch.complementList.length - tautologicBranch.complementList.length;
			
			if (currentCount > mostCount)
			{
				mostCount = currentCount;
				mostVerb = verb;
			}
		}
	}
	return mostVerb;
}

//(Complement) Random complement having a proof
TeachViewer.prototype.getRandomNonTautologicComplement = function getRandomNonTautologicComplement(subject, verb)
{
	var implicitBranch = subject.getImplicitBranch(verb);
	if (!implicitBranch.isFlat)
		if (!implicitBranch.isLocked)
			this.flattenizer.flattenBranch(implicitBranch, subject, verb);
	
	var tautologicBranch = subject.getTautologicBranch(verb);
	
	var randomComplementList = Array();
	
	for (var index = 0; index < implicitBranch.complementList.length; index++)
	{
		var complement = implicitBranch.complementList[index];
		
		if (tautologicBranch.complementList.indexOf(complement) == -1)
		{
			randomComplementList.push(complement);
		}
	}
	
	if (randomComplementList.length > 0)
	{
		return randomComplementList[Math.floor(Math.random() * randomComplementList.length)];
	}
	else
	{
		return null;
	}
}