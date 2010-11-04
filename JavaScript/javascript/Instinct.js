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
	this.like = this.conceptNameMapper.getConcept("like");
	this.likedby = this.conceptNameMapper.getConcept("likedby");
	
	//We set the relevence of operators when it gets to describing concepts
	this.isa.conceptDescriptionRelevance = 1.0;
	this.madeof.conceptDescriptionRelevance = 0.5;
	this.make.conceptDescriptionRelevance = 0.25;
	this.allow.conceptDescriptionRelevance = 0.2;
	this.need.conceptDescriptionRelevance = 0.2;
	this.contradict.conceptDescriptionRelevance = 0.2;
	this.like.conceptDescriptionRelevance = 0.16;
	this.from.conceptDescriptionRelevance = 0.125;
	this.partof.conceptDescriptionRelevance = 0.125;
	this.madeby.conceptDescriptionRelevance = 0.125;
	this.likedby.conceptDescriptionRelevance = 0.125;
	this.someare.conceptDescriptionRelevance = 0.05;
	this.originof.conceptDescriptionRelevance = 0.05;
	this.destroyedby.conceptDescriptionRelevance = 0.05;
	this.destroy.conceptDescriptionRelevance = 0.05;
	this.largerthan.conceptDescriptionRelevance = 0;
	this.smallerthan.conceptDescriptionRelevance = 0;
	
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
	this.destroy,
	this.like,
	this.likedby
	);
	
	//Reserved name list
	this.reservedNameList = new Array(
	'not',
	'and',
	'or',
	'define',
	'why',
	'how',
	'yes',
	'no'
	);
	
	//Verb name list
	this.verbNameList = Array();
	for (var index = 0; index < this.verbList.length; index++)
		this.verbNameList.push(this.verbList[index].toString());
	
	//Construction of the instinct
	//this.complementaryOperatorManager.add("synergize","synergize");
	//this.complementaryOperatorManager.add("antagonize","antagonize");
	//this.complementaryOperatorManager.add("own","ownedby");
	//this.complementaryOperatorManager.add("without","notpartof");
	this.mutuallyExclusiveOperatorManager.add("isa","contradict");
	this.mutuallyExclusiveOperatorManager.add("someare","contradict");
	this.mutuallyExclusiveOperatorManager.add("madeof","partof");
	this.mutuallyExclusiveOperatorManager.add("make","madeby");
	this.mutuallyExclusiveOperatorManager.add("isa","someare");
	this.mutuallyExclusiveOperatorManager.add("from","originof");
	this.mutuallyExclusiveOperatorManager.add("largerthan","smallerthan");	
	this.complementaryOperatorManager.add("contradict","contradict");
	this.complementaryOperatorManager.add("isa","someare");
	this.complementaryOperatorManager.add("madeof","partof");
	this.complementaryOperatorManager.add("need","allow");
	this.complementaryOperatorManager.add("make","madeby");
	this.complementaryOperatorManager.add("destroy","destroyedby");	
	this.complementaryOperatorManager.add("from","originof");
	this.complementaryOperatorManager.add("largerthan","smallerthan");
	this.complementaryOperatorManager.add("like","likedby");
}