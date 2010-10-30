//Represent a client-side's talking interface
function TalkingRouter(humanName, aiName)
{
	//Constants
	this.helpLinkString = 'Unrecognized statement, use <a href="./help.php" target="_blank">help</a>';
	this.notThatIKnow = 'Not that I know';
	this.iDonTKnow = "I don't know";
	this.someoneToldMe = "That's what I've been told";
	
	//Members
	this.conceptNameMapper = new ConceptNameMapper();
	this.tautologyManager = new TautologyManager(this.conceptNameMapper);
	this.complementaryOperatorManager = new ComplementaryOperatorManager(this.conceptNameMapper)
	this.instinct = new Instinct(this.complementaryOperatorManager);
	this.flattenizer = new Flattenizer(this.instinct);
	this.proofCache = this.flattenizer.proofCache;
	this.invalidator = new Invalidator(this.conceptNameMapper.conceptList, this.flattenizer.proofCache);
	this.proofViewer = new ProofViewer(this.flattenizer, this.proofCache);
	this.whatisViewer = new WhatisViewer(this.flattenizer, this.instinct);
	this.defineViewer = new DefineViewer(this.flattenizer, this.instinct);
	this.teachViewer = new TeachViewer(this.flattenizer, this.instinct, this.conceptNameMapper, this.proofViewer);
	this.objectionFinder = new ObjectionFinder(this.flattenizer);
	this.firstSecondPersonManager = new FirstSecondPersonManager(humanName, aiName);
	this.humanStatementSplitter = new HumanStatementSplitter(this.instinct, this.conceptNameMapper);
	this.humanStatementColorizer = new HumanStatementColorizer(this.instinct, this.conceptNameMapper);
	this.io = Array();
}

//(String (HTML)) Talk to left brain's talking interface
//This is the main router of the left brain
//Aware of "you", "me", human's name and ai's name
TalkingRouter.prototype.talkTo = function TalkingRouter_talkTo(statementString)
{
	var statementList = this.humanStatementSplitter.split(statementString);
	var output = "";
	var input = "";
	for (var index = 0; index < statementList.length; index++)
	{
		var subStatement = statementList[index];
		var contextFreeHumanStatement = this.firstSecondPersonManager.formatHumanInput(subStatement);
		var contextFreeAiStatement = this.talkToContextFree(contextFreeHumanStatement);
		
		input += this.humanStatementColorizer.colorize(subStatement);
		output += this.firstSecondPersonManager.formatAiOutput(contextFreeAiStatement);
		
		if (index < statementList.length - 1)
		{
			input += '<br />';
			output += '<br />';
		}
	}
	
	this.io['input'] = input;
	this.io['output'] = output;
	
	return this.io;
}

//(String (HTML)) Talk to left brain's talking interface
//This is the main router of the left brain
//Unaware of "you", "me", human's name and ai's name
TalkingRouter.prototype.talkToContextFree = function TalkingRouter_talkToContextFree(statementString)
{
	var isQuestion = statementString.indexOf('?') != -1;
	statementString = statementString.hardTrim();
	statementString = this.firstSecondPersonManager.formatHumanInput(statementString);
	
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
		else if (wordList[0] == 'teach')
		{
			return this.talkToTeach();
		}
		else if (wordList[0] == 'talk')
		{
			return this.talkToTalk();
		}
		else if (wordList[0] == 'yes')
		{
			return this.talkToYes();
		}
		else if (wordList[0] == 'no')
		{
			return this.talkToNo();
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
		else if (wordList[0] == 'define')
		{
			return this.talkToDefine(this.conceptNameMapper.getConcept(wordList[1]));
		}
		else if (wordList[0] == 'thinkabout')
		{
			return this.talkToThinkAbout(this.conceptNameMapper.getConcept(wordList[1]));
		}
		else if (wordList[0] == 'askabout')
		{
			return this.talkToAskAbout(this.conceptNameMapper.getConcept(wordList[1]));
		}
		else if (wordList[0] == 'teachabout')
		{
			return this.talkToTeachAbout(this.conceptNameMapper.getConcept(wordList[1]));
		}
		else if (wordList[0] == 'talkabout')
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
			else if (wordList[2] == 'what')
			{
				return this.talkToVerbWhat(this.conceptNameMapper.getConcept(wordList[0]), this.conceptNameMapper.getConcept(wordList[1]));
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
		
		if (this.instinct.verbList.indexOf(verb) == -1)
			return this.helpLinkString;
		
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
			var proof = this.talkToWhyStatement(subject, verb, complement); 
			if (proof)
				return proof;
			else
				return this.someoneToldMe;
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
		{
			var objectionStatement = this.objectionFinder.findObjection(subject, verb, complement);
			if (objectionStatement == null)
			{
				this.tautologyManager.learnStatement(subject + ' ' + verb + ' ' + complement);
			}
		}
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
			return '<span class="AiConcept">Me</span> <span class="AiOperator">disagree</span> ' + proof;
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

//(String (HTML))
TalkingRouter.prototype.talkToDefine = function TalkingRouter_talkToDefine(subject)
{
	return this.defineViewer.viewDefinition(subject);
}

//(String (HTML))
//Answer to stuff like: pine madeof what?
TalkingRouter.prototype.talkToVerbWhat = function TalkingRouter_talkToVerbWhat(subject, verb)
{
	return this.defineViewer.viewDefinition(subject, verb);
}

//(String (HTML))
TalkingRouter.prototype.talkToTeachAbout = function TalkingRouter_talkToTeachAbout(subject)
{
	return this.teachViewer.teachAbout(subject);
}

//(String (HTML))
TalkingRouter.prototype.talkToTeach = function TalkingRouter_talkToTeach()
{
	return this.teachViewer.teach();
}