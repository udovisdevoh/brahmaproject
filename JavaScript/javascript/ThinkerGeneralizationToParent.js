//Creates induction reasoning theories based on statistical inference as
//generalization to parent (strong or weak induction)		
//the majority of isa animal is madeof blood
//maybe animal always madeof blood
function ThinkerGeneralizationToParent(flattenizer, instinct, conceptNameMapper, objectionFinder, proofLengthEvaluator, firstSecondPersonManager)
{
	//Constants
	this.minimumSampleSizeForGeneralization = 2;
	
	//Parts
	this.flattenizer = flattenizer;
	this.instinct = instinct;
	this.conceptNameMapper = conceptNameMapper;
	this.objectionFinder = objectionFinder;
	this.proofLengthEvaluator = proofLengthEvaluator;
	this.firstSecondPersonManager = firstSecondPersonManager;
}

//(Void)
//generalization to parent (strong or weak induction)		
//the majority of isa animal is madeof blood
//maybe animal always madeof blood
//theorySet: (TheorySet): to fill with theories
//(Subject): subject to make theories on
ThinkerGeneralizationToParent.prototype.produceTheoriesAbout = function ThinkerGeneralizationToParent_produceTheoriesAbout(theorySet, subject, verb)
{
	if (verb == null) //For all verbs
	{
		this.produceTheoriesAbout(theorySet, subject, this.instinct.someare);
	}
	else //For a specific verb
	{
		//We obtain the list of child concept
		var implicitBranch = subject.getImplicitBranch(verb);
		if (!implicitBranch.isFlat)
			if (!implicitBranch.isLocked)
				this.flattenizer.flattenBranch(implicitBranch, subject, verb);
		
		var childConceptList = implicitBranch.complementList;
				
		
		
		//We count the connections stubs on child concept (verb + complement)
		var connectionCounter = new Hash();
		var weightCounter = new Hash();
		for (var childConceptIndex = 0; childConceptIndex < childConceptList.length; childConceptIndex++)
		{					
			var childConcept = childConceptList[childConceptIndex];
			
			for (var childVerbIndex = 0; childVerbIndex < this.instinct.verbList.length; childVerbIndex++)
			{
				var childVerb = this.instinct.verbList[childVerbIndex];
				var childImplicitBranch = childConcept.getImplicitBranch(childVerb);
				if (!childImplicitBranch.isFlat)
					if (!childImplicitBranch.isLocked)
						this.flattenizer.flattenBranch(childImplicitBranch, childConcept, childVerb);
				
				var childComplementList = childImplicitBranch.complementList;
					
				for (var childComplementIndex = 0; childComplementIndex < childComplementList.length; childComplementIndex++)
				{
					var childComplement = childComplementList[childComplementIndex];
					
					if (!connectionCounter.hasItem(childVerb))
						connectionCounter.setItem(childVerb, new Hash());
						
					if (!weightCounter.hasItem(childVerb))
						weightCounter.setItem(childVerb, new Hash());
					
					var connectionCounterForVerb = connectionCounter.getItem(childVerb);
					if (!connectionCounterForVerb.hasItem(childComplement))
						connectionCounterForVerb.setItem(childComplement, 0);
						
					var weightCounterForVerb = weightCounter.getItem(childVerb);
					if (!weightCounterForVerb.hasItem(childComplement))
						weightCounterForVerb.setItem(childComplement, 0);
						
					var connectionCounterForVerbComplement = connectionCounterForVerb.getItem(childComplement);
					var weightCounterForVerbComplement = weightCounterForVerb.getItem(childComplement);
					
					var proofLength = this.proofLengthEvaluator.evaluate(childConcept, childVerb, childComplement);
					var valueToAdd = 1 / (proofLength + 1);
					
					connectionCounterForVerb.setItem(childComplement, connectionCounterForVerbComplement + 1);
					weightCounterForVerb.setItem(childComplement, weightCounterForVerbComplement + valueToAdd);
				}
			}
		}
		
		//We create theories for each connection that is not present for subject (parent concept)
		//alert(connectionCounter.keys.length);
		for (var theoryVerbIndex = 0 ; theoryVerbIndex < connectionCounter.keys.length ; theoryVerbIndex++)
		{
			var theoryVerb = connectionCounter.keys[theoryVerbIndex];
			var weightCounterForVerb = weightCounter.getItem(theoryVerb);
			var connectionCounterForVerb = connectionCounter.getItem(theoryVerb);
			
			//alert(connectionCounterForVerb.keys.length + " " + theoryVerb);
			
			for (var theoryComplementIndex = 0; theoryComplementIndex < connectionCounterForVerb.keys.length ; theoryComplementIndex++)
			{
				var theoryComplement = connectionCounterForVerb.keys[theoryComplementIndex];
				
				if (theoryComplement != subject)
				{				
					var connectionsWeight = weightCounterForVerb.getItem(theoryComplement);
					var howManyConnections = connectionCounterForVerb.getItem(theoryComplement);
					
					var probability = 0;
					if (childConceptList.length > 0 && howManyConnections >= this.minimumSampleSizeForGeneralization)
						probability = connectionsWeight / childConceptList.length;
					
					if (probability > 0)
					{
						if (!this.flattenizer.testConnection(subject, theoryVerb, theoryComplement))
						{
							if (this.objectionFinder.findObjection(subject, theoryVerb, theoryComplement) == null)
							{					
								var argumentString = Math.round(probability * 100) + '% of <span class="AiOperator">' + verb.complementaryOperators[0] + '</span> <span class="AiConcept">' + subject + '</span> I know also <span class="AiOperator">' + theoryVerb + '</span> <span class="AiConcept">' + theoryComplement + '</span>';
								//var argumentString = null;
								var theory = new Theory(subject, theoryVerb, theoryComplement, probability, argumentString);
								
								if (this.firstSecondPersonManager.isTheoryValidIfFirstOrSecondPerson(theory))
								{								
									theory.style = theory.styleParentGeneralization;
									if (!theorySet.hasItem(theory.getUniqueKey()))
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