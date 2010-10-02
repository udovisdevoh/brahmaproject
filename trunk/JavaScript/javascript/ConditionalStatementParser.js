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
	
	//this.anonymousConceptDictionary = this.buildAnonymousConceptDictionary(stringStatement);

	var condition = this.parseCondition(stringCondition);
	var effect = this.parseEffect(stringEffect);
	
	var conditionalStatement = new ConditionalStatement(condition, effect);
	
	return conditionalStatement;
}