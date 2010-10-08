//Parses conditional statements
function ConditionalStatementParser(conceptNameMapper)
{
	//(ConceptNameMapper) concept name mapper
	this.conceptNameMapper = conceptNameMapper;
	
	//(BoolLogicSplitter) splits expression into smaller ones by taking "and" or "or" as the operator
	//creates boolean logic binary trees
	this.boolLogicSplitter = new BoolLogicSplitter();
	
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
	
	var stringCondition = stringStatement.match(this.regExpCondition)[0].substr(2).trim();
	var stringEffect = stringStatement.match(this.regExpEffect)[0].substr(4).trim();
	
	this.anonymousConceptDictionary = this.buildAnonymousConceptDictionary(stringStatement);

	var effect = this.parseStatement(stringEffect, this.anonymousConceptDictionary);
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
		var word = String(wordList[wordIndex]);

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

//(Condition) Parse condition as String
ConditionalStatementParser.prototype.parseCondition = function ConditionalStatementParser_parseCondition(stringCondition, anonymousConceptDictionary)
{
	var wordList = stringCondition.split(' ');
	
	if (wordList.length <= 4)
	{
		//There is only one statement in condition
		stringCondition = stringCondition.replace("(","");
		stringCondition = stringCondition.replace(")","");
		return new Condition(this.parseStatement(stringCondition));
	}
	else
	{
		//There are sub conditions
		
		var conditionInfo = this.boolLogicSplitter.split(stringCondition);
		var stringCondition1 = conditionInfo[0];
		var stringOperator = conditionInfo[1];
		var stringCondition2 = conditionInfo[2];

		var condition1 = this.parseCondition(stringCondition1, anonymousConceptDictionary);
		var operator = (stringOperator == "and");
		var condition2 = this.parseCondition(stringCondition2, anonymousConceptDictionary);
		
		return new Condition(condition1, operator, condition2);
	}
}

//(Statement) Parse effect as string and return statement
ConditionalStatementParser.prototype.parseStatement = function ConditionalStatementParser_parseStatement(stringStatement, anonymousConceptDictionary)
{
	if (stringStatement.charAt("0") == '(')
		stringStatement = stringStatement.substr(1);
	if (stringStatement.charAt(stringStatement.length - 1) == ')')
		stringStatement = stringStatement.substr(0,stringStatement.length - 1);
	
	var wordList = stringStatement.split(' ');
	
	var subject, verb, complement, isPositive;
	
	if (wordList.length < 3)
	{
		throw 'Cannot parse statement, bad word count';
	}
	
	if (wordList[1].toLowerCase() != "not")
	{		
		subject = this.getConceptOrAnonymousConcept(this.conceptNameMapper, this.anonymousConceptDictionary, wordList[0]);
		verb = this.getConceptOrAnonymousConcept(this.conceptNameMapper, this.anonymousConceptDictionary, wordList[1]);
		complement = this.getConceptOrAnonymousConcept(this.conceptNameMapper, this.anonymousConceptDictionary, wordList[2]);
		isPositive = true;
	}
	else
	{
		if (wordList.length < 4)
		{
			throw 'Cannot parse statement, bad word count';
		}	
		subject = this.getConceptOrAnonymousConcept(this.conceptNameMapper, this.anonymousConceptDictionary, wordList[0]);
		verb = this.getConceptOrAnonymousConcept(this.conceptNameMapper, this.anonymousConceptDictionary, wordList[2]);
		complement = this.getConceptOrAnonymousConcept(this.conceptNameMapper, this.anonymousConceptDictionary, wordList[3]);
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