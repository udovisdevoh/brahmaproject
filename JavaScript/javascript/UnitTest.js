function UnitTest(){}//Test allUnitTest.prototype.testAll = function UnitTest_testAll(){	this.testConceptNameMapper();	this.testConnectionManager();	this.testTotologyManager();	this.testConditionalStatementManager();	alert("Unit tests completed");}//Test concept name mapperUnitTest.prototype.testConceptNameMapper = function UnitTest_testConceptNameMapper(){	var conceptNameMapper = new ConceptNameMapper();		if (conceptNameMapper.getConcept("apple") != conceptNameMapper.getConcept("Apple"))	{		throw "Both concept should be equivalent";	}		if (conceptNameMapper.getConcept("apple") == conceptNameMapper.getConcept("orangle"))	{		throw "Both concept shouldn't be equivalent";	}		conceptNameMapper.alias("ciRcle", "rouNd");		if (conceptNameMapper.getConcept("circle") != conceptNameMapper.getConcept("round"))	{		throw "Both concept should be equivalent";	}		conceptNameMapper.unAlias("ciRcle", "rouNd");		if (conceptNameMapper.getConcept("circle") == conceptNameMapper.getConcept("round"))	{		throw "Both concept shouldn't be equivalent";	}}//Test connection managerUnitTest.prototype.testConnectionManager = function UnitTest_testConnectionManager(){	var connectionManager = new ConnectionManager();	var conceptNameMapper = new ConceptNameMapper();		var pine = conceptNameMapper.getConcept("pine");	var tree = conceptNameMapper.getConcept("tree");	var plant = conceptNameMapper.getConcept("plant");	var animal = conceptNameMapper.getConcept("animal");		var isa = conceptNameMapper.getConcept("isa");		connectionManager.addConnection(pine, isa, tree);	connectionManager.addConnection(tree, isa, plant);			if (connectionManager.testConnection(pine, isa, animal))	{		throw "Connection shouldn't exist";	}	if (!connectionManager.testConnection(pine, isa, tree))	{		throw "Connection should exist";	}		if (!connectionManager.testConnection(tree, isa, plant))	{		throw "Connection should exist";	}		connectionManager.removeConnection(pine, isa, tree);		if (connectionManager.testConnection(pine, isa, tree))	{		throw "Connection shouldn't exist";	}}//Test Totology ManagerUnitTest.prototype.testTotologyManager = function UnitTest_testTotologyManager(){	var totologyManager = new TotologyManager(new ConceptNameMapper());	totologyManager.learnStatement("piNe iSa trEe");		if (!totologyManager.testStatement("pinE IsA TrEe"))	{		throw "Statement should be true";	}		if (totologyManager.testStatement("pinE not IsA TrEe"))	{		throw "Statement should be false";	}		if (totologyManager.testStatement("pinE IsA AppLe"))	{		throw "Statement should be false";	}		if (!totologyManager.testStatement("pinE nOt IsA AppLe"))	{		throw "Statement should be true";	}		totologyManager.learnStatement("piNe NOt iSa trEe");		if (!totologyManager.testStatement("pinE noT IsA TrEe"))	{		throw "Statement should be true";	}	if (totologyManager.testStatement("pinE IsA TrEe"))	{		throw "Statement should be false";	}		totologyManager.learnStatement("piNe NOt iSa pIE");		if (!totologyManager.testStatement("pinE noT IsA Pie"))	{		throw "Statement should be true";	}			if (totologyManager.testStatement("pinE IsA Pie"))	{		throw "Statement should be false";	}}//Test Conditional Statement ManagerUnitTest.prototype.testConditionalStatementManager = function UnitTest_testConditionalStatementManager(){	conditionalStatementManager = new ConditionalStatementManager(new ConceptNameMapper());		conditionalStatementManager.learnStatement('iF [pinE] isA [tRee] thEn [trEe] soMeare [Pine]');		if (!conditionalStatementManager.testStatement('iF [pinE] isA [tRee] thEn [trEe] soMeare [Pine]'))	{		throw "Conditional statement should exist";	}		if (conditionalStatementManager.testStatement('iF [pinE] isA [tRee] thEn [trEe] maDeOf [Pine]'))	{		throw "Conditional statement shouldn't exist";	}		conditionalStatementManager.learnStatement('iF [pinE] isA [tRee] and [TrEE] madeOF [wOOd] thEn [pinE] madEoF [WooD]');		if (!conditionalStatementManager.testStatement('If [PinE] isA [tRee] and [TrEE] madeOF [wOod] thEn [pinE] madEoF [WooD]'))	{		throw "Conditional statement should exist";	}}