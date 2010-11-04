//To invalidate branches
function Invalidator(conceptList, proofCache, thinker)
{
	this.conceptList = conceptList;
	this.proofCache = proofCache;
	this.thinker = thinker;
}

Invalidator.prototype.invalidateAll = function Invalidator_invalidateAll()
{
	this.proofCache.cachedData = new Hash();
	this.thinker.theoryCache = new Hash();
	for (var index = 0; index < this.conceptList.length; index++)
	{
		var subject = this.conceptList[index];
		if (subject.implicitConnections != null)
		{
			for (var index2 = 0; index2 < subject.implicitConnections.keys.length; index2++)
			{
				var verb = subject.implicitConnections.keys[index2];
				if (verb instanceof Concept)
				{
					var verbBranch = subject.getImplicitBranch(verb);
					verbBranch.isFlat = false;
				}
			}
		}
	}
}