//Manages conditional statementsfunction ConditionalStatementManager(conceptNameMapper){	//(ConceptNameMapper) Maps names to concepts	this.conceptNameMapper = conceptNameMapper;		//(ConditionalStatementMemory) Stores and retrieves conditional statement	this.conditionalStatementMemory = new ConditionalStatementMemory();}