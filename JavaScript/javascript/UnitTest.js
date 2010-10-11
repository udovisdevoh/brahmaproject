function UnitTest()
{
}

//Test all
UnitTest.prototype.testAll = function UnitTest_testAll()
{
	this.testConceptNameMapper();
	this.testTotologyManager();
	this.testTotologyManagerPart2();
	this.testComplementaryOperatorManager();
	this.testEvaluationCache();
	this.testEvaluator();
	alert("Unit tests completed.");
}

//Test concept name mapper
UnitTest.prototype.testConceptNameMapper = function UnitTest_testConceptNameMapper()
{
	var conceptNameMapper = new ConceptNameMapper();
	
	if (conceptNameMapper.getConcept("apple") != conceptNameMapper.getConcept("Apple"))
	{
		throw "Both concept should be equivalent";
	}
	
	if (conceptNameMapper.getConcept("apple") == conceptNameMapper.getConcept("orangle"))
	{
		throw "Both concept shouldn't be equivalent";
	}
	
	conceptNameMapper.alias("ciRcle", "rouNd");
	
	if (conceptNameMapper.getConcept("circle") != conceptNameMapper.getConcept("round"))
	{
		throw "Both concept should be equivalent";
	}
	
	conceptNameMapper.unAlias("ciRcle", "rouNd");
	
	if (conceptNameMapper.getConcept("circle") == conceptNameMapper.getConcept("round"))
	{
		throw "Both concept shouldn't be equivalent";
	}
}

//Test connection manager
UnitTest.prototype.testTotologyManager = function UnitTest_testTotologyManager()
{
	var conceptNameMapper = new ConceptNameMapper();
	var totologyManager = new TotologyManager(conceptNameMapper);
	
	var pine = conceptNameMapper.getConcept("pine");
	var tree = conceptNameMapper.getConcept("tree");
	var plant = conceptNameMapper.getConcept("plant");
	var animal = conceptNameMapper.getConcept("animal");
	
	var isa = conceptNameMapper.getConcept("isa");
	
	totologyManager.addConnection(pine, isa, tree);
	totologyManager.addConnection(tree, isa, plant);	
	
	if (totologyManager.testConnection(pine, isa, animal))
	{
		throw "Connection shouldn't exist";
	}
	if (!totologyManager.testConnection(pine, isa, tree))
	{
		throw "Connection should exist";
	}	
	if (!totologyManager.testConnection(tree, isa, plant))
	{
		throw "Connection should exist";
	}
	
	totologyManager.removeConnection(pine, isa, tree);
	
	if (totologyManager.testConnection(pine, isa, tree))
	{
		throw "Connection shouldn't exist";
	}
}

//Test Totology Manager
UnitTest.prototype.testTotologyManagerPart2 = function UnitTest_testTotologyManagerPart2()
{
	var totologyManager = new TotologyManager(new ConceptNameMapper());
	totologyManager.learnStatement("piNe iSa trEe");
	
	if (!totologyManager.testStatement("pinE IsA TrEe"))
	{
		throw "Statement should be true";
	}
	
	if (totologyManager.testStatement("pinE not IsA TrEe"))
	{
		throw "Statement should be false";
	}
	
	if (totologyManager.testStatement("pinE IsA AppLe"))
	{
		throw "Statement should be false";
	}
	
	if (!totologyManager.testStatement("pinE nOt IsA AppLe"))
	{
		throw "Statement should be true";
	}
	
	totologyManager.learnStatement("piNe NOt iSa trEe");
	
	if (!totologyManager.testStatement("pinE noT IsA TrEe"))
	{
		throw "Statement should be true";
	}

	if (totologyManager.testStatement("pinE IsA TrEe"))
	{
		throw "Statement should be false";
	}
	
	totologyManager.learnStatement("piNe NOt iSa pIE");
	
	if (!totologyManager.testStatement("pinE noT IsA Pie"))
	{
		throw "Statement should be true";
	}
		
	if (totologyManager.testStatement("pinE IsA Pie"))
	{
		throw "Statement should be false";
	}
}

//Test Complementary Operation Manager
UnitTest.prototype.testComplementaryOperatorManager = function UnitTest_testComplementaryOperatorManager()
{
	var complementaryOperatorManager = new ComplementaryOperatorManager(new ConceptNameMapper());
	complementaryOperatorManager.add("iSA","someaRe");
	
	if (!complementaryOperatorManager.test("iSA","someaRe"))
	{
		throw "Operators should be complementary";
	}
	
	if (!complementaryOperatorManager.test("SomeaRe","isA"))
	{
		throw "Operators should be complementary";
	}
	
	if (complementaryOperatorManager.test("SomeaRe","madEoF"))
	{
		throw "Operators shouldn't be complementary";
	}
	
	complementaryOperatorManager.remove("iSA","someaRe");
	
	if (complementaryOperatorManager.test("iSA","someaRe"))
	{
		throw "Operators shouldn't be complementary";
	}
	
	complementaryOperatorManager.add("contRadict","contradicT");
	
	if (!complementaryOperatorManager.test("ContRadict","coNtRadict"))
	{
		throw "Operators should be complementary";
	}
	
	complementaryOperatorManager.remove("ContRadicT","ContRAdict");
	
	if (complementaryOperatorManager.test("ContRadict","coNtRadict"))
	{
		throw "Operators shouldn't be complementary";
	}
}

