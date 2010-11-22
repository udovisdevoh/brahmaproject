//both reptile, mammal and insect are animals
//insect is very differnt from mammal
//maybe insect contradict mammal
function ThinkerFindEnemyBrother(flattenizer, instinct, conceptNameMapper, objectionFinder, proofManager, firstSecondPersonManager)
{
	//Parts
	this.flattenizer = flattenizer;
	this.instinct = instinct;
	this.conceptNameMapper = conceptNameMapper;
	this.objectionFinder = objectionFinder;
	this.proofManager = proofManager;
	this.firstSecondPersonManager = firstSecondPersonManager;
}

//(Void)
//both reptile, mammal and insect are animals
//insect is very differnt from mammal
//maybe insect contradict mammal
ThinkerFindEnemyBrother.prototype.produceTheoriesAbout = function ThinkerFindEnemyBrother_produceTheoriesAbout(theorySet, subject)
{
	//We populate a list of all brother concept (from common "isa" parent
	//We set weight to 1 by default
	var brotherList = new Hash();
	this._populateBrotherList(brotherList, subject, this.instinct.isa);
	
	//We reduce weight if connection to common isa parent has a lot of arguments
	this._reduceWeightAccordingToCommonIsaParentArgumentCount(subject, brotherList);
	
	//We reduce the weight if subject if similar to brother
	//Ignore "isa" for similatude comparison
	//this._reduceWeightAccordingToSimilitude(subject, brotherList);
	
	//We reduce weight if concept has a direct contradict connection with few arguments
	this._reduceAllWeightAccordingToContradictProofShortness(subject, brotherList);
	for (var brotherIndex = 0; brotherIndex < brotherList.keys.length; brotherIndex++)
	{
		var brother = brotherList.keys[brotherIndex];
		this._reduceCurrentWeightAccordingToContradictProofShortness(brother, brotherList);
	}
	
	//We create theories
	for (var brotherIndex = 0; brotherIndex < brotherList.keys.length; brotherIndex++)
	{
		var brother = brotherList.keys[brotherIndex];
		var weight = brotherList.getItem(brother);
		
		if (brother != subject)
		{
			if (weight > 0)
			{
				if (this.objectionFinder.findObjection(subject, this.instinct.contradict, brother) == null)
				{
					var argumentString = '<span class="AiConcept">' + subject.toString() + '</span> different (' + Math.round(weight * 100) + '%) from <span class="AiConcept">' + brother.toString() + '</span>';		
					var theory = new Theory(subject, this.instinct.contradict, brother, weight, argumentString);
					if (this.firstSecondPersonManager.isTheoryValidIfFirstOrSecondPerson(theory))
					{
						theory.style = theory.styleFindEnemyBrother;
						if (theorySet.hasItem(theory.getUniqueKey()))
						{
							var oldTheory = theorySet.getItem(theory.getUniqueKey());
							if (theory.weight > oldTheory.weight && oldTheory.style == theory.style)
							{
								theorySet.setItem(theory.getUniqueKey(), theory);
							}
						}
						else
						{
							theorySet.setItem(theory.getUniqueKey(), theory);
						}
					}
				}
			}
		}
	}
}

//(Void)
//We reduce all weights if subject has a contradict connection with few arguments
ThinkerFindEnemyBrother.prototype._reduceAllWeightAccordingToContradictProofShortness = function ThinkerFindEnemyBrother__reduceAllWeightAccordingToContradictProofShortness(subject, brotherList)
{
	var shortestContradictProof = this._getShortestContradictProof(subject);
	
	if (shortestContradictProof == 0)
	{	
		for (var brotherIndex = 0; brotherIndex < brotherList.keys.length; brotherIndex++)
		{
			var brother = brotherList.keys[brotherIndex];
			var weight = brotherList.getItem(brother);
			weight /= 2;
			brotherList.setItem(brother, weight);
		}
	}
}

//(Void)
//We reduce current weights if subject has a contradict connection with few arguments
ThinkerFindEnemyBrother.prototype._reduceCurrentWeightAccordingToContradictProofShortness = function ThinkerFindEnemyBrother__reduceCurrentWeightAccordingToContradictProofShortness(brother, brotherList)
{
	var shortestContradictProof = this._getShortestContradictProof(brother);
	if (shortestContradictProof == 0)
	{	
		var weight = brotherList.getItem(brother);
		weight /= 2;
		brotherList.setItem(brother, weight);
	}
}

