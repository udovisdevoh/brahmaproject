//Creates induction reasoning theories based on statistical inference
function Thinker(instinct, conceptNameMapper)
{
	//Parts
	this.conceptNameMapper = conceptNameMapper;
	this.instinct = instinct;
	this.theoryCache = Hash();//As theoryCache[subject]theory[]
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
	throw 'Implement Thinker.getTheoryAbout(subject)';
}

//(Void)
//Produce theories in background or as the request of getTheoryAbout(subject)
//Will write in theoryCache
Thinker.prototype.produceTheoriesAbout = function Thinker_produceTheoriesAbout(subject)
{
	if (!this.theoryCache.hasItem(subject))
	{
		try
		{
			var theorySet = Array();
			
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
			
			//strong or weak induction			
			//the majority of isa animal is madeof blood
			//maybe animal always madeof blood
			
			//argument from analogy
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
			
			//very generic
			//a isa, madeof, from,	partof, madeby, contradict, need, allow, make, like, likedby, originof,	destroyedby or destroy
			//similar to b (very specific)
			//maybe a has [random very short proof connection] too
			
			
			this.theoryCache.setItem(subject, theorySet);
		}
		catch (exception)
		{
			if (!this.isMustStopNow)
				throw exception;
		}
	}
}