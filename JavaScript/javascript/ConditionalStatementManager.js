//Manages conditional statementsfunction ConditionalStatementManager(conceptNameMapper, conditionalStatementMemory){		//(ConditionalStatementParser) Parses conditional statements (from string to conditional statement objects)	this.conditionalStatementParser = new ConditionalStatementParser(conceptNameMapper);		//(ConditionalStatementMemory) Stores and retrieves conditional statement	this.conditionalStatementMemory = conditionalStatementMemory;}//Learn conditional statement from stringConditionalStatementManager.prototype.learnStatement = function ConditionalStatementManager_learnStatement(stringStatement){	var conditionalStatement = this.conditionalStatementParser.parse(stringStatement);	if (!conditionalStatementMemory.contains(conditionalStatement))	{		return conditionalStatementMemory.add(conditionalStatement);	}}//Whether conditional statement exist in memory or notConditionalStatementManager.prototype.testStatement = function ConditionalStatementManager_testStatement(stringStatement){	var conditionalStatement = this.conditionalStatementParser.parse(stringStatement);	return conditionalStatementMemory.contains(conditionalStatement);}