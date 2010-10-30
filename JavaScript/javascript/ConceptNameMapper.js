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

	for (var index2 = 0; index2 < concept2.tautologyConnections.keys.length; index2++)
	{
		var verb = concept2.tautologyConnections.keys[index2];
		if (verb instanceof Concept)
		{
			var verbBranch = concept2.getTautologicBranch(verb);
			for (var index = 0; index < verbBranch.complementList.length; index++)
			{
				var complement = verbBranch.complementList[index];
				if (complement instanceof Concept)
				{
					this.tautologyManager.addConnection(concept1, verb, complement);
					for (var complementaryVerbIndex = 0; complementaryVerbIndex < verb.complementaryOperators.length; complementaryVerbIndex++)
					{
						var complementaryVerb = verb.complementaryOperators[complementaryVerbIndex];
						if (complementaryVerb instanceof Concept)
						{
							this.tautologyManager.addConnection(complement, complementaryVerb, concept1);
						}
					}
				}
			}
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
	
	for (var index2 = 0; index2 < concept1.tautologyConnections.keys.length; index2++)
	{
		var verb = concept1.tautologyConnections.keys[index2];
		if (verb instanceof Concept)
		{
			var verbBranch = concept1.getTautologicBranch(verb);
			for (var index = 0; index < verbBranch.complementList.length; index++)
			{
				var complement = verbBranch.complementList[index];
				if (complement instanceof Concept)
				{
					this.tautologyManager.addConnection(concept2, verb, complement);
					for (var complementaryVerbIndex = 0; complementaryVerbIndex < verb.complementaryOperators.length; complementaryVerbIndex++)
					{
						var complementaryVerb = verb.complementaryOperators[complementaryVerbIndex];
						if (complementaryVerb instanceof Concept)
						{
							this.tautologyManager.addConnection(complement, complementaryVerb, concept2);
						}
					}
				}
			}
		}
	}
	
	this.mapNameToConcept.setItem(conceptName2, concept2);
	var nameList = Array();
	nameList.push(conceptName2);
	this.mapConceptToName.setItem(concept2, nameList);
	this.conceptList.push(concept2);
}

//Rename a concept to another one
ConceptNameMapper.prototype.rename = function ConceptNameMapper_rename(conceptName1, conceptName2)
{
	var concept1 = this.getConcept(conceptName1);

	this.alias(conceptName1, conceptName2);
	
	conceptName2 = conceptName2.toLowerCase();
	var concept2 = this.getConcept(conceptName2);
	
	this.mapNameToConcept.removeItem(conceptName1);
	var nameList = this.mapConceptToName.getItem(concept2);
	
	for (var index = 0; index < nameList.length; index++)
		if (nameList[index] == conceptName1)
			nameList.splice(index,1); 
			
	for (var index = 0; index < this.conceptList.length; index++)
		if (this.conceptList[index] == concept1)
			this.conceptList.splice(index,1); 
}