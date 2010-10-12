//Manages and renders metaOperator connections
function Instinct(complementaryOperatorManager)
{
	//(ConceptNameMapper)
	this.conceptNameMapper = complementaryOperatorManager.conceptNameMapper;

	//(ComplementaryOperatorManager) Manages complementary operators
	this.complementaryOperatorManager = complementaryOperatorManager;
	
	//Some common operators
	this.isa = this.conceptNameMapper.getConcept("isa");
	this.someare = this.conceptNameMapper.getConcept("someare");
	this.madeof = this.conceptNameMapper.getConcept("madeof");
	this.partof = this.conceptNameMapper.getConcept("partof");
	this.contradict = this.conceptNameMapper.getConcept("contradict");
	
	//Construction of the instinct
	this.complementaryOperatorManager.add("contradict","contradict");
	this.complementaryOperatorManager.add("synergize","synergize");
	this.complementaryOperatorManager.add("antagonize","antagonize");
	this.complementaryOperatorManager.add("isa","someare");
	this.complementaryOperatorManager.add("madeof","partof");
	this.complementaryOperatorManager.add("need","allow");
	this.complementaryOperatorManager.add("make","madeby");
	this.complementaryOperatorManager.add("somebecome","somewas");
	this.complementaryOperatorManager.add("oppress","oppressedby");	
	this.complementaryOperatorManager.add("from","originof");
	this.complementaryOperatorManager.add("largerthan","smallerthan");
	this.complementaryOperatorManager.add("own","ownedby");
	this.complementaryOperatorManager.add("without","notpartof");
}

//Constant as: Evaluator.resultTrue, Evaluator.resultFalse,
//Evaluator.resultUnknown
Instinct.prototype.render = function Instinct_render(flattenizer, subject, verb, implicitBranch)
{
	//Render stuff like: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
	if (verb == this.madeof)
		this.renderSelfRecursiveOperator(flattenizer, subject, verb, implicitBranch);
	
	//Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
	//todo
	
	//Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [pine] [madeof] [matter]
	//todo
}

//Constant as: Evaluator.resultTrue, Evaluator.resultFalse,
//Render stuff like: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
Instinct.prototype.renderSelfRecursiveOperator = function Instinct_renderSelfRecursiveOperator(flattenizer, subjectToTest, selfRecursiveVerb, implicitBranch)
{
	for (var index1 in implicitBranch.complementList)
	{
		var immediateComplement = implicitBranch.complementList[index1];
		
		var remoteImplicitBranch = immediateComplement.getImplicitBranch(selfRecursiveVerb);
		
		if (!remoteImplicitBranch.isFlat)
		{
			throw 'Must flatten branch';
			//if (!flattenizer.circularEvaluationPreventionCache.getCachedResult(subjectToTest, selfRecursiveVerb, immediateComplement))
		}
		
		for (var index2 in remoteImplicitBranch.complementList)
		{
			var remoteComplement = remoteImplicityBranch.complementList[index1];
			
			flattenizer.proofCache.addProofArgument(subjectToTest, selfRecursiveVerb, remoteComplement, subjectToTest, recursiveOperator, immediateComplement, true);
			flattenizer.proofCache.addProofArgument(subjectToTest, selfRecursiveVerb, remoteComplement, immediateComplement, recursiveOperator, remoteComplement, true);
			implicitBranch.addComplement(remoteComplement);
		}
	}
}