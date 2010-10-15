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
	this.testFlattenizer();
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
	
	var pine = new Concept("pine");
	var isa = new Concept("isa");
	var tree = new Concept("tree");
	
	evaluationCache.setCachedResult(pine, isa, true);
	
	if (!evaluationCache.getCachedResult(pine, isa))
	{
		throw 'Statement should be in the process of getting evaluated';
	}
	
	evaluationCache.setCachedResult(pine, isa, false);
	
	if (evaluationCache.getCachedResult(pine, isa))
	{
		throw "Statement shouldn't be in the process of getting evaluated";
	}
}

//Test evaluator
UnitTest.prototype.testFlattenizer = function UnitTest_testFlattenizer()
{
	var conceptNameMapper = new ConceptNameMapper();
	var totologyManager = new TotologyManager(conceptNameMapper);
	var flattenizer = new Flattenizer(new Instinct(new ComplementaryOperatorManager(conceptNameMapper)));

	var forest = conceptNameMapper.getConcept("forest");
	var ecosystem = conceptNameMapper.getConcept("ecosystem");
	var earth = conceptNameMapper.getConcept("earth");
	var sun = conceptNameMapper.getConcept("sun");
	var fire = conceptNameMapper.getConcept("fire");
	var energy = conceptNameMapper.getConcept("energy");
	var gas = conceptNameMapper.getConcept("gas");
	var solar_system = conceptNameMapper.getConcept("solar_system");
	var milky_way = conceptNameMapper.getConcept("milky_way");
	var universe = conceptNameMapper.getConcept("universe");
	var multiverse = conceptNameMapper.getConcept("multiverse");
	var pine = conceptNameMapper.getConcept("pine");
	var tree = conceptNameMapper.getConcept("tree");
	var plant = conceptNameMapper.getConcept("plant");
	var lifeform = conceptNameMapper.getConcept("lifeform");
	var wood = conceptNameMapper.getConcept("wood");
	var carbon = conceptNameMapper.getConcept("carbon");
	var atom = conceptNameMapper.getConcept("atom");
	var matter = conceptNameMapper.getConcept("matter");
	var celestial_body = conceptNameMapper.getConcept("celestial_body");
	var rain = conceptNameMapper.getConcept("rain");
	var cloud = conceptNameMapper.getConcept("cloud");
	var joe = conceptNameMapper.getConcept("joe");
	var planet = conceptNameMapper.getConcept("planet");
	var star = conceptNameMapper.getConcept("star");
	var human = conceptNameMapper.getConcept("human");
	var water = conceptNameMapper.getConcept("water");
	var man = conceptNameMapper.getConcept("man");
	var woman = conceptNameMapper.getConcept("woman");
	var state_of_affair = conceptNameMapper.getConcept("state_of_affair");
	var isa = conceptNameMapper.getConcept("isa");
	var someare = conceptNameMapper.getConcept("someare");
	var madeof = conceptNameMapper.getConcept("madeof");
	var partof = conceptNameMapper.getConcept("partof");
	var contradict = conceptNameMapper.getConcept("contradict");
		
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
	totologyManager.learnStatement("wood madeof carbon");
	totologyManager.learnStatement("matter madeof energy");
	totologyManager.learnStatement("rain partof state_of_affair");	
	totologyManager.learnStatement("joe isa man");
	totologyManager.learnStatement("joe partof state_of_affair");
	totologyManager.learnStatement("carbon isa atom");
	totologyManager.learnStatement("atom madeof matter");
	totologyManager.learnStatement("forest madeof tree");
	totologyManager.learnStatement("earth madeof forest");
	totologyManager.learnStatement("solar_system madeof earth");
	totologyManager.learnStatement("solar_system madeof sun");
	totologyManager.learnStatement("milky_way madeof solar_system");
	totologyManager.learnStatement("universe madeof milky_way");
	totologyManager.learnStatement("multiverse madeof universe");
	totologyManager.learnStatement("earth isa planet");
	totologyManager.learnStatement("star madeof fire");
	totologyManager.learnStatement("sun isa star");
	totologyManager.learnStatement("star madeof fire");
	totologyManager.learnStatement("star isa celestial_body");
	totologyManager.learnStatement("planet isa celestial_body");
	totologyManager.learnStatement("forest isa ecosystem");
	totologyManager.learnStatement("fire madeof energy");
	totologyManager.learnStatement("fire madeof gas");
	totologyManager.learnStatement("gas isa matter");
	
	//Test totology
	if (!totologyManager.testConnection(pine, isa, tree))
	{
		throw 'Statement should be true because we told so';
	}
	
	//Test complementary operators
	if (!flattenizer.testConnection(tree, someare, pine))
	{
		throw 'Statement should be true';
	}
	
	//Test complementary operators
	if (flattenizer.testConnection(tree, isa, pine))
	{
		throw 'Statement should be false';
	}

	//Test self recursive operator on depth 1
	if (!flattenizer.testConnection(tree, madeof, carbon))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(forest, madeof, wood))
	{
		throw 'Statement should be true';
	}
	
	//Test self recursive operator on depth 2
	if (!flattenizer.testConnection(forest, madeof, carbon))
	{
		throw 'Statement should be true';
	}
	
	//Test self recursive operator on depth 3
	if (!flattenizer.testConnection(earth, madeof, carbon))
	{
		throw 'Statement should be true';
	}
	
	//Test self recursive operator on depth 4
	if (!flattenizer.testConnection(solar_system, madeof, carbon))
	{
		throw 'Statement should be true';
	}
	
	//Test self recursive operator on depth 5
	if (!flattenizer.testConnection(milky_way, madeof, carbon))
	{
		throw 'Statement should be true';
	}
	
	//Test self recursive operator on depth 6
	if (!flattenizer.testConnection(universe, madeof, carbon))
	{
		throw 'Statement should be true';
	}
	
	//Test self recursive operator on depth 7
	if (!flattenizer.testConnection(multiverse, madeof, carbon))
	{
		throw 'Statement should be true';
	}
	
	//Test self recursive operator's proof
	if (!flattenizer.getProof(multiverse, madeof, carbon, true)[0].equals(new Statement(multiverse, madeof, universe, true)))
		throw 'Wrong proof';
	if (!flattenizer.getProof(multiverse, madeof, carbon, true)[1].equals(new Statement(universe, madeof, carbon, true)))
		throw 'Wrong proof';
		
	//Test self recursive operator on depth 1
	if (!flattenizer.testConnection(pine, isa, plant))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(lifeform, madeof, water))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(pine, isa, lifeform))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(tree, madeof, matter))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(pine, madeof, matter))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(pine, madeof, wood))
	{
		throw 'Statement should be true';
	}
	
	//Test self recursive operator's proof
	if (!flattenizer.getProof(pine, madeof, wood, true)[0].equals(new Statement(pine, isa, tree, true)))
		throw 'Wrong proof';
	if (!flattenizer.getProof(pine, madeof, wood, true)[1].equals(new Statement(tree, madeof, wood, true)))
		throw 'Wrong proof';
	
	if (!flattenizer.testConnection(sun, isa, celestial_body))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(sun, isa, planet))
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(earth, madeof, plant))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(planet, madeof, plant))
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(solar_system, madeof, plant))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(tree, partof, ecosystem))//some ecosystems have no tree
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(tree, partof, earth))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(tree, partof, planet))//some planets have no tree
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(milky_way, madeof, star))
	{
		throw 'Statement should be true';
	}
	
	//Test recursive partof
	if (!flattenizer.testConnection(earth, partof, universe))
	{
		throw 'Statement should be true';
	}
	
	//Test recursive someare
	if (!flattenizer.testConnection(earth, isa, planet))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(planet, isa, celestial_body))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(earth, isa, celestial_body))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(celestial_body, someare, earth))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(tree, partof, universe))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(sun, madeof, matter))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(gas, partof, star))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(gas, partof, sun))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(matter, partof, sun))
	{
		throw 'Statement should be true';
	}
	
	alert('Add more unit tests');
	//Thinker: do stuff like: if all galaxies contain stuff that are isa star, then maybe galaxies all contain stars
	
	/*if (!evaluator.evalString("tree madeof wood"))
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
		throw 'Statement should be true';*/
}