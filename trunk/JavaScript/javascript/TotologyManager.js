//Represents a concept (subject, verb or complement)
function TotologyManager(conceptNameMapper)
{
	//(ConceptNameMapper) Maps names to concepts
	this.conceptNameMapper = conceptNameMapper;
}

//Tell statement to AI (negative or positive)
TotologyManager.prototype.learnStatement = function TotologyManager_learnStatement(statementString)
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
			this.addConnection(complement, complementaryVerb, subject);	
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
			this.removeConnection(complement, complementaryVerb, subject);	
		}
	}
}

//Tell statement to AI (negative or positive)
TotologyManager.prototype.testStatement = function TotologyManager_testStatement(statementString)
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
TotologyManager.prototype.addConnection = function TotologyManager_addConnection(subject, verb, complement)
{
	var verbBranch;
	if (subject.totologyConnections.hasItem(verb))
	{
		verbBranch = subject.totologyConnections.getItem(verb);
	}
	else
	{
		verbBranch = new VerbBranch();
		subject.totologyConnections.setItem(verb, verbBranch);
	}
	
	verbBranch.addComplement(complement);
}

//Remove a connection from subject through verb to complement
TotologyManager.prototype.removeConnection = function TotologyManager_removeConnection(subject, verb, complement)
{
	var verbBranch;
	if (subject.totologyConnections.hasItem(verb))
	{
		verbBranch = subject.totologyConnections.getItem(verb);
	}
	else
	{
		verbBranch = new VerbBranch();
		subject.totologyConnections.setItem(verb, verbBranch);
	}
	
	verbBranch.removeComplement(complement);
}

//Add a connection from subject through verb to complement
TotologyManager.prototype.testConnection = function TotologyManager_testConnection(subject, verb, complement)
{
	var verbBranch;
	if (subject.totologyConnections.hasItem(verb))
	{
		verbBranch = subject.totologyConnections.getItem(verb);
	}
	else
	{
		verbBranch = new VerbBranch();
		subject.totologyConnections.setItem(verb, verbBranch);
	}
	
	return verbBranch.hasComplement(complement);
}