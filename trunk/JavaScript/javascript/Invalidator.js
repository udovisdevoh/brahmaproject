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
		if (subject.implicitConnections != null && subject.implicitConnections.items != null)
		{
			for (var verb in subject.implicitConnections.items)
			{
				var verbBranch = subject.getImplicitBranch(verb);
				verbBranch.isFlat = false;
			}
		}
	}
}