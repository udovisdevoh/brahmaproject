//Evaluates totological and non-totological propositions
function Evaluator(instinct, conceptNameMapper, totologyManager, complementaryOperatorManager, evaluationCache)
{
	//Constants
	
	//True result
	this.resultTrue = 1;
	
	//False result
	this.resultFalse = -1;
	
	//Unknown result
	this.resultUnknown = 0;
	
	//Result being currently evaluated
	this.resultBeingCurrentlyEvaluated = -3;
	
	//Result not being currently evaluated
	this.resultNotBeingCurrentlyEvaluated = -4;
	
	
	//Parts
	
	//(Instinct) Manages and renders metaOperator connections
	this.instinct = instinct;
	
	//(ConceptNameMapper) maps concept to names and names to concepts
	this.conceptNameMapper = conceptNameMapper;

	//(TotologyManager)
	//Represents a client side Ai's learning and unlearning system of totology
	//The AI will learn
	this.totologyManager = totologyManager;
	
	//(ComplementaryOperatorManager) Manages complementary operators
	this.complementaryOperatorManager = complementaryOperatorManager;
		
	//(EvaluationCache) Stores result of evaluation of propositions to improve performances of evaluation
	this.evaluationCache = evaluationCache;
	
	//(EvaluationCache) Stores statements that are currently being evaluated
	this.circularReasoningPreventionMemory = new EvaluationCache();
	
	//(ProofCache) Stores proof for statements
	this.proofCache = new ProofCache();
}

//(Boolean) evaluate expression and return whether expression is true or false
Evaluator.prototype.evalString = function Evaluator_evalString(statementString)
{
	var boolResult;
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
		isPositive = true;
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
		isPositive = false;
	}
	
	if (isPositive)
		boolResult = this.eval(subject, verb, complement) == this.resultTrue;
	else
		boolResult = this.eval(subject, verb, complement) != this.resultTrue;
	
	return boolResult;
}

//(Boolean) evaluate expression and return whether expression is true or false
Evaluator.prototype.eval = function Evaluator_eval(subject, verb, complement)
{	
	this.circularReasoningPreventionMemory.setCachedResult(subject, verb, complement, this.resultBeingCurrentlyEvaluated);

	var resultFromEvaluationCache = this.evaluationCache.getCachedResult(subject, verb, complement, this.resultUnknown);
	
	if (resultFromEvaluationCache == this.resultUnknown)
	{
		resultFromEvaluationCache = this.render(subject, verb, complement);		
		this.evaluationCache.setCachedResult(subject, verb, complement, resultFromEvaluationCache);
	}
	
	this.circularReasoningPreventionMemory.setCachedResult(subject, verb, complement, this.resultNotBeingCurrentlyEvaluated);
	
	return resultFromEvaluationCache;
}

//(Array of Statement)
//Get proof for statement
Evaluator.prototype.getProof = function Evaluator_getProof(subject, verb, complement, isPositive)
{
	return this.proofCache.getProof(subject, verb, complement, isPositive);
}

//Constant as: Evaluator.resultTrue, Evaluator.resultFalse,
//Evaluator.resultUnknown
Evaluator.prototype.render = function Evaluator_render(subject, verb, complement)
{		
	//Render proposition from totology
	if (this.totologyManager.testConnection(subject, verb, complement))
	{
		return this.resultTrue;
	}
	
	//Render implicit proposition from complementary operators
	for (var index in verb.complementaryOperators)
	{
		var complementaryVerb = verb.complementaryOperators[index];
		
		if (this.circularReasoningPreventionMemory.getCachedResult(complement, complementaryVerb, subject, this.resultUnknown) != this.resultBeingCurrentlyEvaluated)
		{
			var complementaryResult = this.eval(complement, complementaryVerb, subject);
			if (complementaryResult == this.resultTrue || complementaryResult == this.resultFalse)
			{			
				this.proofCache.addProofArgument(subject, verb, complement, complement, complementaryVerb, subject, complementaryResult == this.resultTrue);
				return complementaryResult;
			}
		}
	}
	
	return this.instinct.render(this, subject, verb, complement);
}