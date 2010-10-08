//Evaluates totological and non-totological propositions
function Evaluator(conceptNameMapper, totologyManager, conditionalStatementManager, complementaryOperatorManager, evaluationCache)
{
	//Constants
	
	//True result
	this.resultTrue = 1;
	
	//False result
	this.resultFalse = -1;
	
	//Unknown result
	this.resultUnknown = 0;
	
	//Unknown result
	this.resultNotInCache = -2;

	
	
	//Parts
	
	//(ConceptNameMapper) maps concept to names and names to concepts
	this.conceptNameMapper = conceptNameMapper;

	//(TotologyManager)
	//Represents a client side Ai's learning and unlearning system of totology
	//The AI will learn
	this.totologyManager = totologyManager;
	
	//(ConditionalStatementManager) Manages conditional statements
	this.conditionalStatementManager = conditionalStatementManager;
	
	//(ComplementaryOperatorManager) Manages complementary operators
	this.complementaryOperatorManager = complementaryOperatorManager;
	
	//(EvaluationCache) Stores result of evaluation of propositions to improve performances of evaluation
	this.evaluationCache = evaluationCache;
}

//(Boolean) evaluate expression and return whether expression is true or false
Evaluator.prototype.evalString = function Evaluator_evalString(statementString)
{
	var isPositive;
	if (statementString == null)
	{
		throw "Statement must not be null";
	}
	
	statementString = statementString.hardTrim();
	
	var wordList = statementString.split(' ');
	
	if (wordList.length < 3)
	{
		throw 'I can only parse in the form: "subject verb complement" or "subject not verb complement"';
	}
	
	var subject, verb, complement;
	
	if (wordList[1].toLowerCase() != "not")
	{
		subject = this.conceptNameMapper.getConcept(wordList[0]);
		verb = this.conceptNameMapper.getConcept(wordList[1]);
		complement = this.conceptNameMapper.getConcept(wordList[2]);
		isPositive = false;
	}
	else
	{
		if (wordList.length < 4)
		{
			throw 'I can only parse negations in the form: "subject not verb complement"';
		}
	
		subject = this.conceptNameMapper.getConcept(wordList[0]);
		verb = this.conceptNameMapper.getConcept(wordList[2]);
		complement = this.conceptNameMapper.getConcept(wordList[3]);
		isPositive = true;
	}
	
	if (isPositive)
		return this.eval(subject, verb, complement) == this.resultTrue;
	else
		return this.eval(subject, verb, complement) == this.resultFalse;
}

//(Boolean) evaluate expression and return whether expression is true or false
Evaluator.prototype.eval = function Evaluator_eval(subject, verb, complement)
{
	var resultFromEvaluationCache = this.evaluationCache.getCachedResult(subject, verb, complement);
	
	if (resultFromEvaluationCache == this.resultNotInCache)
	{
		resultFromEvaluationCache = this.render(subject, verb, complement);
		this.evaluationCache.setCachedResult(subject, verb, complement, resultFromEvaluationCache);
	}
	
	return resultFromEvaluationCache;
}