//Represent a client-side left brain
function LeftBrain()
{
	//Constants
	this.helpLinkString = 'Unrecognized statement, use <a href="./help.php" target="_blank">help</a>';
	
	//Members
	this.conceptNameMapper = new ConceptNameMapper();
	this.tautologyManager = new TautologyManager(this.conceptNameMapper);
	this.complementaryOperatorManager = new ComplementaryOperatorManager(this.conceptNameMapper)
	this.instinct = new Instinct(this.complementaryOperatorManager);
	this.flattenizer = new Flattenizer(this.instinct);
}

//(String (HTML)) Talk to left brain
//This is the main router of the left brain
LeftBrain.prototype.talkTo = function LeftBrain_talkTo(statementString)
{
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
		return this.talkToStatement(subject, verb, complement, isPositive);
	}
	else
	{
		return this.helpLinkString;
	}
}