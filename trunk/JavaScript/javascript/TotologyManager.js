//Represents a client side Ai's learning and unlearning system of totology
//The AI will learn
function TotologyManager(conceptNameMapper)
{
	//Maps names to concepts
	this.conceptNameMapper = conceptNameMapper;
	
	//ConnectionManager
	this.connectionManager = new ConnectionManager();
}

//Tell statement to AI (negative or positive)
TotologyManager.prototype.learnStatement = function TotologyManager_learnStatement(statementString)
{
	if (statementString == null)
	{
		throw "Statement must not be null";
	}

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
		this.connectionManager.addConnection(subject, verb, complement);
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
		this.connectionManager.removeConnection(subject, verb, complement);
	}
}

//Tell statement to AI (negative or positive)
TotologyManager.prototype.testStatement = function TotologyManager_testStatement(statementString)
{
	if (statementString == null)
	{
		throw "Statement must not be null";
	}

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
		
		return this.connectionManager.testConnection(subject, verb, complement);
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
		return !this.connectionManager.testConnection(subject, verb, complement);
	}
}