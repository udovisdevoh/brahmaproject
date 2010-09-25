//Represents a concept (subject, verb or complement)
function Concept(defaultConceptName)
{
	//(string) Default concept name (for debugging and etc)
	this.defaultConceptName = defaultConceptName;
	
	//(Array) Totology connections as subject.connections[verb][complementIndex]complement
	this.totologyConnections = Array();
	
	//(Array of concept) Complementary operators (should be only one but who knows)
	this.complementaryOperators = Array();
}

//Whether concepts are the same
Concept.prototype.equals = function Concept_equals(other)
{
	return this == other;
}