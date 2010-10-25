//To view short definitions
function WhatisViewer(flattenizer)
{
	this.flattenizer = flattenizer;
}

//(String (HTML) view the proof
WhatisViewer.prototype.viewDefinition = function WhatisViewer_viewDefinition(subject)
{	
	var definition = '<span class="AiConcept">' + subject + '</span>';

	for (var index in subject.implicitConnections.keys)
	{
		var verb = subject.implicitConnections.keys[index];
		if (verb instanceof Concept)
		{
			var implicitBranch = subject.getImplicitBranch(verb);
			
			if (!implicitBranch.isFlat)
				if (!implicitBranch.isLocked)
					this.flattenizer.flattenBranch(implicitBranch, subject, verb);
					
			var tautologicBranch = subject.getTautologicBranch(verb);
			
			if (tautologicBranch.complementList.length > 0)
			{
				definition += ' <span class="AiOperator">' + verb + '</span>';
				
				for (var index in tautologicBranch.complementList)
				{
					var complement = tautologicBranch.complementList[index];
					
					if (complement instanceof Concept)
					{
						if (index == tautologicBranch.complementList.length - 1 && index != 0)
							definition += ' and';
						else if (index != 0)
							definition += ',';
							
						definition += ' <span class="AiConcept">' + complement + '</span>';
					}
				}
			}
		}
	}
	
	return definition;
}