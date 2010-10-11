//Represents a concept (subject, verb or complement)
function Concept(defaultConceptName)
{
	//(string) Default concept name (for debugging and etc)
	this.defaultConceptName = defaultConceptName;
	
	//(HashSet<Concept, VerbBranch>) Totology connections
	this.totologyConnections = new Hash();
	
	//(HashSet<Concept, VerbBranch>) Implicit (non-totological) connections
	this.implicitConnections = new Hash();
		
	//(Array of Concept) Complementary operators (should be only one but who knows)
	this.complementaryOperators = Array();
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