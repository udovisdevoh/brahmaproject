//To view long definitions
function DefineViewer(flattenizer, instinct)
{
	this.flattenizer = flattenizer;
	this.instinct = instinct;
}

//(String (HTML) view the definition
DefineViewer.prototype.viewDefinition = function DefineViewer_viewDefinition(subject)
{	
	var definition = '<span class="AiConcept">' + subject + '</span>: <ul>';
	
	for (var index2 in this.instinct.verbList)
	{
		var verb = this.instinct.verbList[index2];
		if (verb instanceof Concept)
		{
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
		}
	}
	
	definition += '</ul>';
	
	return definition;
}