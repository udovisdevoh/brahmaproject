//Represent a client-side's talking interface
function TalkingRouter(humanName, aiName)
{
	//Constants
	this.helpLinkString = 'Unrecognized statement, use <a href="./documentation.php" target="_blank">quick documentation</a> (this link will open a new tab or window)';
	this.notThatIKnow = 'Not that I know';
	this.iDonTKnow = "I don't know";
	this.someoneToldMe = "That's what I've been told";
		
	//Model Members
	this.conceptNameMapper = new ConceptNameMapper();
	this.tautologyManager = new TautologyManager(this.conceptNameMapper);
	this.complementaryOperatorManager = new ComplementaryOperatorManager(this.conceptNameMapper)
	this.instinct = new Instinct(this.complementaryOperatorManager);
	this.flattenizer = new Flattenizer(this.instinct);
	this.objectionFinder = new ObjectionFinder(this.flattenizer);
	this.proofCache = this.flattenizer.proofCache;
	this.firstSecondPersonManager = new FirstSecondPersonManager(humanName, aiName);
	this.proofManager = new ProofManager(this.flattenizer, this.proofCache);
	this.thinker = new Thinker(this.flattenizer, this.instinct, this.conceptNameMapper, this.objectionFinder, this.proofManager, this.firstSecondPersonManager);
	this.invalidator = new Invalidator(this.conceptNameMapper.conceptList, this.flattenizer.proofCache, this.thinker, this.proofManager);
	this.whatisViewer = new WhatisViewer(this.flattenizer, this.instinct);
	this.defineViewer = new DefineViewer(this.flattenizer, this.instinct);
	this.teachViewer = new TeachViewer(this.flattenizer, this.instinct, this.conceptNameMapper, this.proofManager);
	this.askViewer = new AskViewer(this.flattenizer, this.instinct, this.conceptNameMapper, this.firstSecondPersonManager);
	this.humanStatementSplitter = new HumanStatementSplitter(this.instinct, this.conceptNameMapper);
	this.humanStatementColorizer = new HumanStatementColorizer(this.instinct, this.conceptNameMapper);
	this.history = new History();
	this.conversationManager = new ConversationManager(this.flattenizer, this.instinct, this.thinker, this.conceptNameMapper, this.firstSecondPersonManager);
	this.autoComplete = new AutoComplete(this.flattenizer, this.conceptNameMapper, this.proofCache);
	this.io = Array();//['input']: human's input, ['output']: ai's output
	this.latestTheory = null;//Latest theory postulated by Ai
}

