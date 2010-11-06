//Represents a concept (subject, verb or complement)
function Concept(defaultConceptName)
{
	//(string) Default concept name (for debugging and etc)
	this.defaultConceptName = defaultConceptName;
	
	//(HashSet<Concept, VerbBranch>) Tautology connections
	this.tautologyConnections = new Hash();
	
	//(HashSet<Concept, VerbBranch>) Implicit (non-tautological) connections
	this.implicitConnections = new Hash();
		
	//(Array of Concept) Complementary operators (should be only one but who knows)
	this.complementaryOperators = Array();
	
	//(Array of Concept) Mutually exclusive operators (should be only one but who knows)
	this.mutuallyExclusiveOperators = Array();
	
	//(Bool) (stuff like isa, but not someare)
	this.isNaturalOperator = false;
	
	//(Bool) Some operator cannot be applied to unique concepts like "you" and "me"
	this.isVerbAllowedForUniqueSubject = true;
	
	//(Float) conceptDescriptionRelevance (how much a verb can be relevant to describe a concept)
	this.conceptDescriptionRelevance = 0;
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

//(VerbBranch) get tautologic verb branch
Concept.prototype.getTautologicBranch = function Concept_getTautologicBranch(verb)
{
	if (!this.tautologyConnections.hasItem(verb))
		this.tautologyConnections.setItem(verb, new VerbBranch());
	return this.tautologyConnections.getItem(verb);
}