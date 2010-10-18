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
	this.need = this.conceptNameMapper.getConcept("need");
	this.allow = this.conceptNameMapper.getConcept("allow");
	this.make = this.conceptNameMapper.getConcept("make");
	this.madeby = this.conceptNameMapper.getConcept("madeby");
	this.destroy = this.conceptNameMapper.getConcept("destroy");
	this.destroyedby = this.conceptNameMapper.getConcept("destroyedby");
	this.largerthan = this.conceptNameMapper.getConcept("largerthan");
	this.smallerthan = this.conceptNameMapper.getConcept("smallerthan");
	
	//Construction of the instinct
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