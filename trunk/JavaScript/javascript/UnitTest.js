function UnitTest()
{
}

//Test all
UnitTest.prototype.testAll = function UnitTest_testAll()
{
	this.testConceptNameMapper();
	this.testConceptNameMapperAlias();
	this.testConceptNameMapperRename();
	this.testTautologyManager();
	this.testTautologyManagerPart2();
	this.testComplementaryOperatorManager();
	this.testEvaluationCache();
	this.testFlattenizer();
	this.testHumanStatementSplitter();
	this.testTalkingRouter();
	this.testThinker();
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

//Test alias
UnitTest.prototype.testConceptNameMapperAlias = function UnitTest_testConceptNameMapperAlias()
{
	var conceptNameMapper = new ConceptNameMapper();
	var tautologyManager = new TautologyManager(conceptNameMapper);
	var flattenizer = new Flattenizer(new Instinct(new ComplementaryOperatorManager(conceptNameMapper)));

	var circle = conceptNameMapper.getConcept("circle");
	var round = conceptNameMapper.getConcept("round");
	var sphere = conceptNameMapper.getConcept("sphere");
	var shape = conceptNameMapper.getConcept("shape");
	var disc = conceptNameMapper.getConcept("disc");
	var torus = conceptNameMapper.getConcept("torus");
	var circumference = conceptNameMapper.getConcept("circumference");
	var perimeter = conceptNameMapper.getConcept("perimeter");
	var diameter = conceptNameMapper.getConcept("diameter");
	var segment = conceptNameMapper.getConcept("segment");
	
	var isa = conceptNameMapper.getConcept("isa");
	var madeof = conceptNameMapper.getConcept("madeof");
	
	
	tautologyManager.learnStatement("circle isa shape");
	tautologyManager.learnStatement("circle madeof diameter");
	tautologyManager.learnStatement("round madeof circumference");
	tautologyManager.learnStatement("sphere madeof circle");
	tautologyManager.learnStatement("diameter isa segment");
	tautologyManager.learnStatement("circumference isa perimeter");
	
	conceptNameMapper.alias("circle", "round");
	
	circle = conceptNameMapper.getConcept("circle");
	round = conceptNameMapper.getConcept("round");
	
	if (circle != round)
	{
		throw 'Concepts should be the same';
	}
	
	if (!tautologyManager.testConnection(circle, isa, shape))
	{
		throw 'Statement should be true';
	}
	
	if (!tautologyManager.testConnection(circle, madeof, circumference))
	{
		throw 'Statement should be true';
	}
	
	if (!tautologyManager.testConnection(round, isa, shape))
	{
		throw 'Statement should be true';
	}
	
	if (!tautologyManager.testConnection(round, madeof, circumference))
	{
		throw 'Statement should be true';
	}

	conceptNameMapper.unAlias("circle", "round");
	
	circle = conceptNameMapper.getConcept("circle");
	round = conceptNameMapper.getConcept("round");
	
	if (circle == round)
	{
		throw "Concepts shouldn't be the same";
	}
	
	if (!tautologyManager.testConnection(circle, isa, shape))
	{
		throw 'Statement should be true';
	}
	
	if (!tautologyManager.testConnection(circle, madeof, circumference))
	{
		throw 'Statement should be true';
	}
	
	if (!tautologyManager.testConnection(round, isa, shape))
	{
		throw 'Statement should be true';
	}
	
	if (!tautologyManager.testConnection(round, madeof, circumference))
	{
		throw 'Statement should be true';
	}
}

//Test rename
UnitTest.prototype.testConceptNameMapperRename = function UnitTest_testConceptNameMapperRename()
{
	var conceptNameMapper = new ConceptNameMapper();
	var tautologyManager = new TautologyManager(conceptNameMapper);
	var flattenizer = new Flattenizer(new Instinct(new ComplementaryOperatorManager(conceptNameMapper)));

	var circle = conceptNameMapper.getConcept("circle");
	var round = conceptNameMapper.getConcept("round");
	var sphere = conceptNameMapper.getConcept("sphere");
	var shape = conceptNameMapper.getConcept("shape");
	var disc = conceptNameMapper.getConcept("disc");
	var torus = conceptNameMapper.getConcept("torus");
	var circumference = conceptNameMapper.getConcept("circumference");
	var perimeter = conceptNameMapper.getConcept("perimeter");
	var diameter = conceptNameMapper.getConcept("diameter");
	var segment = conceptNameMapper.getConcept("segment");
	
	var isa = conceptNameMapper.getConcept("isa");
	var madeof = conceptNameMapper.getConcept("madeof");
	
	
	tautologyManager.learnStatement("circle isa shape");
	tautologyManager.learnStatement("circle madeof diameter");
	tautologyManager.learnStatement("circle madeof circumference");
	tautologyManager.learnStatement("sphere madeof circle");
	tautologyManager.learnStatement("diameter isa segment");
	tautologyManager.learnStatement("circumference isa perimeter");
	
	conceptNameMapper.rename("circle", "round");
	
	circle = conceptNameMapper.getConcept("circle");
	round = conceptNameMapper.getConcept("round");
	
	if (!tautologyManager.testConnection(round, isa, shape))
	{
		throw 'Statement should be true';
	}
	
	if (!tautologyManager.testConnection(round, madeof, circumference))
	{
		throw 'Statement should be true';
	}
	
	if (!tautologyManager.testConnection(round, isa, shape))
	{
		throw 'Statement should be true';
	}
	
	if (!tautologyManager.testConnection(round, madeof, circumference))
	{
		throw 'Statement should be true';
	}
	
	if (tautologyManager.testConnection(circle, isa, shape))
	{
		throw 'Statement should be false';
	}
	
	if (tautologyManager.testConnection(circle, madeof, circumference))
	{
		throw 'Statement should be false';
	}
	
	if (tautologyManager.testConnection(circle, isa, shape))
	{
		throw 'Statement should be false';
	}
	
	if (tautologyManager.testConnection(circle, madeof, circumference))
	{
		throw 'Statement should be false';
	}
}

//Test connection manager
UnitTest.prototype.testTautologyManager = function UnitTest_testTautologyManager()
{
	var conceptNameMapper = new ConceptNameMapper();
	var tautologyManager = new TautologyManager(conceptNameMapper);
	
	var pine = conceptNameMapper.getConcept("pine");
	var tree = conceptNameMapper.getConcept("tree");
	var plant = conceptNameMapper.getConcept("plant");
	var animal = conceptNameMapper.getConcept("animal");
	
	var isa = conceptNameMapper.getConcept("isa");
	
	tautologyManager.addConnection(pine, isa, tree);
	tautologyManager.addConnection(tree, isa, plant);	
	
	if (tautologyManager.testConnection(pine, isa, animal))
	{
		throw "Connection shouldn't exist";
	}
	if (!tautologyManager.testConnection(pine, isa, tree))
	{
		throw "Connection should exist";
	}	
	if (!tautologyManager.testConnection(tree, isa, plant))
	{
		throw "Connection should exist";
	}
	
	tautologyManager.removeConnection(pine, isa, tree);
	
	if (tautologyManager.testConnection(pine, isa, tree))
	{
		throw "Connection shouldn't exist";
	}
}

//Test Tautology Manager
UnitTest.prototype.testTautologyManagerPart2 = function UnitTest_testTautologyManagerPart2()
{
	var tautologyManager = new TautologyManager(new ConceptNameMapper());
	tautologyManager.learnStatement("piNe iSa trEe");
	
	if (!tautologyManager.testStatement("pinE IsA TrEe"))
	{
		throw "Statement should be true";
	}
	
	if (tautologyManager.testStatement("pinE not IsA TrEe"))
	{
		throw "Statement should be false";
	}
	
	if (tautologyManager.testStatement("pinE IsA AppLe"))
	{
		throw "Statement should be false";
	}
	
	if (!tautologyManager.testStatement("pinE nOt IsA AppLe"))
	{
		throw "Statement should be true";
	}
	
	tautologyManager.learnStatement("piNe NOt iSa trEe");
	
	if (!tautologyManager.testStatement("pinE noT IsA TrEe"))
	{
		throw "Statement should be true";
	}

	if (tautologyManager.testStatement("pinE IsA TrEe"))
	{
		throw "Statement should be false";
	}
	
	tautologyManager.learnStatement("piNe NOt iSa pIE");
	
	if (!tautologyManager.testStatement("pinE noT IsA Pie"))
	{
		throw "Statement should be true";
	}
		
	if (tautologyManager.testStatement("pinE IsA Pie"))
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
	var tautologyManager = new TautologyManager(conceptNameMapper);
	var instinct = new Instinct(complementaryOperatorManager);
	
	var pine = new Concept("pine");
	var isa = new Concept("isa");
	var tree = new Concept("tree");
	
	evaluationCache.setCachedResult(pine, isa, true);
	
	if (!evaluationCache.getCachedResult(pine, isa))
	{
		throw 'Statement should be currently getting evaluated';
	}
	
	evaluationCache.setCachedResult(pine, isa, false);
	
	if (evaluationCache.getCachedResult(pine, isa))
	{
		throw "Statement shouldn't be currently getting evaluated";
	}
}

//Test evaluator
UnitTest.prototype.testFlattenizer = function UnitTest_testFlattenizer()
{
	var conceptNameMapper = new ConceptNameMapper();
	var tautologyManager = new TautologyManager(conceptNameMapper);
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
	var monsanto = conceptNameMapper.getConcept("monsanto");
	var gmo = conceptNameMapper.getConcept("gmo");
	var poison = conceptNameMapper.getConcept("poison");
	var destroy = conceptNameMapper.getConcept("destroy");
	var destroyedby = conceptNameMapper.getConcept("destroyedby");
	var mcdonalds = conceptNameMapper.getConcept("mcdonalds");
	var health = conceptNameMapper.getConcept("health");
	var corporation = conceptNameMapper.getConcept("corporation");
	var concept = conceptNameMapper.getConcept("concept");
	var bee = conceptNameMapper.getConcept("bee");
	var flower = conceptNameMapper.getConcept("flower");
	var program = conceptNameMapper.getConcept("program");
	var lewis = conceptNameMapper.getConcept("lewis");
	var programmer = conceptNameMapper.getConcept("programmer");
	var satellite = conceptNameMapper.getConcept("satellite");
	var largerthan = conceptNameMapper.getConcept("largerthan");
	var smallerthan = conceptNameMapper.getConcept("smallerthan");
	var moon = conceptNameMapper.getConcept("moon");
	var from = conceptNameMapper.getConcept("from");
	var originof = conceptNameMapper.getConcept("originof");
	var grunge = conceptNameMapper.getConcept("grunge");
	var seattle = conceptNameMapper.getConcept("seattle");
	var usa = conceptNameMapper.getConcept("usa");
	var city = conceptNameMapper.getConcept("city");
	var manga = conceptNameMapper.getConcept("manga");
	var japan = conceptNameMapper.getConcept("japan");
	var dragon_ball = conceptNameMapper.getConcept("dragon_ball");
	var england = conceptNameMapper.getConcept("england");
	
	
	tautologyManager.learnStatement("joe isa human");	
	tautologyManager.learnStatement("pine isa tree");
	tautologyManager.learnStatement("tree isa plant");
	tautologyManager.learnStatement("plant contradict animal");
	tautologyManager.learnStatement("human isa animal");
	tautologyManager.learnStatement("animal isa lifeform");
	tautologyManager.learnStatement("plant isa lifeform");
	tautologyManager.learnStatement("lifeform madeof water");
	tautologyManager.learnStatement("water isa liquid");
	tautologyManager.learnStatement("tree madeof wood");
	tautologyManager.learnStatement("wood isa matter");
	tautologyManager.learnStatement("wood madeof carbon");
	tautologyManager.learnStatement("matter madeof energy");
	tautologyManager.learnStatement("rain partof state_of_affair");	
	tautologyManager.learnStatement("joe isa man");
	tautologyManager.learnStatement("joe partof state_of_affair");
	tautologyManager.learnStatement("carbon isa atom");
	tautologyManager.learnStatement("atom madeof matter");
	tautologyManager.learnStatement("forest madeof tree");
	tautologyManager.learnStatement("earth madeof forest");
	tautologyManager.learnStatement("solar_system madeof earth");
	tautologyManager.learnStatement("solar_system madeof sun");
	tautologyManager.learnStatement("milky_way madeof solar_system");
	tautologyManager.learnStatement("universe madeof milky_way");
	tautologyManager.learnStatement("multiverse madeof universe");
	tautologyManager.learnStatement("earth isa planet");
	tautologyManager.learnStatement("star madeof fire");
	tautologyManager.learnStatement("sun isa star");
	tautologyManager.learnStatement("star madeof fire");
	tautologyManager.learnStatement("star isa celestial_body");
	tautologyManager.learnStatement("planet isa celestial_body");
	tautologyManager.learnStatement("forest isa ecosystem");
	tautologyManager.learnStatement("fire madeof energy");
	tautologyManager.learnStatement("fire madeof gas");
	tautologyManager.learnStatement("gas isa matter");
	tautologyManager.learnStatement("fire isa chemical_reaction");
	tautologyManager.learnStatement("male contradict female");
	tautologyManager.learnStatement("animal contradict vegetable");
	tautologyManager.learnStatement("human isa animal");
	tautologyManager.learnStatement("man isa human");
	tautologyManager.learnStatement("woman isa human");
	tautologyManager.learnStatement("man isa male");
	tautologyManager.learnStatement("woman isa female");
	tautologyManager.learnStatement("girl isa woman");
	tautologyManager.learnStatement("banana isa vegetable");
	tautologyManager.learnStatement("bird need tree");
	tautologyManager.learnStatement("bird isa animal");
	tautologyManager.learnStatement("parrot isa bird");
	tautologyManager.learnStatement("plant need light");
	tautologyManager.learnStatement("billy make jazz");
	tautologyManager.learnStatement("jazz isa music");
	tautologyManager.learnStatement("music isa art");
	tautologyManager.learnStatement("painting isa art");
	tautologyManager.learnStatement("billy isa black_man");
	tautologyManager.learnStatement("polka isa music");
	tautologyManager.learnStatement("music make dance");
	tautologyManager.learnStatement("monsanto make gmo");
	tautologyManager.learnStatement("gmo isa poison");
	tautologyManager.learnStatement("poison destroy human");
	tautologyManager.learnStatement("mcdonalds destroy health");
	tautologyManager.learnStatement("human need health");
	tautologyManager.learnStatement("monsanto isa corporation");
	tautologyManager.learnStatement("human isa concept");
	tautologyManager.learnStatement("bee need flower");
	tautologyManager.learnStatement("flower need bee");
	tautologyManager.learnStatement("lewis isa programmer");
	tautologyManager.learnStatement("programmer make program");
	tautologyManager.learnStatement("star largerthan planet");
	tautologyManager.learnStatement("planet largerthan satellite");
	tautologyManager.learnStatement("moon isa satellite");
	tautologyManager.learnStatement("grunge from seattle");
	tautologyManager.learnStatement("seattle isa city");
	tautologyManager.learnStatement("seattle partof usa");
	tautologyManager.learnStatement("dragon_ball isa manga");
	tautologyManager.learnStatement("manga from japan");
	tautologyManager.learnStatement("japan isa country");
	tautologyManager.learnStatement("usa isa country");
	tautologyManager.learnStatement("england isa country");
	tautologyManager.learnStatement("usa from england");
	
	//Test tautology
	if (!tautologyManager.testConnection(pine, isa, tree))
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
	
	if (!flattenizer.testConnection(lewis, make, program))
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

	if (!flattenizer.testConnection(program, madeby, lewis))
	{
		throw 'Statement should be true';
	}
		
	//destroy and destroyed by
	//destroy
	if (!flattenizer.testConnection(monsanto, make, gmo))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(gmo, isa, poison))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(poison, destroy, human))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(gmo, destroy, human))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(poison, destroy, concept))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(corporation, destroy, human))
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(monsanto, destroy, human))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(gmo, destroy, joe))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(monsanto, destroy, joe))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(mcdonalds, destroy, health))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(human, need, health))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(mcdonalds, destroy, human))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(mcdonalds, destroy, joe))
	{
		throw 'Statement should be true';
	}
	
	//destroyedby
	if (!flattenizer.testConnection(gmo, madeby, monsanto))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(poison, someare, gmo))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(human, destroyedby, poison))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(human, destroyedby, gmo))
	{
		throw 'Statement should be true';
	}
	
	if (flattenizer.testConnection(concept, destroyedby, poison))
	{
		throw 'Statement should be false';
	}
	
	if (flattenizer.testConnection(human, destroyedby, corporation))
	{
		throw 'Statement should be false';
	}
	
	if (!flattenizer.testConnection(human, destroyedby, monsanto))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(joe, destroyedby, gmo))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(joe, destroyedby, monsanto))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(health, destroyedby, mcdonalds))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(health, allow, human))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(human, destroyedby, mcdonalds))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(joe, destroyedby, mcdonalds))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(flower, need, flower))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(bee, need, bee))
	{
		throw 'Statement should be true';
	}
	
	
	//Testing largerthan and smallerthan
	//largerthan
	if (!flattenizer.testConnection(star, largerthan, planet))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(planet, largerthan, satellite))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(star, largerthan, satellite))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(sun, largerthan, planet))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(planet, largerthan, moon))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(sun, largerthan, earth))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(sun, largerthan, moon))
	{
		throw 'Statement should be true';
	}
	
	//smallerthan
	if (!flattenizer.testConnection(planet, smallerthan, star))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(satellite, smallerthan, planet))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(satellite, smallerthan, star))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(planet, smallerthan, sun))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(moon, smallerthan, planet))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(earth, smallerthan, sun))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(moon, smallerthan, sun))
	{
		throw 'Statement should be true';
	}

	
	//Testing from and originof
	//from
	if (!flattenizer.testConnection(manga, from, japan))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(dragon_ball, from, japan))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(grunge, from, seattle))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(grunge, from, usa))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(usa, from, england))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(grunge, from, england))
	{
		throw 'Statement should be true';
	}
	
	//originof
	if (!flattenizer.testConnection(japan, originof, manga))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(japan, originof, dragon_ball))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(seattle, originof, grunge))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(usa, originof, grunge))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(england, originof, usa))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(england, originof, grunge))
	{
		throw 'Statement should be true';
	}
	
	
	//Testing optimization (removing useless tautologies)
	if (!flattenizer.testConnection(joe, isa, human))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(joe, isa, man))
	{
		throw 'Statement should be true';
	}
	
	if (!flattenizer.testConnection(man, isa, human))
	{
		throw 'Statement should be true';
	}
	
	if (!joe.getTautologicBranch(isa).hasComplement(man))
	{
		throw 'Tautology should be there';
	}
	
	if (!man.getTautologicBranch(isa).hasComplement(human))
	{
		throw 'Tautology should be there';
	}
	
	if (joe.getTautologicBranch(isa).hasComplement(human))
	{
		throw "Tautology shouldn't be there because it's implicit";
	}
	
	//Isa must cant contradict
	//?Isa must unlikely contradict?
	//?Allow must unlikely destroy?
	//?Make must unlikely destroy?
	//unit test double need and double oppress
	//smallerthan cant largerthan
	//Thinker: do stuff like: if all galaxies contain stuff that are isa star, then maybe galaxies all contain stars
}