//Test evaluation cache
UnitTest.prototype.testEvaluationCache = function UnitTest_testEvaluationCache()
{
	var conceptNameMapper = new ConceptNameMapper();
	var complementaryOperatorManager = new ComplementaryOperatorManager(conceptNameMapper);
	var evaluationCache = new EvaluationCache();
	var totologyManager = new TotologyManager(conceptNameMapper);
	var instinct = new Instinct(complementaryOperatorManager);
	var evaluator = new Evaluator(instinct, conceptNameMapper, totologyManager, complementaryOperatorManager, evaluationCache);	
	
	var pine = new Concept("pine");
	var isa = new Concept("isa");
	var tree = new Concept("tree");
	
	evaluationCache.setCachedResult(pine, isa, tree, evaluator.resultBeingCurrentlyEvaluated);
	
	if (evaluationCache.getCachedResult(pine, isa, tree, evaluator.resultUnknown) != evaluator.resultBeingCurrentlyEvaluated)
	{
		throw 'Statement should be in the process of getting evaluated';
	}
	
	evaluationCache.setCachedResult(pine, isa, tree, evaluator.resultNotBeingCurrentlyEvaluated);
	
	if (evaluationCache.getCachedResult(pine, isa, tree, evaluator.resultUnknown) == evaluator.resultBeingCurrentlyEvaluated)
	{
		throw "Statement shouldn't be in the process of getting evaluated";
	}
}

//Test evaluator
UnitTest.prototype.testEvaluator = function UnitTest_testEvaluator()
{
	var conceptNameMapper = new ConceptNameMapper();
	var complementaryOperatorManager = new ComplementaryOperatorManager(conceptNameMapper);
	var evaluationCache = new EvaluationCache();
	var totologyManager = new TotologyManager(conceptNameMapper);
	var instinct = new Instinct(complementaryOperatorManager);
	var evaluator = new Evaluator(instinct, conceptNameMapper, totologyManager, complementaryOperatorManager, evaluationCache);
	
	var pine = conceptNameMapper.getConcept("pine");
	var tree = conceptNameMapper.getConcept("tree");
	var plant = conceptNameMapper.getConcept("plant");
	var wood = conceptNameMapper.getConcept("wood");
	var rain = conceptNameMapper.getConcept("rain");
	var cloud = conceptNameMapper.getConcept("cloud");
	var joe = conceptNameMapper.getConcept("joe");
	var human = conceptNameMapper.getConcept("human");
	var man = conceptNameMapper.getConcept("man");
	var woman = conceptNameMapper.getConcept("woman");
	var state_of_affair = conceptNameMapper.getConcept("state_of_affair");
	var isa = conceptNameMapper.getConcept("isa");
	var someare = conceptNameMapper.getConcept("someare");
	var madeof = conceptNameMapper.getConcept("madeof");
	var partof = conceptNameMapper.getConcept("partof");
	var contradict = conceptNameMapper.getConcept("contradict");
	
	complementaryOperatorManager.add("isa","someare");
	complementaryOperatorManager.add("madeof","partof");
	complementaryOperatorManager.add("contradict","contradict");
	complementaryOperatorManager.add("need","allow");
	complementaryOperatorManager.add("make","madeby");
	
	totologyManager.learnStatement("pine isa tree");
	totologyManager.learnStatement("tree isa plant");
	totologyManager.learnStatement("plant contradict animal");
	totologyManager.learnStatement("human isa animal");
	totologyManager.learnStatement("animal isa lifeform");
	totologyManager.learnStatement("plant isa lifeform");
	totologyManager.learnStatement("lifeform madeof water");
	totologyManager.learnStatement("water isa liquid");
	totologyManager.learnStatement("tree madeof wood");
	totologyManager.learnStatement("wood isa matter");
	totologyManager.learnStatement("matter madeof energy");
	totologyManager.learnStatement("rain partof state_of_affair");	
	totologyManager.learnStatement("joe isa man");
	totologyManager.learnStatement("joe partof state_of_affair");
	
	//Test complementary operators
	if (!evaluator.evalString("pine isa tree"))
		throw 'Statement should be true';
			
	if (evaluator.evalString("pine not isa tree"))
		throw 'Statement should be false';
	
	if (!evaluator.evalString("tree someare pine"))
		throw 'Statement should be true';
	
	if (evaluator.evalString("tree not someare pine"))
		throw 'Statement should be false';
		
	if (evaluator.evalString("tree isa pine"))
		throw 'Statement should be false';
		
	if (!evaluator.evalString("tree not isa pine"))
		throw 'Statement should be true';
		
	if (!evaluator.evalString("tree madeof wood"))
		throw 'Statement should be true';
		
	if (!evaluator.evalString("wood partof tree"))
		throw 'Statement should be true';
	
	
	//Test complementary proposition's proofs
	if (!evaluator.getProof(tree, someare, pine, true)[0].equals(new Statement(pine, isa, tree, true)))
		throw 'Wrong proof';


	//Test implicit connection rendering with anonymous concepts
	if (!evaluator.evalString("pine isa plant"))
		throw 'Statement should be true';
		
	if (!evaluator.evalString("pine madeof water"))
		throw 'Statement should be true';
		
	if (!evaluator.evalString("pine madeof wood"))
		throw 'Statement should be true';
		
	if (!evaluator.evalString("pine madeof matter"))
		throw 'Statement should be true';
		
	if (!evaluator.evalString("pine madeof energy"))
		throw 'Statement should be true';
	
	if (!evaluator.evalString("energy partof pine"))
		throw 'Statement should be true';
}