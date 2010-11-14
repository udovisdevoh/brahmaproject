//Make proactive conversation with AI
function ConversationManager(flattenizer, instinct, thinker, conceptNameMapper, firstSecondPersonManager)
{
	//Fields
	this.isStarted = false;
	
	//Parts
	this.flattenizer = flattenizer
	this.instinct = instinct;
	this.thinker = thinker;
	this.conceptNameMapper = conceptNameMapper;
	this.firstSecondPersonManager = firstSecondPersonManager;
}

//(String) humen conversation insentive to AI
ConversationManager.prototype.getHiddenHumanConversationInsentiveStatement = function ConversationManager_getHiddenHumanConversationInsentiveStatement()
{
	var human = this.conceptNameMapper.getConcept(this.firstSecondPersonManager.humanName);
	var ai = this.conceptNameMapper.getConcept(this.firstSecondPersonManager.aiName);
	var relatedConcept;
	
	var theory = null;
	
	var topicId = Math.floor(Math.random() * 4);
	if (topicId == 0)
	{
		theory = this.thinker._getTheoryAbout(human);
		if (theory == null)
			theory = this.thinker._getTheoryAbout(ai);	
	}
	else if (topicId == 1)
	{
		theory = this.thinker._getTheoryAbout(ai);
		if (theory == null)
			theory = this.thinker._getTheoryAbout(human);	
	}
	else if (topicId == 2)
	{
		relatedConcept = this._getRelatedConcept(human, ai);
		if (relatedConcept != null)
			theory = this.thinker._getTheoryAbout(relatedConcept);
	}
		
	if (theory == null) //because no theory found or topicId == 3
		theory = this.thinker._getTheory();
		
	if (theory != null)
	{
		if (theory.weight > (Math.random() * Math.random()))
		{
			if (this.thinker._getTheoryAbout(theory.subject) != null)
				return 'thinkabout ' + theory.subject.toString();
			else
				return 'thinkabout ' + theory.complement.toString();
		}
	}

	
	topicId = Math.floor(Math.random() * 3);
	
	if (topicId == 0)
	{
		return 'askabout me';
	}
	else if (topicId == 1)
	{
		return 'askabout you';
	}
	else if (topicId == 2)
	{
		if (Math.floor(Math.random() * 2) == 0)
			relatedConcept = this._getRelatedConcept(human, human, ai);
		else
			relatedConcept = this._getRelatedConcept(ai, human, ai);
			
		if (relatedConcept != null)
			return 'askabout ' + relatedConcept.toString();
	}
	
	return 'ask';
}

//(Concept) concept related to subject, but it must not be human nor ai
ConversationManager.prototype._getRelatedConcept = function ConversationManager__getRelatedConcept(subject, human, ai)
{
	var relatedConceptList = Array();
	this._populateRelatedConceptList(subject, relatedConceptList);
	
	var positionOfHuman = relatedConceptList.indexOf(human);
	if (positionOfHuman != -1)
		relatedConceptList.splice(positionOfHuman,1);
	
	var positionOfAi = relatedConceptList.indexOf(ai);
	if (positionOfAi != -1)
		relatedConceptList.splice(positionOfAi,1);
		
	if (relatedConceptList.length <= 0)
		return null;
		
	return relatedConceptList[Math.floor(Math.random() * relatedConceptList.length)];
}

//(Concept) least document concept related to human or ai
ConversationManager.prototype._populateRelatedConceptList = function ConversationManager__populateRelatedConceptList(subject, relatedConceptList)
{
	for (var index = 0; index < this.instinct.verbList.length; index++)
	{
		var verb = this.instinct.verbList[index];
		
		var implicitBranch = subject.getImplicitBranch(verb);
		if (!implicitBranch.isFlat)
			if (!implicitBranch.isLocked)
				this.flattenizer.flattenBranch(implicitBranch, subject, verb);					
		var tautologicBranch = subject.getTautologicBranch(verb);
		
		for (var complementIndex = 0; complementIndex < tautologicBranch.complementList.length; complementIndex++)
		{
			var complement = tautologicBranch.complementList[complementIndex];
			if (relatedConceptList.indexOf(complement) == -1)
				relatedConceptList.push(complement);
		}
	}
}

//(Bool)
//Whether statement is a punctuated request for conversational element
ConversationManager.prototype.isConversationRequest = function ConversationManager_isConversationRequest(statement)
{
	if (statement == "ask" || statement.startsWith("askabout ") || statement == "think" || statement.startsWith("thinkabout ") || statement == "talk" || statement.startsWith("talkabout ") || statement == "teach" || statement.startsWith("teachabout "))
		return false;
}