//(Int)
//Find shortest proof length to contradict connection
// -1 if none found
ThinkerFindEnemyBrother.prototype._getShortestContradictProof = function ThinkerFindEnemyBrother__getShortestContradictProof(concept)
{
	var shortestProofLength = -1;
	var implicitBranch = concept.getImplicitBranch(this.instinct.contradict);
		if (!implicitBranch.isFlat)
			if (!implicitBranch.isLocked)
				this.flattenizer.flattenBranch(implicitBranch, concept, this.instinct.contradict);
				
	for (var index = 0; index < implicitBranch.complementList.length; index++)
	{
		var complement = implicitBranch.complementList[index];
		var currentProofLength = this.proofManager.evaluateLength(concept, this.instinct.contradict, complement)
		
		if (currentProofLength < shortestProofLength || shortestProofLength == -1)
		{
			shortestProofLength = currentProofLength;
		}
	}
	return shortestProofLength;
}

//(Void)
//We reduce the weight if subject is similar to brother
//Ignore "isa" for similatude comparison
ThinkerFindEnemyBrother.prototype._reduceWeightAccordingToSimilitude = function ThinkerFindEnemyBrother__reduceWeightAccordingToSimilitude(subject, brotherList)
{
	for (var brotherIndex = 0; brotherIndex < brotherList.keys.length; brotherIndex++)
	{
		var brother = brotherList.keys[brotherIndex];
		var weight = brotherList.getItem(brother);
		var likeness = this._evaluateBrotherLikeness(subject, brother);
		weight -= (weight * likeness);
		brotherList.setItem(brother, weight);
	}
}

//(Float)
//1.0: concepts are pretty much identical
//0: concept have nothing in common
//Ignore "isa" for similatude comparison
ThinkerFindEnemyBrother.prototype._evaluateBrotherLikeness = function ThinkerFindEnemyBrother__evaluateBrotherLikeness(concept1, concept2)
{
	var totalInEitherConcept = 0;
	var totalInConcept1 = 0;
	var totalInConcept2 = 0;
	var commonConnectionCountForBrotherhood = 0;
	
	for (var verbIndex = 0; verbIndex < this.instinct.verbList.length; verbIndex++)
	{
		var verb = this.instinct.verbList[verbIndex];
		if (verb != this.instinct.isa)
		{		
			var weightForVerb = verb.conceptDescriptionRelevance;
			
			var concept1implicitBranch = concept1.getImplicitBranch(verb);
				if (!concept1implicitBranch.isFlat)
					if (!concept1implicitBranch.isLocked)
						this.flattenizer.flattenBranch(concept1implicitBranch, concept1, verb);
											
			var concept2implicitBranch = concept2.getImplicitBranch(verb);
				if (!concept2implicitBranch.isFlat)
					if (!concept2implicitBranch.isLocked)
						this.flattenizer.flattenBranch(concept2implicitBranch, concept2, verb);
						
			for (var complementIndex = 0; complementIndex < concept1implicitBranch.complementList.length; complementIndex++)
			{
				var complement = concept1implicitBranch.complementList[complementIndex];
				var weight = weightForVerb / (this.proofManager.evaluateLength(concept1, verb, complement) + 1);
				if (concept2implicitBranch.complementList.indexOf(complement) != -1)
				{
					commonConnectionCountForBrotherhood += 0.5
					totalInConcept2 += weight;
				}
				totalInEitherConcept += weight;
			}
			
			for (var complementIndex = 0; complementIndex < concept2implicitBranch.complementList.length; complementIndex++)
			{
				var complement = concept2implicitBranch.complementList[complementIndex];
				var weight = weightForVerb / (this.proofManager.evaluateLength(concept2, verb, complement) + 1);
				if (concept1implicitBranch.complementList.indexOf(complement) != -1)
				{
					commonConnectionCountForBrotherhood += 0.5
					totalInConcept1 += weight;
				}			
				totalInEitherConcept += weight;
			}
		}
	}
	
	var brotherLikenessWeight = (totalInConcept1 + totalInConcept2) / totalInEitherConcept;
	
	//We reduce the brother likeness weight if they contradict each others
	/*if (this.flattenizer.testConnection(concept1, this.instinct.contradict, concept2))
	{
		var proofLengthPlusTwo = this.proofManager.evaluateLength(concept1, this.instinct.contradict, concept2) + 2;
		brotherLikenessWeight -= (brotherLikenessWeight / proofLengthPlusTwo);
	}*/
	
	return brotherLikenessWeight;
}

