//Represent a client-side's talking interface
function TalkingRouter()
{
	//Constants
	this.helpLinkString = 'Unrecognized statement, use <a href="./help.php" target="_blank">help</a>';
	this.notThatIKnow = 'Not that I know';
	this.iDonTKnow = "I don't know";
	
	//Members
	this.conceptNameMapper = new ConceptNameMapper();
	this.tautologyManager = new TautologyManager(this.conceptNameMapper);
	this.complementaryOperatorManager = new ComplementaryOperatorManager(this.conceptNameMapper)
	this.instinct = new Instinct(this.complementaryOperatorManager);
	this.flattenizer = new Flattenizer(this.instinct);
	this.proofCache = this.flattenizer.proofCache;
	this.invalidator = new Invalidator(this.conceptNameMapper.conceptList, this.flattenizer.proofCache);
	this.proofViewer = new ProofViewer(this.flattenizer, this.proofCache);
	this.whatisViewer = new WhatisViewer(this.flattenizer);
	this.objectionFinder = new ObjectionFinder(this.flattenizer);
}

//(String (HTML)) Talk to left brain's talking interface
//This is the main router of the left brain
TalkingRouter.prototype.talkTo = function TalkingRouter_talkTo(statementString)
{
	var isQuestion = statementString.indexOf('?') != -1;
	statementString = statementString.hardTrim();
	var wordList = statementString.split(' ');
	
	if (statementString == '')
	{
		return '';
	}
	else if (wordList.length == 1)
	{
		if (wordList[0] == 'start')
		{
			return this.talkToStart();
		}
		else if (wordList[0] == 'stop')
		{
			return this.talkToStop();
		}
		else if (wordList[0] == 'think')
		{
			return this.talkToThink();
		}
		else if (wordList[0] == 'ask')
		{
			return this.talkToAsk();
		}
		else if (wordList[0] == 'talk')
		{
			return this.talkToTalk();
		}
		else
		{
			return this.helpLinkString;
		}
	}
	else if (wordList.length == 2)
	{
		if (wordList[0] == 'whatis')
		{
			return this.talkToWhatIs(this.conceptNameMapper.getConcept(wordList[1]));
		}
		else if (wordList[1] == 'define')
		{
			return this.talkToDefine(this.conceptNameMapper.getConcept(wordList[1]));
		}
		else if (wordList[1] == 'thinkabout')
		{
			return this.talkToThinkAbout(this.conceptNameMapper.getConcept(wordList[1]));
		}
		else if (wordList[1] == 'askabout')
		{
			return this.talkToAskAbout(this.conceptNameMapper.getConcept(wordList[1]));
		}
		else if (wordList[1] == 'talkabout')
		{
			return this.talkToTalkAbout(this.conceptNameMapper.getConcept(wordList[1]));
		}
		else
		{
			return this.helpLinkString;
		}
	}
	else if (wordList.length == 3 || (wordList.length == 4 && wordList[1] == 'not'))
	{
		var subject, verb, complement, isPositive;
		if (wordList.length == 3)
		{
			if (wordList[0] == 'alias')
			{
				return this.talkToAlias(wordList[1], wordList[2]);
			}
			else if (wordList[0] == 'unalias')
			{
				return this.talkToUnAlias(wordList[1], wordList[2]);
			}
			else if (wordList[0] == 'rename')
			{
				return this.talkToRename(wordList[1], wordList[2]);
			}
		}
		
		if (wordList.length == 3)
		{
			subject = this.conceptNameMapper.getConcept(wordList[0]);
			verb = this.conceptNameMapper.getConcept(wordList[1]);
			complement = this.conceptNameMapper.getConcept(wordList[2]);
			isPositive = true;
		}
		else
		{
			subject = this.conceptNameMapper.getConcept(wordList[0]);
			verb = this.conceptNameMapper.getConcept(wordList[2]);
			complement = this.conceptNameMapper.getConcept(wordList[3]);
			isPositive = false;
		}
		return this.talkToStatement(subject, verb, complement, isPositive, isQuestion);
	}
	else if (wordList.length == 4 || (wordList.length == 5 && wordList[2] == 'not'))
	{
		var subject, verb, complement, isPositive;
		if (wordList.length == 4)
		{
			subject = this.conceptNameMapper.getConcept(wordList[1]);
			verb = this.conceptNameMapper.getConcept(wordList[2]);
			complement = this.conceptNameMapper.getConcept(wordList[3]);
			isPositive = true;
		}
		else
		{
			subject = this.conceptNameMapper.getConcept(wordList[1]);
			verb = this.conceptNameMapper.getConcept(wordList[3]);
			complement = this.conceptNameMapper.getConcept(wordList[4]);
			isPositive = false;
		}
		
		if (wordList[0] == 'why' || wordList[0] == 'how')
		{
			return this.talkToWhyStatement(subject, verb, complement);
		}
		else
		{
			return this.helpLinkString;
		}
	}
	else
	{
		return this.helpLinkString;
	}
}

//(String (HTML))
TalkingRouter.prototype.talkToStatement = function TalkingRouter_talkToStatement(subject, verb, complement, isPositive, isQuestion)
{
	var wasPositive = this.flattenizer.testConnection(subject, verb, complement);
	
	if (isPositive != wasPositive && !isQuestion)
	{
		if (isPositive)
			this.tautologyManager.learnStatement(subject + ' ' + verb + ' ' + complement);
		else
			this.tautologyManager.learnStatement(subject + ' not ' + verb + ' ' + complement);
	
		this.invalidator.invalidateAll();
	}
	
	var isStillPositive = this.flattenizer.testConnection(subject, verb, complement);
	
	if (isStillPositive == isPositive) //The Ai found no counter-argument
	{
		if (isPositive)
		{
			if (wasPositive)
				return 'Yes, <span class="AiConcept">' + subject + '</span> <span class="AiOperator">' + verb + '</span> <span class="AiConcept">' + complement + '</span>';
			else
				return 'Alright, <span class="AiConcept">' + subject + '</span> now <span class="AiOperator">' + verb + '</span> <span class="AiConcept">' + complement + '</span>';
		}
		else
		{
			if (wasPositive)
				return 'Alright, <span class="AiConcept">' + subject + '</span> not <span class="AiOperator">' + verb + '</span> <span class="AiConcept">' + complement + '</span> anymore';
			else
				return this.notThatIKnow;
		}
	}
	else
	{
		var proof = this.talkToWhyStatement(subject, verb, complement);
		if (proof)
			return '<span class="AiConcept">Me</span> <span class="AiOperator">disagree</span> because<br />' + proof;
		else
			return this.notThatIKnow;
	}
}

//(String (HTML))
TalkingRouter.prototype.talkToWhyStatement = function TalkingRouter_talkToWhyStatement(subject, verb, complement)
{
	var proof = this.proofViewer.viewProof(subject, verb, complement);
	if (proof)
		return proof;
		
	var objectionStatement = this.objectionFinder.findObjection(subject, verb, complement);
	
	if (objectionStatement == null)
		return null;
	
	proof = this.proofViewer.viewProof(objectionStatement.subject, objectionStatement.verb, objectionStatement.complement, 0);
	
	if (proof)
		return proof;
	
	return null;
}

//(String (HTML))
TalkingRouter.prototype.talkToWhatIs = function TalkingRouter_talkToWhatIs(subject)
{
	return this.whatisViewer.viewDefinition(subject);
}