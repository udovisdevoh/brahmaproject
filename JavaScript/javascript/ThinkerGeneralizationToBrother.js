//generalization to brothers (argument from analogy)
//the majority of madeof long_hair and isa human like pot
//you madeof long_hair and isa human
//maybe you like pot too
function ThinkerGeneralizationToBrother(flattenizer, instinct, conceptNameMapper, objectionFinder, proofLengthEvaluator, firstSecondPersonManager)
{
	//Parts
	this.flattenizer = flattenizer;
	this.instinct = instinct;
	this.conceptNameMapper = conceptNameMapper;
	this.objectionFinder = objectionFinder;
	this.proofLengthEvaluator = proofLengthEvaluator;
	this.firstSecondPersonManager = firstSecondPersonManager;
}

//(Void)
//generalization to brothers (argument from analogy)
//the majority of madeof long_hair and isa human like pot
//you madeof long_hair and isa human
//maybe you like pot too
//theorySet: (TheorySet): to fill with theories
//(Subject): subject to make theories on
ThinkerGeneralizationToBrother.prototype.produceTheoriesAbout = function ThinkerGeneralizationToBrother_produceTheoriesAbout(theorySet, subject)
{
	//We populate the list of brother concepts
	var brotherList = new Hash();//Key: concept, Value: weight (1.0 = identical, 0 = nothing in common)
	for (var verbIndex = 0; verbIndex < this.instinct.verbList.length; verbIndex++)
	{
		var verb = this.instinct.verbList[verbIndex];
		this._populateBrotherList(brotherList, subject, verb);
	}
	
	//We evaluate the likeness of each brother concept
	for (var brotherIndex = 0; brotherIndex < brotherList.keys.length; brotherIndex++)
	{
		var brotherConcept = brotherList.keys[brotherIndex];
		brotherList.setItem(brotherConcept, this._evaluateBrotherLikeness(subject, brotherConcept));
	}
	
	//We create theories based on connections brother concepts have
	for (var brotherIndex = 0; brotherIndex < brotherList.keys.length; brotherIndex++)
	{
		var brotherConcept = brotherList.keys[brotherIndex];
		var brotherLikeness = brotherList.getItem(brotherConcept);
		this._produceTheoryFromBrotherConcept(theorySet, subject, brotherConcept, brotherLikeness);
	}
}

//(Void)
//Produce theory from brother concept
ThinkerGeneralizationToBrother.prototype._produceTheoryFromBrotherConcept = function ThinkerGeneralizationToBrother__produceTheoryFromBrotherConcept(theorySet, subject, brother, brotherLikeness)
{
	for (var verbIndex = 0; verbIndex < this.instinct.verbList.length; verbIndex++)
	{
		var verb = this.instinct.verbList[verbIndex];
		
		var brotherImplicitBranch = brother.getImplicitBranch(verb);
			if (!brotherImplicitBranch.isFlat)
				if (!brotherImplicitBranch.isLocked)
					this.flattenizer.flattenBranch(brotherImplicitBranch, brother, verb);
					
		for (var complementIndex = 0; complementIndex < brotherImplicitBranch.complementList.length; complementIndex++)
		{
			var complement = brotherImplicitBranch.complementList[complementIndex];
			
			if (complement != subject)
			{
				if (brotherLikeness > 0)
				{
					if (!this.flattenizer.testConnection(subject, verb, complement))
					{
						if (this.objectionFinder.findObjection(subject, verb, complement) == null)
						{	
							var weight = brotherLikeness / (this.proofLengthEvaluator.evaluate(brother, verb, complement) + 1);
							var argumentString = '<span class="AiConcept">' + subject.toString() + '</span> ' + Math.round(weight * 100) + '% similar to <span class="AiConcept">' + brother.toString() + '</span>';
							
							var theory = new Theory(subject, verb, complement, weight, argumentString);						
							if (this.firstSecondPersonManager.isTheoryValidIfFirstOrSecondPerson(theory))
							{	
								theory.style = theory.styleBrotherGeneralization;
								if (theorySet.hasItem(theory.getUniqueKey()))
								{
									var oldTheory = theorySet.getItem(theory.getUniqueKey());
									if (theory.weight > oldTheory.weight)
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
	}
}

//(Float)
//1.0: concepts are pretty much identical
//0: concept have nothing in common
ThinkerGeneralizationToBrother.prototype._evaluateBrotherLikeness = function ThinkerGeneralizationToBrother__evaluateBrotherLikeness(concept1, concept2)
{
	var totalInEitherConcept = 0;
	var totalInConcept1 = 0;
	var totalInConcept2 = 0;
	
	for (var verbIndex = 0; verbIndex < this.instinct.verbList.length; verbIndex++)
	{
		var verb = this.instinct.verbList[verbIndex];
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
			
			if (concept2implicitBranch.complementList.indexOf(complement) != -1)
			{
				totalInConcept2 += weightForVerb;
			}
			
			totalInEitherConcept += weightForVerb;
		}
		
		for (var complementIndex = 0; complementIndex < concept2implicitBranch.complementList.length; complementIndex++)
		{
			var complement = concept2implicitBranch.complementList[complementIndex];
			
			if (concept1implicitBranch.complementList.indexOf(complement) != -1)
			{
				totalInConcept1 += weightForVerb;
			}
			
			totalInEitherConcept += weightForVerb;
		}
	}
	
	return (totalInConcept1 + totalInConcept2) / totalInEitherConcept;
}

//(Void)
//populate the list of brother concept
ThinkerGeneralizationToBrother.prototype._populateBrotherList = function ThinkerGeneralizationToBrother__populateBrotherList(brotherList, subject, verb)
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
					brotherList.setItem(brotherConcept, 0);
			}
		}
	}
}