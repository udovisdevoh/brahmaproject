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

//(Boolean) Whether statements are equal
Statement.prototype.equals = function Statement_equals(other)
{
	return this.subject.equals(other.subject) && this.verb.equals(other.verb) && this.complement.equals(other.complement) && this.isPositive == other.isPositive;
}

//(String) get string representation of statement
Statement.prototype.toString = function Statement_toString()
{
	return this.subject.toString() + ' ' + this.verb.toString() + ' ' + this.complement.toString();
}