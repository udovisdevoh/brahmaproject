//To invalidate branches
function Invalidator(conceptList, proofCache)
{
	this.conceptList = conceptList;
	this.proofCache = proofCache;
}

Invalidator.prototype.invalidateAll = function Invalidator_invalidateAll()
{
	this.proofCache.cachedData = new Hash();
	
	for (var index in this.conceptList)
	{
		var subject = this.conceptList[index];
		if (subject.implicitConnections != null)
		{
			for (var index in subject.implicitConnections.keys)
			{
				var verb = subject.implicitConnections.keys[index];
				if (verb instanceof Concept)
				{
					var verbBranch = subject.getImplicitBranch(verb);
					verbBranch.isFlat = false;
				}
			}
		}
	}
}