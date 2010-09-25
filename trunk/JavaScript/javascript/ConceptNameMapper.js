//Maps concept to names and names to concepts
function ConceptNameMapper()
{
	//(Array) Map name to concept
	this.mapNameToConcept = Array();
	
	//(Array) Map concept to name
	this.mapConceptToName = Array();
	
	//(ConnectionManager)
	this.connectionManager = new ConnectionManager();
}

//Get concept from name
ConceptNameMapper.prototype.getConcept = function ConceptNameMapper_getConcept(conceptName)
{
	conceptName = conceptName.toLowerCase();

	var concept;
	if (this.mapNameToConcept[conceptName] == null)
	{
		concept = new Concept(conceptName);
		this.mapNameToConcept[conceptName] = concept;
		this.mapConceptToName[concept] = Array();
		this.mapConceptToName[concept].push(conceptName);
	}
	else
	{
		concept = this.mapNameToConcept[conceptName];
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
			connectionManager.addConnection(concept1, verb, complement);
		}
	}
	
	this.mapNameToConcept[conceptName2] = concept1;
	this.mapConceptToName[concept1].push(conceptName2);
	this.mapConceptToName.splice(concept2, 1);
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
			connectionManager.addConnection(concept2, verb, complement);
		}
	}
	
	this.mapNameToConcept[conceptName2] = concept2;
	this.mapConceptToName[concept2] = Array();
	this.mapConceptToName[concept2].push(conceptName2);
}