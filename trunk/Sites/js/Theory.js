//Theory
function Theory(subject, verb, complement, weight, argumentString)
{
	//Constants
	this.styleParentGeneralization = 0;
	this.styleBrotherGeneralization = 1;
	this.styleFindParentOfEnemyBrother = 2;
	this.styleFindEnemyBrother = 3;

	//Parts and fields
	this.style;
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
		if (this.style == this.styleParentGeneralization)
		{
			this._stringRepresentation = 'does <span class="AiConcept">' + this.subject.toString() + '</span> always <span class="AiOperator">' + this.verb.toString() + '</span> <span class="AiConcept">' + this.complement.toString() + '</span>?';
			
			/*if (this.verb.complementaryOperators.length > 0)
				this._stringRepresentation += ' and <span class="AiConcept">' + this.complement.toString() + '</span> always <span class="AiOperator">' + this.verb.complementaryOperators[0].toString() + '</span> <span class="AiConcept">' + this.subject.toString() + '</span>';*/
			
			if (this.argumentString != null)
				this._stringRepresentation = 'Since ' + this.argumentString + ', ' + this._stringRepresentation;
		}
		else if (this.style == this.styleBrotherGeneralization)
		{
			this._stringRepresentation = 'does <span class="AiConcept">' + this.subject.toString() + '</span> <span class="AiOperator">' + this.verb.toString() + '</span> <span class="AiConcept">' + this.complement.toString() + '</span>';
			
			if (this.argumentString != null)
				this._stringRepresentation = 'Since ' + this.argumentString + ', ' + this._stringRepresentation + ' too';
				
			this._stringRepresentation += '?';
		}
		else if (this.style == this.styleFindParentOfEnemyBrother)
		{
			this._stringRepresentation = 'does <span class="AiConcept">' + this.subject.toString() + '</span> <span class="AiOperator">' + this.verb.toString() + '</span> <span class="AiConcept">' + this.complement.toString() + '</span>';
			
			if (this.argumentString != null)
				this._stringRepresentation += ' ' + this.argumentString;
				
			this._stringRepresentation += '?';
		}
		else /*if (this.style == this.styleFindEnemyBrother)*/
		{
			this._stringRepresentation = 'does <span class="AiConcept">' + this.subject.toString() + '</span> always <span class="AiOperator">' + this.verb.toString() + '</span> <span class="AiConcept">' + this.complement.toString() + '</span>?';
			
			if (this.argumentString != null)
				this._stringRepresentation = 'Since ' + this.argumentString + ', ' + this._stringRepresentation;
		}
		
		this._stringRepresentation += ' <span class="Commented">//It must be true for everything that <span class="AiOperator">isa</span> <span class="AiConcept">' + this.subject.toString() + '</span></span>';
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