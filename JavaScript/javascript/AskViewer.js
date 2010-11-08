//Makes AI ask questions in order to learn
function AskViewer(flattenizer, instinct, conceptNameMapper, firstSecondPersonManager)
{
	//Constants
	this.maxIgnoreListLength = 10;
	
	//Parts
	this.instinct = instinct;
	this.flattenizer = flattenizer;
	this.conceptNameMapper = conceptNameMapper;
	this.firstSecondPersonManager = firstSecondPersonManager;
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
	var verb;
	var timeOut = 0;
	do
	{
		var methodId = Math.floor(Math.random() * 3);
		if (methodId == 0)
		{
			verb = this.getLeastDocumentedVerbNotInIgnoreList(subject);
		}
		else if (methodId == 1)
		{
			verb = this.getRandomVerbNotInIgnoreList(subject);
		}
		else
		{
			verb = this.getMostAsymetricVerbNotInIgnoreList(subject);
		}
	} while (timeOut < 10 && !this.firstSecondPersonManager.isQuestionValidIfFirstOrSecondPerson(subject, verb));
	
	while (this.ignoreList.length > this.maxIgnoreListLength)
		this.ignoreList.splice(0,1);
	var question = '<span class="AiConcept">' + subject + '</span> <span class="AiOperator">' + verb + '</span> what?';
	this.ignoreList.push(subject + ' ' + verb);
	return question;
}

//(Concept)
AskViewer.prototype.getRandomVerbNotInIgnoreList = function AskViewer_getRandomVerbNotInIgnoreList(subject)
{
	var verb;
	var limit = 0;
	do
	{
		verb = this.instinct.verbList[Math.floor(Math.random() * this.instinct.verbList.length)];
		limit++;
	} while (limit < 10 && this.ignoreList.indexOf(subject + ' ' + verb) != -1);
	
	return verb;
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

//(Concept)
AskViewer.prototype.getMostAsymetricVerbNotInIgnoreList = function AskViewer_getMostAsymetricVerbNotInIgnoreList(subject)
{
	var mostConnectionCount = -1;
	var mostAsymmetricVerb;
	
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
			
			if ((mostConnectionCount == -1 || tautologicBranch.complementList.length > mostConnectionCount) && this.ignoreList.indexOf(subject + ' ' + verb) == -1)
			{
				if (verb.complementaryOperators.length > 0)
				{
					mostConnectionCount = tautologicBranch.complementList.length;
					mostAsymmetricVerb = verb.complementaryOperators[0];
				}
			}
		}
	}
	
	return mostAsymmetricVerb;
}