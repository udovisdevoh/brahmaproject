//Maps concept to names and names to concepts
function ConceptNameMapper()
{
	//(Hash<String, Concept>) Map name to concept
	this.mapNameToConcept = new Hash();
	
	//(Hash<Concept, Array of String>) Map concept to name
	this.mapConceptToName = new Hash();
	
	//(Array) List of concepts
	this.conceptList = Array();
	
	//(TautologyManager)
	this.tautologyManager = new TautologyManager();
}

//Get concept from name
ConceptNameMapper.prototype.getConcept = function ConceptNameMapper_getConcept(conceptName)
{
	conceptName = conceptName.toLowerCase();

	var concept;
	if (!this.mapNameToConcept.hasItem(conceptName))
	{
		concept = new Concept(conceptName);
		this.mapNameToConcept.setItem(conceptName, concept);		
		var conceptNameList = Array();
		conceptNameList.push(conceptName);
		this.mapConceptToName.setItem(concept, conceptNameList);
		this.conceptList.push(concept);
	}
	else
	{
		concept = this.mapNameToConcept.getItem(conceptName);
	}
	return concept;
}

//Merge two concept names so they point to the same concept
ConceptNameMapper.prototype.alias = function ConceptNameMapper_alias(conceptName1, conceptName2)
{
	conceptName1 = conceptName1.toLowerCase();
	conceptName2 = conceptName2.toLowerCase();

	var concept1 = this.getConcept(conceptName1);
	var concept2 = this.getConcept(conceptName2);
	
	if (concept1 == concept2)
	{
		return;
	}

	for (var verb in concept2.connections)
	{
		for (var complement in concept2.connections[verb])
		{
			tautologyManager.addConnection(concept1, verb, complement);
		}
	}
	
	this.mapNameToConcept.setItem(conceptName2, concept1);
	var nameList = new Array();
	nameList.push(conceptName2);
	this.mapConceptToName.setItem(concept1, nameList);
	this.mapConceptToName.removeItem(concept2);
}

//Split two concept names so they don't point to the same concept anymore
ConceptNameMapper.prototype.unAlias = function ConceptNameMapper_unAlias(conceptName1, conceptName2)
{
	conceptName1 = conceptName1.toLowerCase();
	conceptName2 = conceptName2.toLowerCase();
	
	var concept1 = this.getConcept(conceptName1);
	var concept2 = this.getConcept(conceptName2);
	
	if (concept1 != concept2)
	{
		return;
	}
	
	var concept2 = new Concept(conceptName2);
	
	for (var verb in concept1.connections)
	{
		for (var complement in concept1.connections[verb])
		{
			tautologyManager.addConnection(concept2, verb, complement);
		}
	}
	
	this.mapNameToConcept.setItem(conceptName2, concept2);
	var nameList = Array();
	nameList.push(conceptName2);
	this.mapConceptToName.setItem(concept2, nameList);
	this.conceptList.push(concept2);
}