//(Void)
//We reduce weight if connection to common isa parent has a lot of arguments
//Use shortest common "isa" proof length
ThinkerFindEnemyBrother.prototype._reduceWeightAccordingToCommonIsaParentArgumentCount = function ThinkerFindEnemyBrother__reduceWeightAccordingToCommonIsaParentArgumentCount(subject, brotherList)
{
	for (var brotherIndex = 0; brotherIndex < brotherList.keys.length; brotherIndex++)
	{
		var brother = brotherList.keys[brotherIndex];
		var weight = brotherList.getItem(brother);
		
		var commonIsaParentList = this._getCommonIsaParentList(subject, brother);
		
		var shortestProofLength = -1;
		for (var parentIndex = 0; parentIndex < commonIsaParentList.length; parentIndex++)
		{
			var commonIsaParent = commonIsaParentList[parentIndex];
			var proofLength = this.proofManager.evaluateLength(brother, this.instinct.isa, commonIsaParent);
			
			if (shortestProofLength == -1 || proofLength < shortestProofLength)
			{
				shortestProofLength = proofLength;
			}
		}
		
		if (shortestProofLength != -1)
		{
			for (var i = 0; i < shortestProofLength; i++)
			{
				weight *= .8;
			}
		}

		brotherList.setItem(brother, weight);
	}
}

//(Array of concept)
//Get a list of "isa" parent concept that are common for both concept1 and concept2
ThinkerFindEnemyBrother.prototype._getCommonIsaParentList = function ThinkerFindEnemyBrother__getCommonIsaParentList(concept1, concept2)
{
	var implicitBranch1 = concept1.getImplicitBranch(this.instinct.isa);
		if (!implicitBranch1.isFlat)
			if (!implicitBranch1.isLocked)
				this.flattenizer.flattenBranch(implicitBranch1, concept1, this.instinct.isa);
				
	var implicitBranch2 = concept2.getImplicitBranch(this.instinct.isa);
		if (!implicitBranch2.isFlat)
			if (!implicitBranch2.isLocked)
				this.flattenizer.flattenBranch(implicitBranch2, concept2, this.instinct.isa);
				
	var commonIsaParentList = Array();
	
	for (var parentIndex = 0; parentIndex < implicitBranch1.complementList.length; parentIndex++)
	{
		var parent = implicitBranch1.complementList[parentIndex];
		
		if (implicitBranch2.complementList.indexOf(parent) != -1)
		{
			commonIsaParentList.push(parent);
		}
	}
	
	return commonIsaParentList;
}

//(Void)
//populate the list of brother concept
ThinkerFindEnemyBrother.prototype._populateBrotherList = function ThinkerFindEnemyBrother__populateBrotherList(brotherList, subject, verb)
{
	var implicitBranch = subject.getImplicitBranch(verb);
	if (!implicitBranch.isFlat)
		if (!implicitBranch.isLocked)
			this.flattenizer.flattenBranch(implicitBranch, subject, verb);
	
	for (var complementaryVerbIndex = 0; complementaryVerbIndex < verb.complementaryOperators.length; complementaryVerbIndex++)
	{
		var complementaryVerb = verb.complementaryOperators[complementaryVerbIndex];
		
		for (var parentIndex = 0; parentIndex < implicitBranch.complementList.length ; parentIndex++)
		{
			var parentConcept = implicitBranch.complementList[parentIndex]
			var parentImplicitBranch = parentConcept.getImplicitBranch(complementaryVerb);
			if (!parentImplicitBranch.isFlat)
				if (!parentImplicitBranch.isLocked)
					this.flattenizer.flattenBranch(parentImplicitBranch, parentConcept, complementaryVerb);
			
			for (var brotherIndex = 0; brotherIndex < parentImplicitBranch.complementList.length; brotherIndex++)
			{
				var brotherConcept = parentImplicitBranch.complementList[brotherIndex];
				
				if (brotherConcept != subject && !brotherList.hasItem(brotherConcept))
					brotherList.setItem(brotherConcept, 1);
			}
		}
	}
}