//Represents a concept (subject, verb or complement)
function Concept(defaultConceptName)
{
	//(string) Default concept name (for debugging and etc)
	this.defaultConceptName = defaultConceptName;
	
	//(HashSet<Concept, VerbBranch>) Tautology connections
	this.tautologyConnections = new Hash();
	
	//(HashSet<Concept, VerbBranch>) Implicit (non-totological) connections
	this.implicitConnections = new Hash();
		
	//(Array of Concept) Complementary operators (should be only one but who knows)
	this.complementaryOperators = Array();
	
	//(Bool) (stuff like isa, but not someare)
	this.isNaturalOperator = false;
}

//Whether concepts are the same
Concept.prototype.equals = function Concept_equals(other)
{
	return this == other;
}

//(String) get string representation of concept
Concept.prototype.toString = function Concept_toString()
{
	return this.defaultConceptName;
}

//(VerbBranch) get implicit verb branch
Concept.prototype.getImplicitBranch = function Concept_getImplicitBranch(verb)
{
	if (!this.implicitConnections.hasItem(verb))
		this.implicitConnections.setItem(verb, new VerbBranch());
	return this.implicitConnections.getItem(verb);
}

//(VerbBranch) get totologic verb branch
Concept.prototype.getTautologicBranch = function Concept_getTautologicBranch(verb)
{
	if (!this.tautologyConnections.hasItem(verb))
		this.tautologyConnections.setItem(verb, new VerbBranch());
	return this.tautologyConnections.getItem(verb);
}