//(String (HTML)) Talk to left brain's talking interface
//This is the main router of the left brain
//Aware of "you", "me", human's name and ai's name
TalkingRouter.prototype.talkTo = function TalkingRouter_talkTo(statementString)
{
	this.history.remember(statementString.hardTrim());

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
	
	if ((this.conversationManager.isStarted && !this.conversationManager.isConversationRequest(statementString)) || statementString == 'start' )
	{
		var hiddenHumanConversationInsentiveStatement = this.conversationManager.getHiddenHumanConversationInsentiveStatement();
		var contextFreeHumanStatement = this.firstSecondPersonManager.formatHumanInput(hiddenHumanConversationInsentiveStatement);
		var contextFreeAiStatement = this.talkToContextFree(contextFreeHumanStatement);
		output += '<br />' + this.firstSecondPersonManager.formatAiOutput(contextFreeAiStatement);
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
			this.conversationManager.isStarted = true;
			return 'type stop to end conversation';
		}
		else if (wordList[0] == 'stop')
		{
			this.conversationManager.isStarted = false;
			return 'ok';
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
			return 'You may tell me why or talk about something else';
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
			{
				return proof;
			}
			else
			{
				if (this.flattenizer.testConnection(subject, verb, complement))
					return this.someoneToldMe;
				else
					return this.notThatIKnow;
			}
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
	var objectionStatement = null;
	var wasPositive = this.flattenizer.testConnection(subject, verb, complement);
	
	if (!wasPositive && isPositive && !isQuestion && subject == complement && (verb == this.instinct.isa || verb == this.instinct.someare || verb == this.instinct.madeof || verb == this.instinct.partof))
		return "this is tautologic";
	
	if (isPositive != wasPositive && !isQuestion)
	{
		if (isPositive)
		{
			objectionStatement = this.objectionFinder.findObjection(subject, verb, complement);
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
		else if (objectionStatement != null)
			return '<span class="AiConcept">Me</span> <span class="AiOperator">disagree</span> because I\'ve been told <span class="AiConcept">' + objectionStatement.subject + '</span> <span class="AiOperator">' + objectionStatement.verb + '</span> <span class="AiConcept">' + objectionStatement.complement + '</span>';
		else
			return this.notThatIKnow;
	}
}

//(String (HTML))
TalkingRouter.prototype.talkToWhyStatement = function TalkingRouter_talkToWhyStatement(subject, verb, complement)
{
	var proof = this.proofManager.viewProof(subject, verb, complement);
	if (proof)
		return proof;
		
	var objectionStatement = this.objectionFinder.findObjection(subject, verb, complement);
	
	if (objectionStatement == null)
		return null;
	
	proof = this.proofManager.viewProof(objectionStatement.subject, objectionStatement.verb, objectionStatement.complement, 0);
	
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

//(String (HTML))
TalkingRouter.prototype.talkToTalkAbout = function TalkingRouter_talkToTalkAbout(subject)
{
	var randomBehavior = Math.floor(Math.random() * 3);
	if (randomBehavior == 0)
		return this.talkToAskAbout(subject);
	else if (randomBehavior == 1)
		return this.talkToTeachAbout(subject);
	else if (randomBehavior == 2)
		return this.talkToThinkAbout(subject);
}

//(String (HTML))
TalkingRouter.prototype.talkToAskAbout = function TalkingRouter_talkToAskAbout(subject)
{
	var whatisDefinition = this.whatisViewer.viewDefinition(subject);
	var question = this.askViewer.askAbout(subject);
	return whatisDefinition + '<br />' + question;
}

//(String (HTML))
TalkingRouter.prototype.talkToTalk = function TalkingRouter_talkToTalk()
{
	var randomBehavior = Math.floor(Math.random() * 3);
	if (randomBehavior == 0)
		return this.talkToAsk();
	else if (randomBehavior == 1)
		return this.talkToTeach();
	else if (randomBehavior == 2)
		return this.talkToThink();
}

//(String (HTML))
TalkingRouter.prototype.talkToAsk = function TalkingRouter_talkToAsk()
{
	var subject = this.askViewer.getRandomSubject();
	if (subject == null)
		return 'Please teach me at least one thing first';	
	var whatisDefinition = this.whatisViewer.viewDefinition(subject);
	var question = this.askViewer.askAbout(subject);
	return whatisDefinition + '<br />' + question;
}

//(String (HTML))
TalkingRouter.prototype.talkToThinkAbout = function TalkingRouter_talkToThinkAbout(subject)
{
	var theory = this.thinker.getTheoryAbout(subject);
	if (theory != null)
	{
		this.latestTheory = theory;
		return theory.toString();
	}
	else
		return 'Please teach me more first';
}

//(String (HTML))
TalkingRouter.prototype.talkToThink = function TalkingRouter_talkToThink()
{
	var theory = this.thinker.getTheory();
	if (theory != null)
	{
		this.latestTheory = theory;
		return theory.toString();
	}
	else
		return 'Please teach me more first';
}

//(String (HTML))
TalkingRouter.prototype.talkToRename = function TalkingRouter_talkToRename(conceptName1, conceptName2)
{
	try
	{
		this.conceptNameMapper.rename(conceptName1, conceptName2, this.flattenizer, this.objectionFinder);
		this.invalidator.invalidateAll();
		return 'Alright, <span class="AiConcept">' + conceptName1 + '</span> is now named <span class="AiConcept">' + conceptName2 + '</span>';
	}
	catch (exception) //If rename cannot be done because of a logical objection statement
	{
		return exception;
	}
}

//(String (HTML))
TalkingRouter.prototype.talkToAlias = function TalkingRouter_talkToAlias(conceptName1, conceptName2)
{
	try
	{
		this.conceptNameMapper.alias(conceptName1, conceptName2, this.flattenizer, this.objectionFinder);
		this.invalidator.invalidateAll();
		return 'Alright, <span class="AiConcept">' + conceptName1 + '</span> is now the same thing as <span class="AiConcept">' + conceptName2 + '</span>';
	}
	catch (exception) //If aliasing cannot be done because of a logical objection statement
	{
		return exception;
	}
}

//(String (HTML))
TalkingRouter.prototype.talkToUnAlias = function TalkingRouter_talkToAlias(conceptName1, conceptName2)
{
	this.conceptNameMapper.unAlias(conceptName1, conceptName2, this.flattenizer, this.objectionFinder);
	this.invalidator.invalidateAll();
	return 'Alright, <span class="AiConcept">' + conceptName1 + '</span> is not the same thing as <span class="AiConcept">' + conceptName2 + '</span> anymore';
}

//(String (HTML))
TalkingRouter.prototype.talkToYes = function TalkingRouter_talkToYes()
{
	if (this.latestTheory == null)
	{
		return 'Yes to what?';
	}
	else
	{
		var theory = this.latestTheory;
		this.latestTheory = null;
		return this.talkToStatement(theory.subject, theory.verb, theory.complement, true, false);
	}
}