//Test human statement splitter
UnitTest.prototype.testHumanStatementSplitter = function UnitTest_testHumanStatementSplitter()
{
	var talkingRouter = new TalkingRouter("human_dude", "ai_dude");
	var humanStatementSplitter = talkingRouter.humanStatementSplitter;
	
	var statementList;//String[]
	
	statementList = humanStatementSplitter.split("pine isa tree which isa plant");
	
	if (statementList[0] != "pine isa tree")
		throw 'Wrong statement';
	if (statementList[1] != "tree isa plant")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("pine isa tree which madeof wood");
	
	if (statementList[0] != "pine isa tree")
		throw 'Wrong statement';
	if (statementList[1] != "tree madeof wood")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("tree isa plant madeof wood");
	
	if (statementList[0] != "tree isa plant")
		throw 'Wrong statement';
	if (statementList[1] != "tree madeof wood")
		throw 'Wrong statement';

	statementList = humanStatementSplitter.split("pine isa tree which isa plant madeof wood");
	
	if (statementList[0] != "pine isa tree")
		throw 'Wrong statement';
	if (statementList[1] != "tree isa plant")
		throw 'Wrong statement';
	if (statementList[2] != "tree madeof wood")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("pine isa tree which isa plant madeof wood which isa material");
	
	if (statementList[0] != "pine isa tree")
		throw 'Wrong statement';
	if (statementList[1] != "tree isa plant")
		throw 'Wrong statement';
	if (statementList[2] != "tree madeof wood")
		throw 'Wrong statement';
	if (statementList[3] != "wood isa material")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("pine isa tree which isa plant which isa lifeform contradict animal which someare dog");
	
	if (statementList[0] != "pine isa tree")
		throw 'Wrong statement';
	if (statementList[1] != "tree isa plant")
		throw 'Wrong statement';
	if (statementList[2] != "plant isa lifeform")
		throw 'Wrong statement';
	if (statementList[3] != "plant contradict animal")
		throw 'Wrong statement';
	if (statementList[4] != "animal someare dog")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("tree someare pine, christmas_tree, palm_tree and apple_tree madeof wood");
	
	if (statementList[0] != "tree someare pine")
		throw 'Wrong statement';
	if (statementList[1] != "tree someare christmas_tree")
		throw 'Wrong statement';
	if (statementList[2] != "tree someare palm_tree")
		throw 'Wrong statement';
	if (statementList[3] != "tree someare apple_tree")
		throw 'Wrong statement';
	if (statementList[4] != "tree madeof wood")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("tree someare pine christmas_tree palm_tree and apple_tree madeof wood");
	
	if (statementList[0] != "tree someare pine")
		throw 'Wrong statement';
	if (statementList[1] != "tree someare christmas_tree")
		throw 'Wrong statement';
	if (statementList[2] != "tree someare palm_tree")
		throw 'Wrong statement';
	if (statementList[3] != "tree someare apple_tree")
		throw 'Wrong statement';
	if (statementList[4] != "tree madeof wood")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("tree someare pine and christmas_tree and palm_tree and apple_tree madeof wood");
	
	if (statementList[0] != "tree someare pine")
		throw 'Wrong statement';
	if (statementList[1] != "tree someare christmas_tree")
		throw 'Wrong statement';
	if (statementList[2] != "tree someare palm_tree")
		throw 'Wrong statement';
	if (statementList[3] != "tree someare apple_tree")
		throw 'Wrong statement';
	if (statementList[4] != "tree madeof wood")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("tree someare pine and christmas_tree and palm_tree and apple_tree madeof wood and water");
	
	if (statementList[0] != "tree someare pine")
		throw 'Wrong statement';
	if (statementList[1] != "tree someare christmas_tree")
		throw 'Wrong statement';
	if (statementList[2] != "tree someare palm_tree")
		throw 'Wrong statement';
	if (statementList[3] != "tree someare apple_tree")
		throw 'Wrong statement';
	if (statementList[4] != "tree madeof wood")
		throw 'Wrong statement';
	if (statementList[5] != "tree madeof water")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("tree someare pine and christmas_tree and palm_tree and apple_tree madeof wood water");
	
	if (statementList[0] != "tree someare pine")
		throw 'Wrong statement';
	if (statementList[1] != "tree someare christmas_tree")
		throw 'Wrong statement';
	if (statementList[2] != "tree someare palm_tree")
		throw 'Wrong statement';
	if (statementList[3] != "tree someare apple_tree")
		throw 'Wrong statement';
	if (statementList[4] != "tree madeof wood")
		throw 'Wrong statement';
	if (statementList[5] != "tree madeof water")
		throw 'Wrong statement';
		
	statementList = humanStatementSplitter.split("tree someare pine and christmas_tree and palm_tree and apple_tree madeof wood madeof water");
	
	if (statementList[0] != "tree someare pine")
		throw 'Wrong statement';
	if (statementList[1] != "tree someare christmas_tree")
		throw 'Wrong statement';
	if (statementList[2] != "tree someare palm_tree")
		throw 'Wrong statement';
	if (statementList[3] != "tree someare apple_tree")
		throw 'Wrong statement';
	if (statementList[4] != "tree madeof wood")
		throw 'Wrong statement';
	if (statementList[5] != "tree madeof water")
		throw 'Wrong statement';
}

