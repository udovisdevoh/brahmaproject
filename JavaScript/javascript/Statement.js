//Statement (subject, verb, complement)
function Statement(subject, verb, complement, isPositive)
{
	//Subject (concept)
	this.subject = subject;
	
	//Verb (concept)
	this.verb = verb;
	
	//Complement (concept)
	this.complement = complement;
	
	//Whether statement is positive
	this.isPositive = isPositive;
}