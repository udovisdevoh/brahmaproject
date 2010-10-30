//To view long definitions
function DefineViewer(flattenizer, instinct)
{
	this.flattenizer = flattenizer;
	this.instinct = instinct;
}

//(String (HTML) view the definition
//verb is optional. If provided, we will only render this verb
DefineViewer.prototype.viewDefinition = function DefineViewer_viewDefinition(subject, verb)
{	
	var definition = '<span class="AiConcept">' + subject + '</span>: <ul>';
	
	if (verb != null)
	{
		definition += this.viewVerbDefinition(subject, verb);
	}
	else
	{
		for (var index2 = 0; index2 < this.instinct.verbList.length; index2++)
		{
			var currentVerb = this.instinct.verbList[index2];
			if (currentVerb instanceof Concept)
			{
				definition += this.viewVerbDefinition(subject, currentVerb);
			}
		}
	}
	
	definition += '</ul>';
	
	return definition;
}

//(String (HTML) view the definition for specified verb branch
DefineViewer.prototype.viewVerbDefinition = function DefineViewer_viewVerbDefinition(subject, verb)
{
	var definition = "";
	var implicitBranch = subject.getImplicitBranch(verb);
			
	if (!implicitBranch.isFlat)
		if (!implicitBranch.isLocked)
			this.flattenizer.flattenBranch(implicitBranch, subject, verb);
	
	var counter = 0;
	if (implicitBranch.complementList.length > 0)
	{
		for (var index in implicitBranch.complementList)
		{					
			var complement = implicitBranch.complementList[index];
			if (complement instanceof Concept)
			{
				if (counter == 0)
					definition += ' <li><span class="AiOperator">' + verb + '</span><ul>';
			
				definition += ' <li><span class="AiConcept">' + complement + '</span></li>';
				counter++;
			}
		}
		
		if (counter > 0)
			definition += ' </ul></li>';
	}
	
	return definition;
}