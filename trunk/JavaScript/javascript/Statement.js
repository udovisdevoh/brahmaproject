//Statement (subject, verb, complement)
function Statement(subject, verb, complement, isPositive)
{
	//(Concept) Subject (concept)
	this.subject = subject;
	
	//(Concept) Verb (concept)
	this.verb = verb;
	
	//(Concept) Complement (concept)
	this.complement = complement;
	
	//(Bool) Whether statement is positive
	this.isPositive = isPositive;
}

//Whether statements are equal
Statement.prototype.equals = function Statement_equals(other)
{
	return this.subject == other.subject && this.verb == other.verb && this.complement == other.complement && this.isPositive == other.isPositive;
}