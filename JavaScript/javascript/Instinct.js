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
Instinct.prototype.render = function Instinct_render(evaluator, subject, verb, complement)
{
	//Render stuff like: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
	this.renderSelfRecursiveOperator(evaluator, this.madeof, subject, verb, complement);
	
	//Render stuff like: if [pine] isa [tree] and [tree] [madeof] [wood] then [pine] [madeof] [wood]
	//todo
	
	//Render stuff like: if [tree] [madeof] [wood] and [wood] isa [matter] then [pine] [madeof] [matter]
	//todo

	throw 'Implement Instinct.render()';
}

//Constant as: Evaluator.resultTrue, Evaluator.resultFalse,
//Render stuff like: if [tree] [madeof] [wood] and [wood] [madeof] [water] then [tree] [madeof] [water]
Instinct.prototype.renderSelfRecursiveOperator = function Instinct_renderSelfRecursiveOperator(evaluator, recursiveOperator, subjectToTest, verbToTest, complementToTest)
{
	for (var index1 in this.conceptNameMapper.mapConceptToName)
	{
		var immediateComplement = this.conceptNameMapper.mapConceptToName[index1];
		for (var index2 in this.conceptNameMapper.mapConceptToName)
		{
			var remoteComplement = this.conceptNameMapper.mapConceptToName[index2];
			
			if (evaluator.circularReasoningPreventionMemory.getCachedResult(subjectToTest, recursiveOperator, immediateComplement, evaluator.resultUnknown) != evaluator.resultBeingCurrentlyEvaluated)
			{
				throw "mofo";
				if (evaluator.circularReasoningPreventionMemory.getCachedResult(immediateComplement, recursiveOperator, remoteComplement, evaluator.resultUnknown) != evaluator.resultBeingCurrentlyEvaluated)
				{
					var immediateResult = evaluator.eval(subjectToTest, recursiveOperator, immediateComplement);
					var remoteResult = evaluator.eval(immediateComplement, recursiveOperator, remoteComplement);
					if (immediateResult == evaluator.resultTrue && remoteResult == evaluator.resultTrue)
					{			
						evaluator.proofCache.addProofArgument(subjectToTest, verbToTest, complementToTest, subjectToTest, recursiveOperator, immediateComplement, immediateResult == evaluator.resultTrue);
						evaluator.proofCache.addProofArgument(subjectToTest, verbToTest, complementToTest, immediateComplement, recursiveOperator, remoteComplement, remoteResult == evaluator.resultTrue);
						return evaluator.resultTrue;
					}
				}
			}
			
		}
	}
	
	return evaluator.resultUnknown;
}