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
	var chemical_reaction = conceptNameMapper.getConcept("chemical_reaction");
	var cloud = conceptNameMapper.getConcept("cloud");
	var joe = conceptNameMapper.getConcept("joe");
	var planet = conceptNameMapper.getConcept("planet");
	var girl = conceptNameMapper.getConcept("girl");
	var star = conceptNameMapper.getConcept("star");
	var human = conceptNameMapper.getConcept("human");
	var male = conceptNameMapper.getConcept("male");
	var female = conceptNameMapper.getConcept("female");
	var water = conceptNameMapper.getConcept("water");
	var man = conceptNameMapper.getConcept("man");
	var woman = conceptNameMapper.getConcept("woman");
	var state_of_affair = conceptNameMapper.getConcept("state_of_affair");
	var isa = conceptNameMapper.getConcept("isa");
	var someare = conceptNameMapper.getConcept("someare");
	var madeof = conceptNameMapper.getConcept("madeof");
	var partof = conceptNameMapper.getConcept("partof");
	var banana = conceptNameMapper.getConcept("banana");
	var bird = conceptNameMapper.getConcept("bird");
	var parrot = conceptNameMapper.getConcept("parrot");
	var contradict = conceptNameMapper.getConcept("contradict");
	var need = conceptNameMapper.getConcept("need");
	var allow = conceptNameMapper.getConcept("allow");
	var make = conceptNameMapper.getConcept("make");
	var madeby = conceptNameMapper.getConcept("madeby");
	var animal = conceptNameMapper.getConcept("animal");
	var light = conceptNameMapper.getConcept("light");
	var billy = conceptNameMapper.getConcept("billy");
	var black_man = conceptNameMapper.getConcept("black_man");
	var jazz = conceptNameMapper.getConcept("jazz");
	var music = conceptNameMapper.getConcept("music");
	var polka = conceptNameMapper.getConcept("polka");
	var dance = conceptNameMapper.getConcept("dance");
	var art = conceptNameMapper.getConcept("art");
	var painting = conceptNameMapper.getConcept("painting");
		
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
	totologyManager.learnStatement("fire isa chemical_reaction");
	totologyManager.learnStatement("male contradict female");
	totologyManager.learnStatement("animal contradict vegetable");
	totologyManager.learnStatement("human isa animal");
	totologyManager.learnStatement("man isa human");
	totologyManager.learnStatement("woman isa human");
	totologyManager.learnStatement("man isa male");
	totologyManager.learnStatement("woman isa female");
	totologyManager.learnStatement("girl isa woman");
	totologyManager.learnStatement("banana isa vegetable");
	totologyManager.learnStatement("bird need tree");
	totologyManager.learnStatement("bird isa animal");
	totologyManager.learnStatement("parrot isa bird");
	totologyManager.learnStatement("plant need light");
	totologyManager.learnStatement("billy make jazz");
	totologyManager.learnStatement("jazz isa music");
	totologyManager.learnStatement("music isa art");
	totologyManager.learnStatement("painting isa art");
	totologyManager.learnStatement("billy isa black_man");
	totologyManager.learnStatement("polka isa music");
	totologyManager.learnStatement("music make dance");
	
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
	
	if (!flattenizer.testConnection(plant, partof, earth))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(plant, partof, planet))//Some planets have no plant
	{
		throw 'Statement should not be true';
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
	
	if (!flattenizer.testConnection(chemical_reaction, partof, star))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(chemical_reaction, partof, celestial_body))
	{
		throw 'Statement should be false';
	}
	
	//Testing contradict
	if (!flattenizer.testConnection(male, contradict, female))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(female, contradict, male))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(joe, isa, male))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(female, contradict, man))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(man, contradict, female))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(male, contradict, woman))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(female, someare, woman))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(man, contradict, woman))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(joe, contradict, female))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(female, contradict, joe))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(joe, contradict, banana))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(joe, contradict, man))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(man, contradict, joe))
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(joe, contradict, girl))
	{
		throw 'Statement should be true';
	}
	
	//Contradiction proofs
	if (!flattenizer.getProof(joe, contradict, girl, true)[0].equals(new Statement(joe, isa, man, true)))
		throw 'Wrong proof';
	if (!flattenizer.getProof(joe, contradict, girl, true)[1].equals(new Statement(man, contradict, girl, true)))
		throw 'Wrong proof';
		
	//Testing Need and Allow
	//need
	if (!flattenizer.testConnection(bird, need, tree))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(parrot, need, tree))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(animal, need, tree))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(bird, need, pine))
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(bird, need, plant))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(bird, need, light))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(parrot, need, light))
	{
		throw 'Statement should be true';
	}

	//allow
	if (!flattenizer.testConnection(tree, allow, bird))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(tree, allow, parrot))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(tree, allow, animal))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(pine, allow, bird))
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(plant, allow, bird))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(light, allow, bird))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(light, allow, parrot))
	{
		throw 'Statement should be true';
	}
	
	//Need and Allow Proofs
	if (!flattenizer.getProof(parrot, need, light, true)[0].equals(new Statement(parrot, isa, bird, true)))
		throw 'Wrong proof';
	if (!flattenizer.getProof(parrot, need, light, true)[1].equals(new Statement(bird, need, light, true)))
		throw 'Wrong proof';
	
	
	//Make and madeby
	//make
	if (!flattenizer.testConnection(billy, make, jazz))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(billy, make, music))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(billy, make, art))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(billy, make, painting))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(billy, make, polka))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(black_man, make, jazz))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(black_man, make, music))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(black_man, make, polka))
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(music, make, dance))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(billy, make, dance))
	{
		throw 'Statement should be true';
	}
	
	//madeby
	if (!flattenizer.testConnection(jazz, madeby, billy))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(music, madeby, billy))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(art, madeby, billy))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(painting, madeby, billy))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(polka, madeby, billy))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(jazz, madeby, black_man))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(music, madeby, black_man))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(polka, madeby, black_man))
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(dance, madeby, music))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(dance, madeby, billy))
	{
		throw 'Statement should be true';
	}
	
	alert('Add more unit tests');
	//Thinker: do stuff like: if all galaxies contain stuff that are isa star, then maybe galaxies all contain stars
	//Isa must cant contradict
}