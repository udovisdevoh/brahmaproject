//Represents a concept (subject, verb or complement)
function TautologyManager(conceptNameMapper)
{
	//(ConceptNameMapper) Maps names to concepts
	this.conceptNameMapper = conceptNameMapper;
}

//Tell statement to AI (negative or positive)
TautologyManager.prototype.learnStatement = function TautologyManager_learnStatement(statementString)
{
	if (statementString == null)
	{
		throw "Statement must not be null";
	}
	
	statementString = statementString.hardTrim();
	
	var wordList = statementString.split(' ');
	
	if (wordList.length < 3)
	{
		throw 'I can only learn in the form: "subject verb complement" or "subject not verb complement"';
	}
	
	var subject, verb, complement;
	
	if (wordList[1].toLowerCase() != "not")
	{
		subject = this.conceptNameMapper.getConcept(wordList[0]);
		verb = this.conceptNameMapper.getConcept(wordList[1]);
		complement = this.conceptNameMapper.getConcept(wordList[2]);
		this.addConnection(subject, verb, complement);
		for (var index1 in verb.complementaryOperators)
		{
			var complementaryVerb = verb.complementaryOperators[index1];
			if (complementaryVerb instanceof Concept)
			{
				this.addConnection(complement, complementaryVerb, subject);	
			}
		}
	}
	else
	{
		if (wordList.length < 4)
		{
			throw 'I can only learn negations in the form: "subject not verb complement"';
		}
	
		subject = this.conceptNameMapper.getConcept(wordList[0]);
		verb = this.conceptNameMapper.getConcept(wordList[2]);
		complement = this.conceptNameMapper.getConcept(wordList[3]);
		this.removeConnection(subject, verb, complement);
		for (var index1 in verb.complementaryOperators)
		{
			var complementaryVerb = verb.complementaryOperators[index1];
			if (complementaryVerb instanceof Concept)
			{
				this.removeConnection(complement, complementaryVerb, subject);	
			}
		}
	}
}

//Tell statement to AI (negative or positive)
TautologyManager.prototype.testStatement = function TautologyManager_testStatement(statementString)
{
	if (statementString == null)
	{
		throw "Statement must not be null";
	}

	statementString = statementString.hardTrim();
	
	var wordList = statementString.split(' ');
	
	if (wordList.length < 3)
	{
		throw 'I can only learn in the form: "subject verb complement" or "subject not verb complement"';
	}
	
	var subject, verb, complement;
	
	if (wordList[1].toLowerCase() != "not")
	{
		subject = this.conceptNameMapper.getConcept(wordList[0]);
		verb = this.conceptNameMapper.getConcept(wordList[1]);
		complement = this.conceptNameMapper.getConcept(wordList[2]);
		
		return this.testConnection(subject, verb, complement);
	}
	else
	{
		if (wordList.length < 4)
		{
			throw 'I can only learn negations in the form: "subject not verb complement"';
		}
	
		subject = this.conceptNameMapper.getConcept(wordList[0]);
		verb = this.conceptNameMapper.getConcept(wordList[2]);
		complement = this.conceptNameMapper.getConcept(wordList[3]);
		return !this.testConnection(subject, verb, complement);
	}
}

//Add a connection from subject through verb to complement
TautologyManager.prototype.addConnection = function TautologyManager_addConnection(subject, verb, complement)
{
	var verbBranch;
	if (subject.tautologyConnections.hasItem(verb))
	{
		verbBranch = subject.tautologyConnections.getItem(verb);
	}
	else
	{
		verbBranch = new VerbBranch();
		subject.tautologyConnections.setItem(verb, verbBranch);
	}
	
	verbBranch.addComplement(complement);
}

//Remove a connection from subject through verb to complement
TautologyManager.prototype.removeConnection = function TautologyManager_removeConnection(subject, verb, complement)
{
	var verbBranch;
	if (subject.tautologyConnections.hasItem(verb))
	{
		verbBranch = subject.tautologyConnections.getItem(verb);
	}
	else
	{
		verbBranch = new VerbBranch();
		subject.tautologyConnections.setItem(verb, verbBranch);
	}
	
	verbBranch.removeComplement(complement);
}

//Add a connection from subject through verb to complement
TautologyManager.prototype.testConnection = function TautologyManager_testConnection(subject, verb, complement)
{
	var verbBranch;
	if (subject.tautologyConnections.hasItem(verb))
	{
		verbBranch = subject.tautologyConnections.getItem(verb);
	}
	else
	{
		verbBranch = new VerbBranch();
		subject.tautologyConnections.setItem(verb, verbBranch);
	}
	
	return verbBranch.hasComplement(complement);
}