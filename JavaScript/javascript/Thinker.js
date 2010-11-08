//Creates induction reasoning theories based on statistical inference
function Thinker(flattenizer, instinct, conceptNameMapper, objectionFinder, proofLengthEvaluator, firstSecondPersonManager)
{
	//Constants
	this.maxIgnoreListLength = 50;
	this.maxRandomConceptTheorySamplingSize = 7;
	
	//Parts
	this.thinkerGeneralizationToParent = new ThinkerGeneralizationToParent(flattenizer, instinct, conceptNameMapper, objectionFinder, proofLengthEvaluator, firstSecondPersonManager);
	this.thinkerGeneralizationToBrother = new ThinkerGeneralizationToBrother(flattenizer, instinct, conceptNameMapper, objectionFinder, proofLengthEvaluator, firstSecondPersonManager);
	this.thinkerFindParentOfEnemyBrother = new ThinkerFindParentOfEnemyBrother(flattenizer, instinct, conceptNameMapper, objectionFinder, proofLengthEvaluator, firstSecondPersonManager);
	this.flattenizer = flattenizer;
	this.instinct = instinct;
	this.conceptNameMapper = conceptNameMapper;
	this.objectionFinder = objectionFinder;
	this.proofLengthEvaluator = proofLengthEvaluator;
	this.firstSecondPersonManager = firstSecondPersonManager;
	this.theoryCache = new Hash();//As theoryCache[subject]theory[]
	this.ignoreList = Array();//Array of strings (as unique keys of theories)
}

//(Theory)
Thinker.prototype.getTheory = function Thinker_getTheory()
{
	while (this.ignoreList.length > this.maxIgnoreListLength)
		this.ignoreList.splice(0,1);
		
	var bestTheory = null;
	for (var counter = 0; counter < this.maxRandomConceptTheorySamplingSize; counter++)
	{
		var concept = this.conceptNameMapper.conceptList[Math.floor(Math.random() * this.conceptNameMapper.conceptList.length)];
		var theory = this._getTheoryAbout(concept);
		
		if (theory != null)
		{
			if (bestTheory == null || theory.weight > bestTheory.weight)
			{
				bestTheory = theory;
			}
		}
	}
	
	if (bestTheory != null)
		this.ignoreList.push(bestTheory.getUniqueKey());
	
	return bestTheory;
}

//(Theory)
Thinker.prototype.getTheoryAbout = function Thinker_getTheoryAbout(subject)
{
	while (this.ignoreList.length > this.maxIgnoreListLength)
		this.ignoreList.splice(0,1);

	var bestTheory = this._getTheoryAbout(subject);

	if (bestTheory != null)
	{
		this.ignoreList.push(bestTheory.getUniqueKey());		
		if (bestTheory.subject != subject && bestTheory.verb.complementaryOperators.length > 0)
		{
			var temp = bestTheory.subject;
			bestTheory.subject = bestTheory.complement;
			bestTheory.complement = temp;
			bestTheory.verb = bestTheory.verb.complementaryOperators[0];
		}
	}
	
	return bestTheory;
}

//(Theory)
Thinker.prototype._getTheoryAbout = function Thinker__getTheoryAbout(subject)
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
			if (this.ignoreList.indexOf(theory.getUniqueKey()) == -1)
			{
				bestWeight = theory.weight;
				bestTheory = theory;
			}
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
		this.thinkerGeneralizationToParent.produceTheoriesAbout(theorySet, subject);
		
		//since new_france isa colony and new_france contradict new_england,
		//(and there is no concept from which both new_france and new_england inherit)
		//maybe new_england isa colony too
		this.thinkerFindParentOfEnemyBrother.produceTheoriesAbout(theorySet, subject);
		
		//generalization to brothers (argument from analogy)
		//the majority of madeof long_hair and isa human like pot
		//you madeof long_hair and isa human
		//maybe you like pot too
		this.thinkerGeneralizationToBrother.produceTheoriesAbout(theorySet, subject);

		//both reptile, mammal and insect are animals
		//insect is very differnt from mammal
		//maybe insect contradict mammal
		
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