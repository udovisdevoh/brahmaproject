//Parses conditional statements
function ConditionalStatementParser(conceptNameMapper)
{
	//(ConceptNameMapper) concept name mapper
	this.conceptNameMapper = conceptNameMapper;
	
	//(String) Condition RegExp
	// for instance: if [pine isa tree and tree isa plant] then ...
	// matches what's between []
	this.regExpCondition = "(if).*(?=then)";
	
	//(String) Effect RegExp
	// for instance: if pine isa tree and tree isa plant then [plant isa lifeform]
	// matches what's between []
	this.regExpEffect = "(then).*";
	
	//Array of (AnonymousConcept)
	// key: concept name (in context)
	// value: anonymous concept
	this.anonymousConceptDictionary = Array();
}

//Convert string to conditional statement object
ConditionalStatementParser.prototype.parse = function ConditionalStatementParser_parse(stringStatement)
{
	stringStatement = stringStatement.hardTrim();
	if (stringStatement.startsWith("not "))
	{
		stringStatement = stringStatement.substring(4);
	}
	
	var stringCondition = stringStatement.match(this.regExpCondition)[0].substr(3).trim();
	var stringEffect = stringStatement.match(this.regExpEffect)[0].substr(5).trim();
	
	this.anonymousConceptDictionary = this.buildAnonymousConceptDictionary(stringStatement);

	var effect = this.parseEffect(stringEffect, this.anonymousConceptDictionary);
	var condition = this.parseCondition(stringCondition, this.anonymousConceptDictionary);
	
	var conditionalStatement = new ConditionalStatement(condition, effect);
	
	return conditionalStatement;
}

//Build anonymous concept dictionary
//Array of (AnonymousConcept)
// key: concept name (in context)
// value: anonymous concept
ConditionalStatementParser.prototype.buildAnonymousConceptDictionary = function ConditionalStatementParser_buildAnonymousConceptDictionary(stringStatement)
{
	this.anonymousConceptDictionary = [];
	
	var wordList = stringStatement.split(' ');
	var uniqueId = 0;
	for (var wordIndex in wordList)
	{
		var word = wordList[wordIndex];
		
		if (word.charAt(0) == '[' && word.charAt(word.length-1) == ']')
		{
			if (this.anonymousConceptDictionary[word] == null)
			{
				this.anonymousConceptDictionary[word] = new AnonymousConcept(uniqueId);
				uniqueId++;
			}
		}
	}
	
	return this.anonymousConceptDictionary;
}

//(Statement) Parse effect as string and return statement
ConditionalStatementParser.prototype.parseEffect = function ConditionalStatementParser_parseEffect(stringStatement, anonymousConceptDictionary)
{
	var wordList = stringStatement.split(' ');
	
	var subject, verb, complement, isPositive;
	
	if (wordList.length < 3)
	{
		throw 'Cannot parse statement, bad word count';
	}
	
	if (wordList[1].toLowerCase() != "not")
	{		
		subject = this.getConceptOrAnonymousConcept(this.conceptNameMapper, anonymousConceptDictionary, wordList[0]);
		verb = this.getConceptOrAnonymousConcept(this.conceptNameMapper, anonymousConceptDictionary, wordList[1]);
		complement = this.getConceptOrAnonymousConcept(this.conceptNameMapper, anonymousConceptDictionary, wordList[2]);
		isPositive = true;
	}
	else
	{
		if (wordList.length < 4)
		{
			throw 'Cannot parse statement, bad word count';
		}	
		subject = this.getConceptOrAnonymousConcept(this.conceptNameMapper, anonymousConceptDictionary, wordList[0]);
		verb = this.getConceptOrAnonymousConcept(this.conceptNameMapper, anonymousConceptDictionary, wordList[2]);
		complement = this.getConceptOrAnonymousConcept(this.conceptNameMapper, anonymousConceptDictionary, wordList[3]);
		isPositive = false;
	}

	var statement = new Statement(subject, verb, complement, isPositive);
	
	return statement;
}

//(Concept) or (AnonymousConcept)
ConditionalStatementParser.prototype.getConceptOrAnonymousConcept = function ConditionalStatementParser_getConceptOrAnonymousConcept(conceptNameMapper, anonymousConceptDictionary, word)
{
	var concept;
	if (anonymousConceptDictionary[word] != null)
	{
		concept = anonymousConceptDictionary[word];
	}
	else
	{
		concept = conceptNameMapper.getConcept(word);
	}
	return concept;
}