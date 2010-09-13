//Represents a concept (subject, verb or complement)
function Concept(defaultConceptName)
{
	//Default concept name (for debugging and etc)
	this.defaultConceptName = defaultConceptName;
	
	//Concepts connections as subject.connections[verb][complementIndex]complement
	this.connections = Array();
}