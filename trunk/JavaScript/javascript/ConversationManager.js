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

	var theory = null;
	if (Math.floor(Math.random() * 2) == 0)
	{
		theory = this.thinker._getTheoryAbout(human);
		if (theory == null)
			theory = this.thinker._getTheoryAbout(ai);	
	}
	else
	{
		theory = this.thinker._getTheoryAbout(ai);
		if (theory == null)
			theory = this.thinker._getTheoryAbout(human);	
	}
	
	if (theory == null)
		theory = this.thinker._getTheory();
		
	if (theory != null)
	{
		if (theory.weight > (Math.random() * Math.random()))
		//if (Math.floor(Math.random() * 2) == 0)
		{
			return 'thinkabout ' + theory.subject.toString();
		}
	}

	
	var topicId = Math.floor(Math.random() * 3);
	var relatedConcept;
	
	if (topicId == 0)
	{
		return 'askabout me';
	
		/*relatedConcept = this.getRelatedConcept(human);
		
		if (relatedConcept == null || Math.floor(Math.random() * 2) == 0)
			return 'askabout me';
		else
			return 'askabout ' + relatedConcept.toString();*/
	}
	else if (topicId == 1)
	{
		return 'askabout you';

		/*relatedConcept = this.getRelatedConcept(ai);
	
		if (relatedConcept == null || Math.floor(Math.random() * 2) == 0)
			return 'askabout you';
		else
			return 'askabout ' + relatedConcept.toString();*/
	}
	else if (topicId == 2)
	{
		return 'ask';
	}
}