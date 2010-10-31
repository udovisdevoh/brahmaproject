//Makes AI ask questions in order to learn
function AskViewer(flattenizer, instinct, conceptNameMapper)
{
	//Constants
	this.maxIgnoreListLength = 10;
	
	//Parts
	this.instinct = instinct;
	this.flattenizer = flattenizer;
	this.conceptNameMapper = conceptNameMapper;
	this.ignoreList = Array();
}

//(Concept)
AskViewer.prototype.getRandomSubject = function AskViewer_getRandomSubject()
{
	var nonOperatorConceptList = new Array();
	for (var index = 0; index < this.conceptNameMapper.conceptList.length; index++)
	{
		var concept = this.conceptNameMapper.conceptList[index];
		if (this.instinct.verbList.indexOf(concept) == -1)
		{
			nonOperatorConceptList.push(concept);
		}
	}

	if (nonOperatorConceptList.length > 0)
		return nonOperatorConceptList[Math.floor(Math.random() * nonOperatorConceptList.length)];
	
	return null;
}

//(String (HTML))
AskViewer.prototype.askAbout = function AskViewer_askAbout(subject)
{
	var leastDocumentedVerb = this.getLeastDocumentedVerbNotInIgnoreList(subject);
	while (this.ignoreList.length > this.maxIgnoreListLength)
		this.ignoreList.splice(0,1);
	var question = '<span class="AiConcept">' + subject + '</span> <span class="AiOperator">' + leastDocumentedVerb + '</span> what?';
	this.ignoreList.push(subject + ' ' + leastDocumentedVerb);
	return question;
}

//(Concept)
AskViewer.prototype.getLeastDocumentedVerbNotInIgnoreList = function AskViewer_getLeastDocumentedVerbNotInIgnoreList(subject)
{
	var leastConnectionCount = -1;
	var leastDocumentedVerb;
	
	for (var index = 0; index < this.instinct.verbList.length; index++)
	{
		var verb = this.instinct.verbList[index];
		if (verb instanceof Concept)
		{
			var implicitBranch = subject.getImplicitBranch(verb);
			
			if (!implicitBranch.isFlat)
				if (!implicitBranch.isLocked)
					this.flattenizer.flattenBranch(implicitBranch, subject, verb);
					
			var tautologicBranch = subject.getTautologicBranch(verb);
			
			if ((leastConnectionCount == -1 || tautologicBranch.complementList.length < leastConnectionCount) && this.ignoreList.indexOf(subject + ' ' + verb) == -1)
			{
				leastConnectionCount = tautologicBranch.complementList.length;
				leastDocumentedVerb = verb;
			}
		}
	}
	
	return leastDocumentedVerb;
}