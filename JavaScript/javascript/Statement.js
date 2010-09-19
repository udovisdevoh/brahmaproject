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