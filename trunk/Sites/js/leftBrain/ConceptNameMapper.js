//Maps concept to names and names to concepts
function ConceptNameMapper()
{
	//(Hash<String, Concept>) Map name to concept
	this.mapNameToConcept = new Hash();
	
	//(Hash<Concept, Array of String>) Map concept to name
	this.mapConceptToName = new Hash();
	
	//(Array) List of concepts
	this.conceptList = Array();
	
	//(Array) List of all possible names (concepts and special keywords
	this.allNames = Array('you','me','start','stop','think','ask','teach','talk','yes','no','whatis','define','thinkabout','askabout','teachabout','what','not','talkabout','which','aliasof','unalias','rename','why','how','and');
	
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
		if (this.allNames.indexOf(conceptName) == -1);
		{
			this.allNames.push(conceptName);
			this.allNames.sort();
		}
		
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
//The flattenizer and objection finder are facultative, but highly recommended so we keep consistency
ConceptNameMapper.prototype.alias = function ConceptNameMapper_alias(assimilatorName, assimilatedName, flattenizer, objectionFinder)
{
	assimilatorName = assimilatorName.toLowerCase();
	assimilatedName = assimilatedName.toLowerCase();

	var assimilatorConcept = this.getConcept(assimilatorName);
	var assimilatedConcept = this.getConcept(assimilatedName);
	
	if (assimilatorConcept == assimilatedConcept)
	{
		throw '<span class="AiConcept">' + assimilatorName + '</span> is already the same thing as <span class="AiConcept">' + assimilatedName + '</span>';
	}
	
	
	
	
	//First we try to find an objection to the merge of the two concepts
	if (objectionFinder != null)
	{
		for (var index2 = 0; index2 < assimilatedConcept.tautologyConnections.keys.length; index2++)
		{
			var verb = assimilatedConcept.tautologyConnections.keys[index2];
			if (verb instanceof Concept)
			{
				var tautologicBranch = assimilatedConcept.getTautologicBranch(verb);
				
				if (flattenizer != null)
				{
					var implicitBranch = assimilatedConcept.getImplicitBranch(verb);
					if (!implicitBranch.isFlat)
						if (!implicitBranch.isLocked)
							flattenizer.flattenBranch(implicitBranch, assimilatedConcept, verb);
				}
				
				for (var index = 0; index < tautologicBranch.complementList.length; index++)
				{
					var complement = tautologicBranch.complementList[index];
					if (complement instanceof Concept)
					{
						var objection = objectionFinder.findObjection(assimilatorConcept, verb, complement);
						if (objection != null)
						{
							throw 'Cannot do that because <span class="AiConcept">' + objection.subject + '</span> <span class="AiOperator">' + objection.verb + '</span> <span class="AiConcept">' + objection.complement + '</span>';
						}
					}
				}
			}
		}
	}

	
	
	
	//Then we copy the connections from assimilated concept to assimilator concept
	for (var index2 = 0; index2 < assimilatedConcept.tautologyConnections.keys.length; index2++)
	{
		var verb = assimilatedConcept.tautologyConnections.keys[index2];
		if (verb instanceof Concept)
		{
			var tautologicBranch = assimilatedConcept.getTautologicBranch(verb);
			
			if (flattenizer != null)
			{
				var implicitBranch = assimilatedConcept.getImplicitBranch(verb);
				if (!implicitBranch.isFlat)
					if (!implicitBranch.isLocked)
						flattenizer.flattenBranch(implicitBranch, assimilatedConcept, verb);
			}
			
			for (var index = 0; index < tautologicBranch.complementList.length; index++)
			{
				var complement = tautologicBranch.complementList[index];
				if (complement instanceof Concept)
				{
					this.tautologyManager.addConnection(assimilatorConcept, verb, complement);
					this.tautologyManager.removeConnection(assimilatedConcept, verb, complement);
										
					for (var complementaryVerbIndex = 0; complementaryVerbIndex < verb.complementaryOperators.length; complementaryVerbIndex++)
					{
						var complementaryVerb = verb.complementaryOperators[complementaryVerbIndex];
						if (complementaryVerb instanceof Concept)
						{
							this.tautologyManager.addConnection(complement, complementaryVerb, assimilatorConcept);
							this.tautologyManager.removeConnection(complement, complementaryVerb, assimilatedConcept);
						}
					}
				}
			}
		}
	}
	
	
	
	
	
	this.mapNameToConcept.setItem(assimilatedName, assimilatorConcept);
	
	
	var assimilatorNameList = this.mapConceptToName.getItem(assimilatorConcept);
	var assimilatedNameList = this.mapConceptToName.getItem(assimilatedConcept);
	
	assimilatorNameList.push(assimilatedName);
	
	for (var assimilatedNameIndex = 0; assimilatedNameIndex < assimilatedNameList.length; assimilatedNameIndex++)
	{
		var currentAssimilatedName = assimilatedNameList[assimilatedNameIndex];
		if (assimilatorNameList.indexOf(currentAssimilatedName) == -1)
			assimilatorNameList.push(currentAssimilatedName);
		
		this.mapNameToConcept.setItem(currentAssimilatedName, assimilatorConcept);
	}
	
	this.mapConceptToName.removeItem(assimilatedConcept);
	
	var indexOfAssimilatedConcept = this.conceptList.indexOf(assimilatedConcept);
	if (indexOfAssimilatedConcept != -1)
		this.conceptList.splice(indexOfAssimilatedConcept, 1);
}

//Split two concept names so they don't point to the same concept anymore
//The flattenizer and objection finder are facultative, but highly recommended so we keep consistency
ConceptNameMapper.prototype.unAlias = function ConceptNameMapper_unAlias(conceptName1, conceptName2, flattenizer, objectionFinder)
{
	conceptName1 = conceptName1.toLowerCase();
	conceptName2 = conceptName2.toLowerCase();
	
	var concept1 = this.getConcept(conceptName1);
	var concept2 = this.getConcept(conceptName2);
	
	if (concept1 != concept2)
		throw 'Can\'t unalias because <span class="AiConcept">' + conceptName1 + '</span> is not the same thing as <span class="AiConcept">' + conceptName2 + '</span>';
	else if (conceptName1 == conceptName2)
		throw 'Can\'t unalias a name from itself';
	
	
	//We create a new concept for concept name 2
	var concept2 = new Concept(conceptName2);	
	
	//We copy connections from concept1 to new concept2
	for (var index2 = 0; index2 < concept1.tautologyConnections.keys.length; index2++)
	{
		var verb = concept1.tautologyConnections.keys[index2];
		if (verb instanceof Concept)
		{
			var tautologicBranch = concept1.getTautologicBranch(verb);
			
			if (flattenizer != null)
			{
				var implicitBranch = concept1.getImplicitBranch(verb);
				if (!implicitBranch.isFlat)
					if (!implicitBranch.isLocked)
						flattenizer.flattenBranch(implicitBranch, concept1, verb);
			}
			
			for (var index = 0; index < tautologicBranch.complementList.length; index++)
			{
				var complement = tautologicBranch.complementList[index];
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

	//We set concept2's name list to concept2 name only
	var nameList = Array();
	nameList.push(conceptName2);
	this.mapConceptToName.setItem(concept2, nameList);
	
	//We add new concept2 to concept list
	this.conceptList.push(concept2);
	
	//We remove concept2's name from concept1's name list
	nameList = this.mapConceptToName.getItem(concept1);
	
	var indexOfConcept2Name = nameList.indexOf(conceptName2);
	if (indexOfConcept2Name != -1)
		nameList.splice(indexOfConcept2Name, 1);
}

//Rename a concept to another one
//The flattenizer and objection finder are facultative, but highly recommended so we keep consistency
ConceptNameMapper.prototype.rename = function ConceptNameMapper_rename(conceptName1, conceptName2, flattenizer, objectionFinder)
{
	if (conceptName1 == conceptName2)
	{
		return;
	}

	var concept = this.getConcept(conceptName1);
	conceptName2 = conceptName2.toLowerCase();

	this.mapNameToConcept.removeItem(conceptName1);
	this.mapNameToConcept.setItem(conceptName2, concept);
	
	
	var nameList = this.mapConceptToName.getItem(concept);	
	for (var index = 0; index < nameList.length; index++)
		if (nameList[index] == conceptName1)
			nameList.splice(index,1);
	if (nameList.indexOf(conceptName2) == -1)
		nameList.push(conceptName2);
		
	
	//We change the default concept name if it was concept name 1
	if (concept.defaultConceptName == conceptName1)
		concept.defaultConceptName = conceptName2;
	
	this.mapConceptToName.setItem(concept, nameList);
	
	var positionOfConceptNameOne = this.allNames.indexOf(conceptName1);
	if (positionOfConceptNameOne != -1);
	{
		this.allNames.slice(positionOfConceptNameOne, 1);
		this.allNames.sort();
	}
	
	
	if (this.allNames.indexOf(conceptName2) == -1)
		this.allNames.push(conceptName2);
	
}