//Creates induction reasoning theories based on statistical inference
function Thinker(flattenizer, instinct, conceptNameMapper, objectionFinder)
{
	//Constants
	this.minimumSampleSizeForGeneralization = 2;
	
	//Parts
	this.flattenizer = flattenizer;
	this.instinct = instinct;
	this.conceptNameMapper = conceptNameMapper;
	this.objectionFinder = objectionFinder;
	this.theoryCache = new Hash();//As theoryCache[subject]theory[]
}

//(Theory)
Thinker.prototype.getTheory = function Thinker_getTheory()
{
	throw 'Implement Thinker.getTheory()';
}

//(Theory)
Thinker.prototype.getTheoryAbout = function Thinker_getTheoryAbout(subject)
{
	this.produceTheoriesAbout(subject);
	
	if (!this.theoryCache.hasItem(subject))
		return null;
		
	var theorySet = this.theoryCache.getItem(subject);
	var bestTheory = null;
	var bestWeight = 0;
	
	for (var theoryIndex = 0; theoryIndex < theorySet.keys.length; theoryIndex++)
	{
		var theoryKey = theorySet.keys[theoryIndex];
		var theory = theorySet.getItem(theoryKey);
		
		if (bestTheory == null || theory.weight > bestWeight)
		{
			bestWeight = theory.weight;
			bestTheory = theory;
		}
	}

	return bestTheory;
}

//(Void)
//Produce theories in background or as the request of getTheoryAbout(subject)
//Will write in theoryCache
Thinker.prototype.produceTheoriesAbout = function Thinker_produceTheoriesAbout(subject)
{
	if (!this.theoryCache.hasItem(subject))
	{
		var theorySet = new Hash();
		
		/*
		Approximate list of operator sorted by there relevance in describing a concept
		isa
		madeof
		make
		allow
		need
		contradict
		like
		from
		partof
		madeby
		likedby
		someare
		originof
		destroyedby
		destroy
		largerthan
		smallerthan
		*/
		
		//todo: produce theories here
		//the longer a proof is for a connection, the least relevent it will be considered
		
		//generalization to parent (strong or weak induction)		
		//the majority of isa animal is madeof blood
		//maybe animal always madeof blood
		this.produceTheoriesGeneralizationToParent(theorySet, false, subject);
		this.produceTheoriesGeneralizationToParent(theorySet, true, subject);
		
		//generalization to brother (argument from analogy)
		//the majority of madeof long_hair and isa human like pot
		//you madeof long_hair and isa human
		//maybe you like pot too
		
		//enemy brothers
		//cold isa temperature and contradict hot
		//maybe hot isa temperature too
		
		//things madeof same thing cause same things
		//french_fry madeof trans_fat and cause obesity
		//donut madeof trans_fat
		//maybe donut cause obesity too
		
		//Human madeof big brain
		//big brain make (or allow) inductive_reasoning
		//maybe human make inductive_reasoning
		
		//very generic
		//we find a concept's closest relative and try to import a property from it
		//a isa, madeof, from,	partof, madeby, contradict, need, allow, make, like, likedby, originof,	destroyedby or destroy
		//similar to b (very specific)
		//maybe a has [random very short proof connection] too
		
		
		this.theoryCache.setItem(subject, theorySet);
	}
}

//(Void)
//generalization to parent (strong or weak induction)		
//the majority of isa animal is madeof blood
//maybe animal always madeof blood
//theorySet: (TheorySet): to fill with theories
//isFlat: (Bool): whether we will use flat connections or tautologic connections
//(Subject): subject to make theories on
Thinker.prototype.produceTheoriesGeneralizationToParent = function Thinker_produceTheoriesGeneralizationToParent(theorySet, isFlat, subject, verb)
{
	if (verb == null) //For all verbs
	{
		this.produceTheoriesGeneralizationToParent(theorySet, isFlat, subject, this.instinct.someare);
	}
	else //For a specific verb
	{
		//We obtain the list of child concept
		var implicitBranch = subject.getImplicitBranch(verb);
		if (!implicitBranch.isFlat)
			if (!implicitBranch.isLocked)
				this.flattenizer.flattenBranch(implicitBranch, subject, verb);
		var tautologicBranch = subject.getTautologicBranch(verb);
		var childConceptList;			
		if (isFlat)
			childConceptList = implicitBranch.complementList;
		else
			childConceptList = tautologicBranch.complementList;
				
		
		
		//We count the connections stubs on child concept (verb + complement)
		var connectionCounter = new Hash();
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
				var childTautologicBranch = childConcept.getTautologicBranch(childVerb);
				
				var childComplementList;
				if (isFlat)
					childComplementList = childImplicitBranch.complementList;
				else
					childComplementList = childTautologicBranch.complementList;
					
				for (var childComplementIndex = 0; childComplementIndex < childComplementList.length; childComplementIndex++)
				{
					var childComplement = childComplementList[childComplementIndex];
					
					if (!connectionCounter.hasItem(childVerb))
						connectionCounter.setItem(childVerb, new Hash());
					var connectionCounterForVerb = connectionCounter.getItem(childVerb);
					
					if (!connectionCounterForVerb.hasItem(childComplement))
						connectionCounterForVerb.setItem(childComplement, 0);
						
					var connectionCounterForVerbComplement = connectionCounterForVerb.getItem(childComplement);
					
					connectionCounterForVerb.setItem(childComplement, connectionCounterForVerbComplement + 1);
				}
			}
		}
		
		//We create theories for each connection that is not present for subject (parent concept)
		//alert(connectionCounter.keys.length);
		for (var theoryVerbIndex = 0 ; theoryVerbIndex < connectionCounter.keys.length ; theoryVerbIndex++)
		{
			var theoryVerb = connectionCounter.keys[theoryVerbIndex];
			var connectionCounterForVerb = connectionCounter.getItem(theoryVerb);
			
			//alert(connectionCounterForVerb.keys.length + " " + theoryVerb);
			
			for (var theoryComplementIndex = 0; theoryComplementIndex < connectionCounterForVerb.keys.length ; theoryComplementIndex++)
			{
				var theoryComplement = connectionCounterForVerb.keys[theoryComplementIndex];
				
				if (theoryComplement != subject)
				{				
					var howManyConnection = connectionCounterForVerb.getItem(theoryComplement);
					
					var probability = 0;
					if (childConceptList.length > 0 && howManyConnection >= this.minimumSampleSizeForGeneralization)
						probability = howManyConnection / childConceptList.length;
					
					if (probability > 0)
					{
						if (!this.flattenizer.testConnection(subject, theoryVerb, theoryComplement))
						{
							if (this.objectionFinder.findObjection(subject, theoryVerb, theoryComplement) == null)
							{					
								var argumentString = Math.round(probability * 100) + '% of <span class="AiOperator">' + verb.complementaryOperators[0] + '</span> <span class="AiConcept">' + subject + '</span> I know about also <span class="AiOperator">' + theoryVerb + '</span> <span class="AiConcept">' + theoryComplement + '</span>';
								var theory = new Theory(subject, theoryVerb, theoryComplement, probability, argumentString);						
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