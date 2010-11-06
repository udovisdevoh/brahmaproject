//Theory
function Theory(subject, verb, complement, weight, argumentString)
{
	this.subject = subject; //(Concept)
	this.verb = verb; //(Concept)
	this.complement = complement; //(Concept)
	this.argumentString = argumentString; //(String, could be anything)
	this.weight = weight = weight; //(Float): weight of the theory
	this._stringRepresentation = null;
	this._uniqueKey = null;
	
	if (!this.verb.isNaturalOperator && this.verb.complementaryOperators.length > 0)
	{
		var temp = this.complement;
		this.complement = this.subject;
		this.subject = temp;
		this.verb = this.verb.complementaryOperators[0];
	}
}

//(String) String representation of the theory (what the AI will ask)
Theory.prototype.toString = function Theory_toString()
{
	if (this._stringRepresentation == null)
	{
		this._stringRepresentation = 'does <span class="AiConcept">' + this.subject.toString() + '</span> always <span class="AiOperator">' + this.verb.toString() + '</span> <span class="AiConcept">' + this.complement.toString() + '</span>';

		/*if (this.verb.complementaryOperators.length > 0)
			this._stringRepresentation += ' and <span class="AiConcept">' + this.complement.toString() + '</span> always <span class="AiOperator">' + this.verb.complementaryOperators[0].toString() + '</span> <span class="AiConcept">' + this.subject.toString() + '</span>';*/

		this._stringRepresentation += '?';
		
		if (this.argumentString != null)
			this._stringRepresentation = 'Since ' + this.argumentString + ', ' + this._stringRepresentation;
	}
	return this._stringRepresentation;
}

//(String) Unique identifier for question (will also be recoginzed if question's verb form (active/passive) is inverted)
Theory.prototype.getUniqueKey = function Theory_getUniqueKey()
{
	if (this._uniqueKey == null)
		this._uniqueKey = this.subject.toString() + ' ' + this.verb.toString() + ' ' + this.complement.toString();
	return this._uniqueKey;
}