//Test Ai Unit
UnitTest.prototype.testTalkingRouter = function UnitTest_testTalkingRouter()
{
	var talkingRouter = new TalkingRouter("human_dude", "ai_dude");
	
	if (talkingRouter.talkTo("")['output'] != '')
		throw 'Should answer something empty';
	
	if (talkingRouter.talkTo("sdgsdfj")['output'] != talkingRouter.helpLinkString)
		throw 'Should suggest to read help';
		
	if (talkingRouter.talkTo("sdgsdfjgfkjf saghjry")['output'] != talkingRouter.helpLinkString)
		throw 'Should suggest to read help';
		
	if (talkingRouter.talkTo("sdgsdfj 6rdfhgf fsdfdhf gffgdshgd")['output'] != talkingRouter.helpLinkString)
		throw 'Should suggest to read help';
	
	if (talkingRouter.talkTo("pine isa tree")['output'] != 'Alright, <span class="AiConcept">pine</span> now <span class="AiOperator">isa</span> <span class="AiConcept">tree</span>')
		throw 'Wrong answer';
		
	if (talkingRouter.talkTo("pine not isa tree")['output'] != 'Alright, <span class="AiConcept">pine</span> not <span class="AiOperator">isa</span> <span class="AiConcept">tree</span> anymore')
		throw 'Wrong answer';
		
	if (talkingRouter.talkTo("pine isa tree")['output'] != 'Alright, <span class="AiConcept">pine</span> now <span class="AiOperator">isa</span> <span class="AiConcept">tree</span>')
		throw 'Wrong answer';
		
	if (talkingRouter.talkTo("pine isa tree")['output'] != 'Yes, <span class="AiConcept">pine</span> <span class="AiOperator">isa</span> <span class="AiConcept">tree</span>')
		throw 'Wrong answer';
	
	if (talkingRouter.talkTo("pine isa plant?")['output'] != 'Not that I know')
		throw 'Wrong answer';
		
	talkingRouter.talkTo("tree isa plant");	
	if (talkingRouter.talkTo("pine isa plant")['output'] != 'Yes, <span class="AiConcept">pine</span> <span class="AiOperator">isa</span> <span class="AiConcept">plant</span>')
		throw 'Wrong answer';
		
	if (talkingRouter.talkTo("pine isa stone?")['output'] != 'Not that I know')
		throw 'Wrong answer';
		
	if (talkingRouter.talkTo("pine not isa stone?")['output'] != 'Not that I know')
		throw 'Wrong answer';
		
	if (talkingRouter.talkTo("pine not isa stone")['output'] != 'Not that I know')
		throw 'Wrong answer';	
	
	talkingRouter.talkTo("tree madeof wood");
	talkingRouter.talkTo("wood isa material");
	talkingRouter.talkTo("wood madeof carbon");
	talkingRouter.talkTo("plant isa lifeform");
	talkingRouter.talkTo("animal isa lifeform");
	talkingRouter.talkTo("animal contradict plant");
	talkingRouter.talkTo("lifeform madeof water");
	talkingRouter.talkTo("christmas_tree isa pine");
	talkingRouter.talkTo("palm_tree isa tree");
	talkingRouter.talkTo("apple_tree isa tree");
	talkingRouter.talkTo("dog isa animal");

	if (talkingRouter.talkTo("wood partof tree?")['output'] != 'Yes, <span class="AiConcept">wood</span> <span class="AiOperator">partof</span> <span class="AiConcept">tree</span>')
		throw 'Wrong answer';
	
	if (talkingRouter.talkTo("pine contradict animal?")['output'] != 'Yes, <span class="AiConcept">pine</span> <span class="AiOperator">contradict</span> <span class="AiConcept">animal</span>')
		throw 'Wrong answer';

	if (talkingRouter.talkTo("why pine madeof water")['output'] != 'because<br /><span class="AiConcept">pine</span> <span class="AiOperator">isa</span> <span class="AiConcept">tree</span>,<br /><span class="AiConcept">tree</span> <span class="AiOperator">isa</span> <span class="AiConcept">plant</span>,<br /><span class="AiConcept">plant</span> <span class="AiOperator">isa</span> <span class="AiConcept">lifeform</span>,<br /><span class="AiConcept">lifeform</span> <span class="AiOperator">madeof</span> <span class="AiConcept">water</span>,<br />therefore, <span class="AiConcept">pine</span> <span class="AiOperator">madeof</span> <span class="AiConcept">water</span>')
		throw 'Wrong answer';

	if (talkingRouter.talkTo("why pine isa animal")['output'] != 'because<br /><span class="AiConcept">pine</span> <span class="AiOperator">isa</span> <span class="AiConcept">tree</span>,<br /><span class="AiConcept">tree</span> <span class="AiOperator">isa</span> <span class="AiConcept">plant</span>,<br /><span class="AiConcept">plant</span> <span class="AiOperator">contradict</span> <span class="AiConcept">animal</span>,<br />therefore, <span class="AiConcept">pine</span> <span class="AiOperator">contradict</span> <span class="AiConcept">animal</span>')
		throw 'Wrong answer';
		
	if (talkingRouter.talkTo("why pine not isa animal")['output'] != 'because<br /><span class="AiConcept">pine</span> <span class="AiOperator">isa</span> <span class="AiConcept">tree</span>,<br /><span class="AiConcept">tree</span> <span class="AiOperator">isa</span> <span class="AiConcept">plant</span>,<br /><span class="AiConcept">plant</span> <span class="AiOperator">contradict</span> <span class="AiConcept">animal</span>,<br />therefore, <span class="AiConcept">pine</span> <span class="AiOperator">contradict</span> <span class="AiConcept">animal</span>')
		throw 'Wrong answer';
	
	if (talkingRouter.talkTo("pine isa dog")['output'] != '<span class="AiConcept">Me</span> <span class="AiOperator">disagree</span> because<br /><span class="AiConcept">pine</span> <span class="AiOperator">isa</span> <span class="AiConcept">tree</span>,<br /><span class="AiConcept">tree</span> <span class="AiOperator">isa</span> <span class="AiConcept">plant</span>,<br /><span class="AiConcept">plant</span> <span class="AiOperator">contradict</span> <span class="AiConcept">animal</span>,<br /><span class="AiConcept">animal</span> <span class="AiOperator">someare</span> <span class="AiConcept">dog</span>,<br />therefore, <span class="AiConcept">pine</span> <span class="AiOperator">contradict</span> <span class="AiConcept">dog</span>')
		throw 'Wrong answer';
	
	if (talkingRouter.talkTo("whatis tree")['output'] != '<span class="AiConcept">tree</span> <span class="AiOperator">isa</span> <span class="AiConcept">plant</span> <span class="AiOperator">madeof</span> <span class="AiConcept">wood</span> <span class="AiOperator">someare</span> <span class="AiConcept">pine</span>, <span class="AiConcept">palm_tree</span> and <span class="AiConcept">apple_tree</span>')
		throw 'Wrong answer';

	if (talkingRouter.talkTo("define pine")['output'] != '<span class="AiConcept">pine</span>: <ul> <li><span class="AiOperator">isa</span><ul> <li><span class="AiConcept">tree</span></li> <li><span class="AiConcept">plant</span></li> <li><span class="AiConcept">lifeform</span></li> </ul></li> <li><span class="AiOperator">madeof</span><ul> <li><span class="AiConcept">wood</span></li> <li><span class="AiConcept">carbon</span></li> <li><span class="AiConcept">material</span></li> <li><span class="AiConcept">water</span></li> </ul></li> <li><span class="AiOperator">contradict</span><ul> <li><span class="AiConcept">animal</span></li> <li><span class="AiConcept">dog</span></li> </ul></li> <li><span class="AiOperator">someare</span><ul> <li><span class="AiConcept">christmas_tree</span></li> </ul></li></ul>')
		throw 'Wrong answer';
}

