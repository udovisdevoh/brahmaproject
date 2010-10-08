//Evaluates totological and non-totological propositions
function Evaluator(totologyManager, conditionalStatementManager, complementaryOperatorManager, evaluationCache)
{
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