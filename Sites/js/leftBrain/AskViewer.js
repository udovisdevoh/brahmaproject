//Makes AI ask questions in order to learn
function AskViewer(flattenizer, instinct, conceptNameMapper, firstSecondPersonManager)
{
	//Constants
	this.maxIgnoreListLength = 15;
	
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

	verb = this.getLeastDocumentedVerbNotInIgnoreList(subject);
	if (verb == null)
		verb = this.getMostAsymetricVerbNotInIgnoreList(subject);
	if (verb == null)
		verb = this.getRandomVerbNotInIgnoreList(subject);
	if (verb == null)
		verb = this.instinct.verbList[Math.floor(Math.random() * this.instinct.verbList.length)];
		
		
	while (this.ignoreList.length > this.maxIgnoreListLength)
		this.ignoreList.splice(0,1);
	
	var question = '<span class="AiConcept">' + subject.toString() + '</span> <span class="AiOperator">' + verb.toString() + '</span> what?';
	
	if (subject.toString() != this.firstSecondPersonManager.aiName && subject.toString() != this.firstSecondPersonManager.humanName)
		question += ' <span class="Commented">//It must be true for everything that <span class="AiOperator">isa</span> <span class="AiConcept">' + subject.toString() + '</span>';

	
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
	} while (limit < 15 && (this.ignoreList.indexOf(subject + ' ' + verb) != -1 || !this.firstSecondPersonManager.isQuestionValidIfFirstOrSecondPerson(subject, verb)));
	
	return verb;
}

//(Concept)
//Can be null
AskViewer.prototype.getLeastDocumentedVerbNotInIgnoreList = function AskViewer_getLeastDocumentedVerbNotInIgnoreList(subject)
{
	var leastConnectionCount = -1;
	var leastDocumentedVerb = null;
	
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
				if (this.firstSecondPersonManager.isQuestionValidIfFirstOrSecondPerson(subject, verb))
				{
					leastConnectionCount = tautologicBranch.complementList.length;
					leastDocumentedVerb = verb;
				}
			}
		}
	}
	
	return leastDocumentedVerb;
}

//(Concept)
//Can be null
AskViewer.prototype.getMostAsymetricVerbNotInIgnoreList = function AskViewer_getMostAsymetricVerbNotInIgnoreList(subject)
{
	var mostConnectionCount = -1;
	var mostAsymmetricVerb = null;
	
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
					if (this.firstSecondPersonManager.isQuestionValidIfFirstOrSecondPerson(subject, verb))
					{
						mostConnectionCount = tautologicBranch.complementList.length;
						mostAsymmetricVerb = verb.complementaryOperators[0];
					}
				}
			}
		}
	}
	
	return mostAsymmetricVerb;
}