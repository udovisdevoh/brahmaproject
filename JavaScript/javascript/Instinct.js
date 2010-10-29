//Manages and renders metaOperator connections
function Instinct(complementaryOperatorManager)
{
	//(ConceptNameMapper)
	this.conceptNameMapper = complementaryOperatorManager.conceptNameMapper;

	//(ComplementaryOperatorManager) Manages complementary operators
	this.complementaryOperatorManager = complementaryOperatorManager;
	
	//(MutuallyExclusiveOperatorManager) Manages mutually exclusive operators like isa and contradict
	this.mutuallyExclusiveOperatorManager = new MutuallyExclusiveOperatorManager(this.conceptNameMapper);
	
	//Some common operators
	this.isa = this.conceptNameMapper.getConcept("isa");
	this.someare = this.conceptNameMapper.getConcept("someare");
	this.madeof = this.conceptNameMapper.getConcept("madeof");
	this.partof = this.conceptNameMapper.getConcept("partof");
	this.contradict = this.conceptNameMapper.getConcept("contradict");
	this.need = this.conceptNameMapper.getConcept("need");
	this.allow = this.conceptNameMapper.getConcept("allow");
	this.make = this.conceptNameMapper.getConcept("make");
	this.madeby = this.conceptNameMapper.getConcept("madeby");
	this.destroy = this.conceptNameMapper.getConcept("destroy");
	this.destroyedby = this.conceptNameMapper.getConcept("destroyedby");
	this.largerthan = this.conceptNameMapper.getConcept("largerthan");
	this.smallerthan = this.conceptNameMapper.getConcept("smallerthan");
	this.from = this.conceptNameMapper.getConcept("from");
	this.originof = this.conceptNameMapper.getConcept("originof");
	
	//Verb list
	this.verbList = new Array(
	this.isa,
	this.madeof,
	this.from,
	this.partof,
	this.madeby,
	this.contradict,
	this.someare,
	this.need,
	this.allow,
	this.make,
	this.originof,
	this.largerthan,
	this.smallerthan,
	this.destroyedby,
	this.destroy
	);
	
	//Verb name list
	this.verbNameList = Array();
	for (var index = 0; index < this.verbList.length; index++)
		this.verbNameList.push(this.verbList[index].toString());
	
	//Construction of the instinct
	this.mutuallyExclusiveOperatorManager.add("isa","contradict");
	this.complementaryOperatorManager.add("contradict","contradict");
	this.complementaryOperatorManager.add("synergize","synergize");
	this.complementaryOperatorManager.add("antagonize","antagonize");
	this.complementaryOperatorManager.add("isa","someare");
	this.complementaryOperatorManager.add("madeof","partof");
	this.complementaryOperatorManager.add("need","allow");
	this.complementaryOperatorManager.add("make","madeby");
	this.complementaryOperatorManager.add("destroy","destroyedby");	
	this.complementaryOperatorManager.add("from","originof");
	this.complementaryOperatorManager.add("largerthan","smallerthan");
	this.complementaryOperatorManager.add("own","ownedby");
	this.complementaryOperatorManager.add("without","notpartof");
}