//Test thinker
UnitTest.prototype.testThinker = function UnitTest_testThinker()
{
	var talkingRouter = new TalkingRouter();
	talkingRouter.talkTo("me isa human make you which isa artificial_intelligence which isa software which is madeof of boolean_logic");
	talkingRouter.talkTo("human isa mammal which isa animal which isa organic_lifeform contradict plant which isa organic_lifeform");
	talkingRouter.talkTo("google isa search_engine which isa software and web_site which partof internet");
	talkingRouter.talkTo("windows madeby microsoft isa operating_system which isa sofware");
	talkingRouter.talkTo("microsoft isa corporation");
	talkingRouter.talkTo("monsanto isa corporation make gmo which isa poison which destroy health");
	talkingRouter.talkTo("organic_lifeform need health");
	talkingRouter.talkTo("you make logic_derivation and question and inductive_reasoning");
	talkingRouter.talkTo("human madeof big_brain which isa brain make critical_thinking and inductive_reasoning and logic_derivation and creativity");
	talkingRouter.talkTo("pine isa tree which madeof wood isa plant which isa organic_lifeform");
	talkingRouter.talkTo("organic_lifeform isa lifeform");
	talkingRouter.talkTo("artificial_intelligence isa electronic_lifeform which isa lifeform");	
	talkingRouter.talkTo("reptile isa animal madeof blood");
	talkingRouter.talkTo("bird isa animal madeof blood");
	talkingRouter.talkTo("mammal isa animal madeof blood");
	talkingRouter.talkTo("insect isa animal madeof blood");
	talkingRouter.talkTo("fish isa animal madeof blood");
	talkingRouter.talkTo("kangaroo isa animal madeof blood");
	talkingRouter.talkTo("squid isa animal");
	
	alert(talkingRouter.talkTo("thinkabout animal"));
}