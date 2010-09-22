//Represents anonymous concepts that are used for conditional statements
function AnonymousConcept(id)
{
	//(int) anonymouse concept's id
	this.id = id;
}

//Whether anonymous concepts are equal
AnonymousConcept.prototype.equals = function AnonymousConcept_equals(other)
{
	return this.id == other.id;
}