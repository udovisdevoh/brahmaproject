//Parses conditional statements
function ConditionalStatementParser(conceptNameMapper)
{
	//(ConceptNameMapper) concept name mapper
	this.conceptNameMapper = conceptNameMapper;
}

//Convert string to conditional statement object
ConditionalStatementParser.prototype.parse = function ConditionalStatementParser_parse(stringStatement)
{
	stringStatement = stringStatement.hardTrim();
	if (stringStatement.startsWith("not "))
	{
		stringStatement = stringStatement.substring(4);
	}
	
	throw 'Implement ConditionalStatementParser.parse()';
}