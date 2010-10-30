//To view short definitions
function WhatisViewer(flattenizer, instinct)
{
	this.flattenizer = flattenizer;
	this.instinct = instinct;
}

//(String (HTML) view the definition
WhatisViewer.prototype.viewDefinition = function WhatisViewer_viewDefinition(subject)
{	
	var definition = '<span class="AiConcept">' + subject + '</span>';

	for (var index2 = 0; index2 < this.instinct.verbList.length; index2++)
	{
		var verb = this.instinct.verbList[index2];
		if (verb instanceof Concept)
		{
			var implicitBranch = subject.getImplicitBranch(verb);
			
			if (!implicitBranch.isFlat)
				if (!implicitBranch.isLocked)
					this.flattenizer.flattenBranch(implicitBranch, subject, verb);
					
			var tautologicBranch = subject.getTautologicBranch(verb);
			
			var counter = 0;
			if (tautologicBranch.complementList.length > 0)
			{
				for (var index = 0; index < tautologicBranch.complementList.length; index++)
				{				
					var complement = tautologicBranch.complementList[index];
					
					if (complement instanceof Concept)
					{					
						if (counter == 0)
							definition += ' <span class="AiOperator">' + verb + '</span>';
					
						if (index == tautologicBranch.complementList.length - 1 && index != 0)
							definition += ' and';
						else if (index != 0)
							definition += ',';
							
						definition += ' <span class="AiConcept">' + complement + '</span>';
						counter++;
					}
				}
			}
		}
	}
	
	return definition;
}