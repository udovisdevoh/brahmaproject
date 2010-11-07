//since new_france isa colony and new_france contradict new_england,
//(and there is no concept from which both new_france and new_england inherit)
//maybe new_england isa colony too
function ThinkerFindParentOfEnemyBrother(flattenizer, instinct, conceptNameMapper, objectionFinder, proofLengthEvaluator, firstSecondPersonManager)
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
//since new_france isa colony and new_france contradict new_england,
//(and there is no concept from which both new_france and new_england inherit)
//maybe new_england isa colony too
ThinkerFindParentOfEnemyBrother.prototype.produceTheoriesAbout = function ThinkerFindParentOfEnemyBrother_produceTheoriesAbout(theorySet, subject)
{
	//We populate the list of contradictory concepts (enemy brother)
	//We give more weight if the contradiction's connection has few arguments in the proof
	//Hash<Concept, enemyBrotherWeight>
	var enemyBrotherList = this._getEnemyBrotherList(subject);

	//We give more weight if the subject has no common isa parent with enemy brother
	//If they do have one, we give more weight if the connection to isa parent has a lot of arguments in the proof
	this._adjustWeightAccordingToCommonIsaParent(subject, enemyBrotherList);
	
	//If the enemy brother has a isa parent that the subject don't,
	//we give more weight if the isa parent's connection doesn't have much arguments
	//If not: weight = 0, we can't create a theory for this brother
	//We produce theories according to weight
	for (var enemyBrotherIndex = 0; enemyBrotherIndex < enemyBrotherList.keys.length; enemyBrotherIndex++)
	{
		var enemyBrother = enemyBrotherList.keys[enemyBrotherIndex];
		var enemyBrotherWeight = enemyBrotherList.getItem(enemyBrother);
		
		//Hash<Concept, complementWeight>
		var isaParentList = this._getNewIsaParentList(subject, enemyBrother);
		
		for (var complementIndex = 0; complementIndex < isaParentList.keys.length; complementIndex++)
		{
			var complement = isaParentList.keys[complementIndex];
			var complementWeight = isaParentList.getItem(complement);
			
			var weight = enemyBrotherWeight * complementWeight;
			
			if (complement != subject)
			{
				if (weight > 0)
				{
					if (!this.flattenizer.testConnection(subject, this.instinct.isa, complement))
					{
						if (this.objectionFinder.findObjection(subject, this.instinct.isa, complement) == null)
						{	
							var argumentString = 'like (' + Math.round(weight * 100) + '%) <span class="AiConcept">' + enemyBrother.toString() + '</span>';
							var theory = new Theory(subject, this.instinct.isa, complement, weight, argumentString);
							theory.style = theory.styleFindParentOfEnemyBrother;
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
}

//(Hash<Concept, float (weight)>)
//We populate the list of contradictory concepts (enemy brother)
//We give more weight if the contradiction's connection has few arguments in the proof
ThinkerFindParentOfEnemyBrother.prototype._getEnemyBrotherList = function ThinkerFindParentOfEnemyBrother__getEnemyBrotherList(subject)
{
	var implicitBranch = subject.getImplicitBranch(this.instinct.contradict);
		if (!implicitBranch.isFlat)
			if (!implicitBranch.isLocked)
				this.flattenizer.flattenBranch(implicitBranch, subject, this.instinct.contradict);
	
	var enemyBrotherList = new Hash();
	
	for (var enemyBrotherIndex = 0; enemyBrotherIndex < implicitBranch.complementList.length; enemyBrotherIndex++)
	{
		var enemyBrother = implicitBranch.complementList[enemyBrotherIndex];
		var weight = 1 / (this.proofLengthEvaluator.evaluate(subject, this.instinct.contradict, enemyBrother) + 1);
		enemyBrotherList.setItem(enemyBrother, weight);
	}
	
	return enemyBrotherList;
}

//(Void)
//We give more weight if the subject has no common isa parent with enemy brother
//If they do have one, we give more weight if the connection to isa parent has a lot of arguments in the proof
ThinkerFindParentOfEnemyBrother.prototype._adjustWeightAccordingToCommonIsaParent = function ThinkerFindParentOfEnemyBrother__adjustWeightAccordingToCommonIsaParent(subject, enemyBrotherList)
{
	for (var enemyBrotherIndex = 0; enemyBrotherIndex < enemyBrotherList.keys.length; enemyBrotherIndex++)
	{
		var enemyBrother = enemyBrotherList.keys[enemyBrotherIndex];
		var weight = enemyBrotherList.getItem(enemyBrother);
		
		var commonIsaParentList = this._getCommonIsaParentList(subject, enemyBrother);
		
		for (var parentIndex = 0; parentIndex < commonIsaParentList.length; parentIndex++)
		{
			var commonIsaParent = commonIsaParentList[parentIndex];
			weight /= (this.proofLengthEvaluator.evaluate(enemyBrother, this.instinct.isa, commonIsaParent) + 1);
		}
		
		enemyBrotherList.setItem(enemyBrother, weight);
	}
}

//(Array of concept)
//Get a list of "isa" parent concept that are common for both concept1 and concept2
ThinkerFindParentOfEnemyBrother.prototype._getCommonIsaParentList = function ThinkerFindParentOfEnemyBrother__getCommonIsaParentList(concept1, concept2)
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

//Hash<Concept, complementWeight>
//Get list of "isa" parent concepts that are only available on concept2, but not concept1
//Set weight higher if conncetion to parent has few arguments
ThinkerFindParentOfEnemyBrother.prototype._getNewIsaParentList = function ThinkerFindParentOfEnemyBrother__getNewIsaParentList(concept1, concept2)
{
	var implicitBranch1 = concept1.getImplicitBranch(this.instinct.isa);
		if (!implicitBranch1.isFlat)
			if (!implicitBranch1.isLocked)
				this.flattenizer.flattenBranch(implicitBranch1, concept1, this.instinct.isa);
				
	var implicitBranch2 = concept2.getImplicitBranch(this.instinct.isa);
		if (!implicitBranch2.isFlat)
			if (!implicitBranch2.isLocked)
				this.flattenizer.flattenBranch(implicitBranch2, concept2, this.instinct.isa);
	
	var newIsaParentList = new Hash();
	
	for (var parentIndex = 0; parentIndex < implicitBranch2.complementList.length; parentIndex++)
	{
		var parent = implicitBranch2.complementList[parentIndex];
		
		if (implicitBranch1.complementList.indexOf(parent) == -1)
		{
			var weight = 1 / (this.proofLengthEvaluator.evaluate(concept2, this.instinct.isa, parent) + 1);
			newIsaParentList.setItem(parent, weight);
		}
	}
				
	return newIsaParentList;
}