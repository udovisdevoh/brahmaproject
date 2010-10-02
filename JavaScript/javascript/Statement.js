//Statement (subject, verb, complement)
function Statement(subject, verb, complement, isPositive)
{
	//(Concept or AnonymousConcept) Subject (concept)
	this.subject = subject;
	
	//(Concept or AnonymousConcept) Verb (concept)
	this.verb = verb;
	
	//(Concept or AnonymousConcept) Complement (concept)
	this.complement = complement;
	
	//(Bool) Whether statement is positive
	this.isPositive = isPositive;
}

//Whether statements are equal
Statement.prototype.equals = function Statement_equals(other)
{
	return this.subject.equals(other.subject) && this.verb.equals(other.verb) && this.complement.equals(other.complement) && this.isPositive.equals(other.isPositive);
}